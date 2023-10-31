<template>
  <div class="farst-three">
    <FtScene
      ref="sceneInstance"
      :options="{ background: () => new Color('rgb(255, 255, 255)') }"
    >
      <FtPointLight :color="0x0e09dc" :intensity="0.85" :options="point1Opts" />
      <FtPointLight :color="0x1cd1e1" :intensity="0.85" :options="point2Opts" />
      <FtPointLight :color="0x18c02c" :intensity="0.85" :options="point3Opts" />
      <FtPointLight :color="0xee3bcf" :intensity="0.85" :options="point4Opts" />
      <FtMesh>
        <FtPlaneGeometry
          :width="200"
          :height="200"
          :width-segments="100"
          :height-segments="100"
        />
        <FtMeshPhysicalMaterial :options="pmOpts" />
      </FtMesh>

      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="5000"
        :options="{ position: { set: [-0.1, -100, 120] } }"
      />
      <FtWebglRenderer
        ref="webGLRender"
        :params="{ antialias: true }"
        :animation-fn="animationFn"
      >
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, shallowRef } from 'vue'
import {
  Color,
  ObjectSpaceNormalMap,
  ShaderMaterial,
  Vector2,
  WebGLRenderTarget,
} from 'three'
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass'
import {
  FtMesh,
  FtMeshPhysicalMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPlaneGeometry,
  FtPointLight,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import v from './basic/v.glsl?raw'
import fNormal from './basic/f-normal.glsl?raw'
import fDis from './basic/f-dis.glsl?raw'
import type {
  MeshPhysicalMaterialOptions,
  PointLightOptions,
  SceneInstance,
  WebGLRendererInstance,
  WebGLRendererLoadEvent,
} from '@farst-three/components'
import type { Vector3 } from 'three'

const sceneInstance = ref<SceneInstance>()
const webGLRender = shallowRef<WebGLRendererInstance>()

const uTime = { value: 0 }
const uNoiseCoef = { value: 5 }
const uDelta = { value: new Vector2(1 / 200, 1 / 200) }
// FullScreenQuad 是 ThreeJS 封装的一个平面容器，用于保存渲染结果的纹理。
const fsQuad = new FullScreenQuad()

const dispRT = new WebGLRenderTarget(512, 512, {
  depthBuffer: false,
  stencilBuffer: false,
})
const dispMat = new ShaderMaterial({
  uniforms: {
    uTime,
    uNoiseCoef,
  },
  vertexShader: v,
  fragmentShader: fDis,
})

// normal map
const normRT = new WebGLRenderTarget(512, 512, {
  depthBuffer: false,
  stencilBuffer: false,
})
const normMat = new ShaderMaterial({
  uniforms: {
    dispMap: { value: dispRT.texture },
    delta: uDelta,
  },
  vertexShader: v,
  fragmentShader: fNormal,
})

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
      z: 50,
    },
  })
}
const point1Opts = genPointOpts()
const point2Opts = genPointOpts()
const point3Opts = genPointOpts()
const point4Opts = genPointOpts()
const startTime = Date.now()

function animationFn({ renderer, scene }: WebGLRendererLoadEvent) {
  uTime.value = (Date.now() - startTime) * 0.0003
  const time = Date.now() * 0.001
  renderDisp()
  const d = 100
  ;(point1Opts.position as Vector3).x = Math.sin(time * 0.1) * d
  ;(point1Opts.position as Vector3).y = Math.cos(time * 0.2) * d
  ;(point2Opts.position as Vector3).x = Math.sin(time * 0.3) * d
  ;(point2Opts.position as Vector3).y = Math.cos(time * 0.4) * d
  ;(point3Opts.position as Vector3).x = Math.sin(time * 0.5) * d
  ;(point3Opts.position as Vector3).y = Math.cos(time * 0.6) * d
  ;(point4Opts.position as Vector3).x = Math.sin(time * 0.7) * d
  ;(point4Opts.position as Vector3).y = Math.cos(time * 0.8) * d
}

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
</script>

<style>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
