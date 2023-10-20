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

      <FtMesh>
        <FtSphereGeometry
          :radius="2"
          :width-segments="64"
          :height-segments="64"
        />
        <FtShaderMaterial :params="materialParams" />
      </FtMesh>

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
} from '@farst-three/components'
import vertexShader from './basic/v.glsl?raw'
import fragmentShader from './basic/f.glsl?raw'
import type { ShaderMaterialParameters } from 'three'
import type {
  MeshPhysicalMaterialOptions,
  RGBELoaderOnLoad,
  SceneOptions,
} from '@farst-three/components'

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

const animationFn = () => {
  //
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
