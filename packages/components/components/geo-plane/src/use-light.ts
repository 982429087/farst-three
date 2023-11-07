import { Layers, MeshBasicMaterial, ShaderMaterial, Vector2 } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import type { Camera, Mesh, Scene, WebGLRenderer } from 'three'

// from https://blog.csdn.net/txtop/article/details/132670600
export function useLight(
  scene: Scene,
  camera: Camera,
  renderer: WebGLRenderer
) {
  const BLOOM_SCENE = 1 // 光晕场景
  const bloomLayer = new Layers() // 光晕层次-创建一个图层对象
  bloomLayer.set(BLOOM_SCENE) // 先把光晕层次设置光晕场景的层次1
  const darkMaterial = new MeshBasicMaterial({ color: 'black' }) // 跟辉光光晕有关的变量

  const materials: Record<string, any> = {} // 跟辉光光晕有关的变量
  const params = {
    exposure: 0, // 暴露
    bloomStrength: 0.78, // 光晕强度
    bloomThreshold: 0, // 光晕阈值
    bloomRadius: 0.1, // 光晕半径
  }

  const effectFXAA = new ShaderPass(FXAAShader)
  effectFXAA.uniforms['resolution'].value.set(
    0.6 / window.innerWidth,
    0.6 / window.innerHeight
  ) // 渲染区域Canvas画布宽高度
  effectFXAA.renderToScreen = true
  // 去掉锯齿---1
  const renderScene = new RenderPass(scene, camera) // RenderPass这个通道会在当前场景（scene）和摄像机（camera）的基础上渲染出一个新场景，新建：
  // 添加光晕效果---2
  const bloomPass = new UnrealBloomPass( // UnrealBloomPass通道可实现一个泛光效果。
    new Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  )
  bloomPass.threshold = params.bloomThreshold
  bloomPass.strength = params.bloomStrength
  bloomPass.radius = params.bloomRadius
  // 添加光晕效果---2
  // 着色器通道容器--放进容器里
  const bloomComposer = new EffectComposer(renderer) // EffectComposer可以理解为着色器通道容器，着色器通道按照先后顺序添加进来并执行

  bloomComposer.renderToScreen = false
  bloomComposer.addPass(renderScene)
  bloomComposer.addPass(bloomPass) // 添加光晕效果
  bloomComposer.addPass(effectFXAA) // 去掉锯齿
  // 着色器通道容器--放进容器里
  const finalPass = new ShaderPass(
    new ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        uniform sampler2D baseTexture;
        uniform sampler2D bloomTexture;
        varying vec2 vUv;
        void main() {
            gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
        }
      `,
      defines: {},
    }),
    'baseTexture'
  )
  finalPass.needsSwap = true
  const finalComposer = new EffectComposer(renderer)

  finalComposer.addPass(renderScene)
  finalComposer.addPass(finalPass)
  finalComposer.addPass(effectFXAA)

  /**
   *  先把场景里的所有几何体的纹理拿出来，然后给几何体的加上黑色纹理，前面把渲染器的 alpha打开了 渲染的都是透明的
      bloomComposer.render(); 渲染通道的集合
      再把纹理还给场景里的几何体，然后删除刚给上的黑色纹理
      finalComposer.render(); 在渲染一遍

   */
  function render() {
    scene.traverse((obj) => {
      if (bloomLayer.test(obj.layers) === false) {
        materials[obj.uuid] = (obj as Mesh).material
        ;(obj as Mesh).material = darkMaterial
      }
    })

    bloomComposer?.render()
    scene.traverse((obj) => {
      if (materials[obj.uuid]) {
        ;(obj as Mesh).material = materials[obj.uuid]
        delete materials[obj.uuid]
      }
    })
    finalComposer?.render()
  }
  return {
    render,
  }
}
