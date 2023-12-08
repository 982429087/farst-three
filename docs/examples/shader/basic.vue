<template>
  <div ref="domRef" class="farst-three">
    <FtScene :options="sceneOptions">
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0.1, 4, 7],
          },
        }"
      />
      <!-- <FtMesh>
        <FtMeshPhysicalMaterial :options="phymaterialOptions">
          <FtRgbeLoader
            :type="'envMap'"
            url="\textures\rectangular\san_giuseppe_bridge_2k.hdr"
            :load="rgbeLoad"
          />
        </FtMeshPhysicalMaterial>
      </FtMesh> -->

      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtMesh>
          <FtSphereGeometry
            :radius="2"
            :width-segments="64"
            :height-segments="64"
          />
          <FtShaderMaterial
            :options="shaderMaterialOpts"
            :params="materialParams"
            @load="shaderMaterialLoad"
          />
        </FtMesh>

        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import {
  AdditiveBlending,
  Clock,
  Color,
  DoubleSide,
  EquirectangularReflectionMapping,
} from 'three'
import {
  FtMesh,
  FtMeshPhysicalMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtRgbeLoader,
  FtScene,
  FtShaderMaterial,
  FtSphereGeometry,
  FtWebglRenderer,
} from 'farst-three'
import vertexShader from './basic/v.glsl?raw'
import fragmentShader from './basic/f.glsl?raw'
import type { ShaderMaterialParameters } from 'three'
import type {
  MeshPhysicalMaterialOptions,
  RGBELoaderOnLoad,
  SceneOptions,
  ShaderMaterialLoadEvent,
} from 'farst-three'

const domRef = ref<HTMLDivElement>()
const sceneOptions = reactive<SceneOptions>({})
const phymaterialOptions = ref<MeshPhysicalMaterialOptions>({
  color: () => new Color(0xffffff),
  clearcoat: true,
  envMapIntensity: 1,
  metalness: 0,
  roughness: 0,
  transmission: 1,
  ior: 1,
  thickness: 1.0,
  specularColor: () => new Color(0x00ffff),
  side: DoubleSide,
  transparent: true,
  opacity: 1,
})

const rgbeLoad: RGBELoaderOnLoad = (e) => {
  sceneOptions.environment = () => e
  sceneOptions.backgroundBlurriness = 0
  sceneOptions.backgroundIntensity = 1
  sceneOptions.background = () => e
  e.mapping = EquirectangularReflectionMapping
}

const clock = new Clock()
const materialParams = reactive<ShaderMaterialParameters>({
  uniforms: {},
  vertexColors: true,
  vertexShader,
  fragmentShader,
  depthTest: true, // 深度测试
  depthWrite: false, // 材质是否对深度缓冲区有影响
  blending: AdditiveBlending,
  transparent: true,
})

const shaderMaterialOpts = reactive({
  uniforms: {
    iTime: () => ({
      value: 0,
    }),
  },
})
let shaderMaterInstance
function shaderMaterialLoad(e: ShaderMaterialLoadEvent) {
  shaderMaterInstance = e.material
}
const animationFn = () => {
  const time = performance.now() / 1000
  if (shaderMaterInstance) {
    shaderMaterialOpts.uniforms.iTime = () => ({
      value: time,
    })
  }
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
