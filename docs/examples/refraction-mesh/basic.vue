<template>
  <div class="farst-three">
    <FtScene ref="sceneInstance" :options="sceneOpts" @load="sceneLoad">
      <FtPointLight :color="0x0e09dc" :intensity="0.85" :options="point1Opts" />
      <FtPointLight :color="0x1cd1e1" :intensity="0.85" :options="point2Opts" />
      <FtPointLight :color="0x18c02c" :intensity="0.85" :options="point3Opts" />
      <FtPointLight :color="0xee3bcf" :intensity="0.85" :options="point4Opts" />
      <FtMesh>
        <FtPlaneGeometry
          :width="200"
          :height="200"
          :width-segments="64"
          :height-segments="64"
        />
        <FtMeshStandardMaterial :params="{ color: 0x1cd1e1 }" />
      </FtMesh>

      <FtMesh ref="meshRef" :options="{ position: { set: [0, -20, 20] } }">
        <FtMeshPhysicalMaterial
          ref="standardMaterialRef"
          :params="{
            color: '#ffffff',
            roughness: 0,
            metalness: 1,
            flatShading: true,
          }"
          :options="materialOptions"
        />
        <FtTorusGeometry
          :radius="8"
          :tube="3"
          :radial-segments="8"
          :tubular-segments="6"
          :options="torusGeomeryOpts"
        />
      </FtMesh>
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="5000"
        :options="{ position: { set: [-0.1, -100, 120] } }"
      />

      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  Color,
  CubeCamera,
  CubeRefractionMapping,
  LinearMipmapLinearFilter,
  Mesh,
  MeshStandardMaterial,
  RGBAFormat,
  TorusGeometry,
  WebGLCubeRenderTarget,
} from 'three'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtGridHelper,
  FtMesh,
  FtMeshPhysicalMaterial,
  FtMeshStandardMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPlaneGeometry,
  FtPointLight,
  FtScene,
  FtTorusGeometry,
  FtWebglRenderer,
} from '@farst-three/components'
import type { Vector3 } from 'three'
import type {
  MeshInstance,
  MeshOptions,
  MeshPhysicalMaterialOptions,
  MeshStandardMaterialInstance,
  MeshStandardMaterialLoadEvent,
  MeshStandardMaterialOptions,
  PointLightOptions,
  SceneInstance,
  SceneLoadEvent,
  SceneOptions,
  TorusGeometryOptions,
  WebGLRendererLoadEvent,
} from '@farst-three/components'

const standardMaterialRef = ref<MeshStandardMaterialInstance>()
const sceneInstance = ref<SceneInstance>()
const meshRef = ref<MeshInstance>()
const cubeRT = new WebGLCubeRenderTarget(256, {
  format: RGBAFormat,
  generateMipmaps: true,
  minFilter: LinearMipmapLinearFilter,
})
const cubeCamera = new CubeCamera(0.1, 2000, cubeRT)
const materialOptions = reactive<MeshPhysicalMaterialOptions>({
  envMap: () => cubeRT.texture,
  ior: 1.5,
  clearcoat: true,
  metalness: 0,
  roughness: 0.5,
  transmission: 1,
  thickness: 1.0,
})
const torusGeomeryOpts = reactive<TorusGeometryOptions>({})
const sceneOpts = reactive<SceneOptions>({
  background: () => new Color('#ffffff'),
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

const animationFn = ({ renderer, scene }: WebGLRendererLoadEvent) => {
  const mesh = meshRef.value?.mesh
  if (mesh) {
    cubeCamera.update(renderer, scene)

    mesh.rotation.x += 0.02
    mesh.rotation.y += 0.01
  }

  const time = Date.now() * 0.001
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

function sceneLoad({ scene }: SceneLoadEvent) {
  scene.add(cubeCamera)
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
