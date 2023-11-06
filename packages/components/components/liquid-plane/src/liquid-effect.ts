import {
  FloatType,
  NearestFilter,
  RGBAFormat,
  ShaderMaterial,
  Uniform,
  Vector2,
  WebGLRenderTarget,
} from 'three'
// https://github.com/mrdoob/three.js/blob/master/examples/jsm/postprocessing/Pass.js
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass'
import type { Material, WebGLMultipleRenderTargets, WebGLRenderer } from 'three'

// shaders from https://github.com/evanw/webgl-water
export class LiquidEffect {
  renderer: WebGLRenderer
  width = 512
  height = 512
  delta = new Vector2(1 / this.width, 1 / this.height)
  targetOptions = {
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    type: FloatType,
    format: RGBAFormat,
    depthBuffer: false,
  }
  // 在离屏缓冲区中先渲染某些效果，最后做为纹理渲染到屏幕上
  hMap = new WebGLRenderTarget(this.width, this.height, this.targetOptions)
  hMap1 = new WebGLRenderTarget(this.width, this.height, this.targetOptions)
  fsQuad = new FullScreenQuad() // 渲染全屏的图像、效果、或着色器
  copyMat: ShaderMaterial | undefined
  updateMat: ShaderMaterial | undefined
  normalsMat: ShaderMaterial | undefined
  dropMat: ShaderMaterial | undefined
  constructor(renderer: WebGLRenderer) {
    this.renderer = renderer
    this.initShaders()
  }

  initShaders() {
    const defaultVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    this.copyMat = new ShaderMaterial({
      uniforms: { tDiffuse: { value: null } },
      vertexShader: defaultVertexShader,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(tDiffuse, vUv);
        }
      `,
    })

    this.updateMat = new ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        delta: new Uniform(this.delta),
      },
      vertexShader: defaultVertexShader,
      // 高斯模糊效果 采样贴图后的像素点周围的像素点的颜色值，然后取平均值，作为当前像素点的颜色值
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 delta;
        varying vec2 vUv;
        void main() {
          vec4 texel = texture2D(tDiffuse, vUv);

          vec2 dx = vec2(delta.x, 0.0);
          vec2 dy = vec2(0.0, delta.y);
          float average = (
            texture2D(tDiffuse, vUv - dx).r +
            texture2D(tDiffuse, vUv - dy).r +
            texture2D(tDiffuse, vUv + dx).r +
            texture2D(tDiffuse, vUv + dy).r
          ) * 0.25;
          texel.g += (average - texel.r) * 2.0;
          texel.g *= 0.995;
          texel.r += texel.g;

          gl_FragColor = texel;
        }
      `,
    })

    this.normalsMat = new ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        delta: new Uniform(this.delta),
      },
      vertexShader: defaultVertexShader,
      // 生成法线贴图  法线贴图是一种特殊的纹理，它可以用来模拟凹凸的表面细节
      // cross 在计算机图形学中，向量的叉积常用于计算表面法线。给定一个平面上的两个向量，它们的叉积将生成垂直于该平面的法线向量。这对于光照和投影等图形渲染任务非常重要。
      // normalizes a vector. 标准化一个向量
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 delta;
        varying vec2 vUv;
        void main() {
          vec4 texel = texture2D(tDiffuse, vUv);
          vec3 dx = vec3(delta.x, texture2D(tDiffuse, vec2(vUv.x + delta.x, vUv.y)).r - texel.r, 0.0);
          vec3 dy = vec3(0.0, texture2D(tDiffuse, vec2(vUv.x, vUv.y + delta.y)).r - texel.r, delta.y);

          texel.ba = normalize(cross(dy, dx)).xz;
          gl_FragColor = texel;
        }
      `,
    })

    this.dropMat = new ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        center: new Uniform(new Vector2()),
        radius: { value: 0.05 },
        strength: { value: 0.5 },
      },
      vertexShader: defaultVertexShader,
      // 根据一个中心点、半径和强度来在图像中创建一个圆形的波浪效果
      fragmentShader: `
        const float PI = 3.1415926535897932384626433832795;
        uniform sampler2D tDiffuse;
        uniform vec2 center;
        uniform float radius;
        uniform float strength;
        varying vec2 vUv;
        void main() {
          vec4 texel = texture2D(tDiffuse, vUv);
          float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - vUv) / radius);
          drop = 0.5 - cos(drop * PI) * 0.5;
          texel.r += drop * strength;
          // texel.r = clamp(texel.r, -2.0, 2.0);
          gl_FragColor = texel;
        }
      `,
    })
  }

  // 整体逻辑是在替换texture，因为有两个texture hMap和hMap1
  // 每次更新后都会出现一个新的texture，然后替换掉旧的texture
  // 每次shader中采样的texture都是上一次更新后的texture，所以每次的坐标变化都是根据上一次的texture来计算的
  // 所以会有一个连续的效果
  update() {
    this.updateHMap()
    this.updateHMapNormals()
  }

  updateHMap() {
    if (!this.updateMat) return
    this.updateMat.uniforms.tDiffuse.value = this.hMap.texture
    this.renderShaderMat(this.updateMat, this.hMap1)
    this.swapBuffers()
  }

  updateHMapNormals() {
    if (!this.normalsMat) return
    this.normalsMat.uniforms.tDiffuse.value = this.hMap.texture
    this.renderShaderMat(this.normalsMat, this.hMap1)
    this.swapBuffers()
  }

  addDrop(x: number, y: number, radius: number, strength: number) {
    if (!this.dropMat) return
    this.dropMat.uniforms.tDiffuse.value = this.hMap.texture
    this.dropMat.uniforms.center.value.set(x, y)
    this.dropMat.uniforms.radius.value = radius
    this.dropMat.uniforms.strength.value = strength
    this.renderShaderMat(this.dropMat, this.hMap1)
    this.swapBuffers()
  }

  // LiquidEffect.prototype.renderBuffer = function (buffer, target) {
  //   this.copyMat.uniforms.tDiffuse.value = buffer.texture;
  //   this.renderShaderMat(this.copyMat, target);
  // };

  renderShaderMat(
    mat: Material,
    target: WebGLRenderTarget | WebGLMultipleRenderTargets | null
  ) {
    this.fsQuad.material = mat
    const oldTarget = this.renderer.getRenderTarget() // 渲染器当前的渲染目标，是屏幕
    this.renderer.setRenderTarget(target) // 指定渲染结果将被绘制到哪个缓冲区或纹理上，而不是默认的屏幕帧缓冲区
    this.fsQuad.render(this.renderer) // 只是调用了renderer的render方法，参数是内部的mesh和camera
    this.renderer.setRenderTarget(oldTarget) // 恢复渲染目标为屏幕
  }

  swapBuffers() {
    const temp = this.hMap
    this.hMap = this.hMap1
    this.hMap1 = temp
  }
}

export default LiquidEffect
