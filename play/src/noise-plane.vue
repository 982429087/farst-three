<template>
  <div class="container">
    <FtScene :options="{ background: () => new Color('rgb(255, 255, 255)') }" ref="sceneInstance">
      <FtPointLight :color="0x0E09DC" :intensity="0.85" :options="point1Opts" />
      <FtPointLight :color="0x1CD1E1" :intensity="0.85" :options="point2Opts" />
      <FtPointLight :color="0x18C02C" :intensity="0.85" :options="point3Opts" />
      <FtPointLight :color="0xee3bcf" :intensity="0.85" :options="point4Opts" />
      <FtMesh>
        <FtPlaneGeometry :width="200" :height="200" :width-segments="100" :height-segments="100" />
        <FtMeshPhysicalMaterial :options="pmOpts"></FtMeshPhysicalMaterial>
      </FtMesh>
      <FtPerspectiveCamera :fov="75" :near="0.01" :far="10000" :options="{ position: { set: [-0.1, -100, 120], }, }" />
      <FtWebglRenderer ref="webGLRender" :params="{ antialias: true }" :animation-fn="animationFn">
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { MeshPhysicalMaterialOptions, PointLightOptions, SceneInstance, WebGLRendererInstance } from '@farst-three/components'
import { Color, ObjectSpaceNormalMap, ShaderMaterial, Vector2, Vector3, WebGLRenderTarget } from 'three'
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass'
import { reactive, ref, shallowRef } from 'vue'


const sceneInstance = ref<SceneInstance>()
const webGLRender = shallowRef<WebGLRendererInstance>()

const uTime = { value: 0 }
const uNoiseCoef = { value: 5 }
const uDelta = { value: new Vector2(1 / 200, 1 / 200) }
// 荧光效果
const fsQuad = new FullScreenQuad()


const dispRT = new WebGLRenderTarget(512, 512, { depthBuffer: false, stencilBuffer: false })
const dispMat = new ShaderMaterial({
  uniforms: {
    uTime: uTime,
    uNoiseCoef: uNoiseCoef,
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uNoiseCoef;
    varying vec2 vUv;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v)
    {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      // First corner
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;

      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
      vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

      // Permutations
      i = mod289(i);
      vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      // Gradients: 7x7 points over a square, mapped onto an octahedron.
      // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
      float n_ = 0.142857142857; // 1.0/7.0
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      // Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }
    void main() {
      vec2 p = vec2(vUv * uNoiseCoef);
      float noise = (snoise(vec3(p.x, p.y, uTime)) + 1.0) / 2.0;
      gl_FragColor = vec4(noise, 0.0, 0.0, 1.0);
    }
  `,
})

// normal map
const normRT = new WebGLRenderTarget(512, 512, { depthBuffer: false, stencilBuffer: false })
const normMat = new ShaderMaterial({
  uniforms: {
    dispMap: { value: dispRT.texture },
    delta: uDelta,
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D dispMap;
    uniform vec2 delta;
    varying vec2 vUv;
    void main() {
      // gl_FragColor = vec4(0.5, 0.5, 1.0, 0.0);
      float x1 = texture2D(dispMap, vec2(vUv.x - delta.x, vUv.y)).r;
      float x2 = texture2D(dispMap, vec2(vUv.x + delta.x, vUv.y)).r;
      float y1 = texture2D(dispMap, vec2(vUv.x, vUv.y - delta.y)).r;
      float y2 = texture2D(dispMap, vec2(vUv.x, vUv.y + delta.y)).r;
      gl_FragColor = vec4(0.5 + (x1 - x2), 0.5 + (y1 - y2), 1.0, 1.0);
    }
  `,
})

function renderDisp() {
  renderMat(dispMat, dispRT)
  renderMat(normMat, normRT)
}

function renderMat(mat: any, target: any) {
  if (webGLRender.value) {
    const renderer = webGLRender.value.renderer
    fsQuad.material = mat
    const oldTarget = renderer.getRenderTarget()
    renderer.setRenderTarget(target)
    fsQuad.render(renderer)
    renderer.setRenderTarget(oldTarget)
  }
}

const pmOpts = reactive<MeshPhysicalMaterialOptions>({
  displacementMap: () => dispRT.texture,
  displacementScale: 15,
  normalMap: () => normRT.texture,
  normalMapType: ObjectSpaceNormalMap,
})


function genPointOpts() {
  return reactive<PointLightOptions>({
    position: {
      x: 0,
      y: 0,
      z: 50
    }
  })
}
const point1Opts = genPointOpts()
const point2Opts = genPointOpts()
const point3Opts = genPointOpts()
const point4Opts = genPointOpts()
const startTime = Date.now()

function animationFn() {
  uTime.value = (Date.now() - startTime) * 0.0003
  const time = Date.now() * 0.001
  renderDisp()
  const d = 100;
  (point1Opts.position as Vector3).x = Math.sin(time * 0.1) * d;
  (point1Opts.position as Vector3).y = Math.cos(time * 0.2) * d;
  (point2Opts.position as Vector3).x = Math.sin(time * 0.3) * d;
  (point2Opts.position as Vector3).y = Math.cos(time * 0.4) * d;
  (point3Opts.position as Vector3).x = Math.sin(time * 0.5) * d;
  (point3Opts.position as Vector3).y = Math.cos(time * 0.6) * d;
  (point4Opts.position as Vector3).x = Math.sin(time * 0.7) * d;
  (point4Opts.position as Vector3).y = Math.cos(time * 0.8) * d;
}
</script>

<style>
.container {
  width: 100vw;
  height: 100vh;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
