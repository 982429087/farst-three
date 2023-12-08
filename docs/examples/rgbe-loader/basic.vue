<template>
  <div ref="domRef" class="farst-three">
    <FtScene :options="sceneOptions">
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0.1, 1, 3],
          },
        }"
      />

      <FtWebglRenderer
        :options="rendererOpts"
        :params="{ antialias: true }"
        :animation-fn="animationFn"
      >
        <FtMesh
          :options="{
            position: {
              x: -1,
            },
          }"
        >
          <FtSphereGeometry
            :radius="0.5"
            :width-segments="64"
            :height-segments="64"
          />
          <FtMeshPhysicalMaterial
            :options="{
              metalness: 1,
              roughness: 0,
            }"
          >
            <FtTextureLoader
              :url="
                baseUrl +
                'textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_basecolor.jpg'
              "
              :type="'map'"
            />
            <FtTextureLoader
              :url="
                baseUrl +
                'textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_roughness.jpg'
              "
              type="roughnessMap"
            />
            <FtTextureLoader
              :url="
                baseUrl +
                'textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_metallic.jpg'
              "
              type="metalnessMap"
            />
          </FtMeshPhysicalMaterial>
        </FtMesh>
        <FtMesh
          :options="{
            position: {
              x: 1,
            },
          }"
        >
          <FtSphereGeometry
            :radius="0.5"
            :width-segments="64"
            :height-segments="64"
          />
          <FtMeshPhysicalMaterial :options="phymaterialOptions">
            <FtTextureLoader
              :url="
                baseUrl +
                'textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_roughness.jpg'
              "
              type="roughnessMap"
            />
            <FtTextureLoader
              :url="
                baseUrl +
                'textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_metallic.jpg'
              "
              type="metalnessMap"
            />
            <FtCubeTextureLoader
              v-if="show === 'cube'"
              :load="cubeLoad"
              :urls="[
                baseUrl + 'textures/fullscreen/1.left.jpg',
                baseUrl + 'textures/fullscreen/1.right.jpg',
                baseUrl + 'textures/fullscreen/1.top.jpg',
                baseUrl + 'textures/fullscreen/1.bottom.jpg',
                baseUrl + 'textures/fullscreen/1.front.jpg',
                baseUrl + 'textures/fullscreen/1.back.jpg',
              ]"
              type="envMap"
            />
            <FtRgbeLoader
              v-if="show === 'hdr'"
              :type="'envMap'"
              :url="baseUrl + 'textures/rectangular/san_giuseppe_bridge_2k.hdr'"
              :load="rgbeLoad"
            />
          </FtMeshPhysicalMaterial>
        </FtMesh>

        <FtDirectionalLight
          :color="0xffffff"
          :intensity="0.7"
          :options="{ position: { set: [1, 2, 4] } }"
        />
        <FtAmbientLight :color="0xffffff" :intensity="0.5" />
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  ACESFilmicToneMapping,
  Color,
  DoubleSide,
  EquirectangularReflectionMapping,
} from 'three'
import {
  FtAmbientLight,
  FtCubeTextureLoader,
  FtDirectionalLight,
  FtMesh,
  FtMeshPhysicalMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtRgbeLoader,
  FtScene,
  FtSphereGeometry,
  FtTextureLoader,
  FtWebglRenderer,
  useGui,
} from 'farst-three'
import type {
  CubeTextureLoaderOnLoad,
  MeshPhysicalMaterialOptions,
  RGBELoaderOnLoad,
  SceneOptions,
  WebGLRendererLoadEvent,
  WebglRendererOptions,
} from 'farst-three'
const baseUrl = import.meta.env.VITE_BASE_URL

const sceneOptions = reactive<SceneOptions>({})
const domRef = ref<HTMLDivElement>()
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
const rendererOpts = reactive<WebglRendererOptions>({
  toneMappingExposure: 1,
  toneMapping: ACESFilmicToneMapping,
  outputColorSpace: 'srgb',
})

const show = ref('hdr')

const rgbeLoad: RGBELoaderOnLoad = (e) => {
  sceneOptions.environment = () => e
  sceneOptions.backgroundBlurriness = 0
  sceneOptions.backgroundIntensity = 1
  sceneOptions.background = () => e
  e.mapping = EquirectangularReflectionMapping
}
const cubeLoad: CubeTextureLoaderOnLoad = (e) => {
  sceneOptions.background = () => e
}
const animationFn = (e: WebGLRendererLoadEvent) => {
  //
}

const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.add(phymaterialOptions.value, 'roughness', 0, 1, 0.1)
  gui.add(phymaterialOptions.value, 'clearcoat')
  gui.add(phymaterialOptions.value, 'envMapIntensity', 0, 1, 0.1)
  gui.add(phymaterialOptions.value, 'transmission', 0, 1, 0.1)
  gui.add(phymaterialOptions.value, 'ior', 1, 2.33, 0.1)
  gui.add(phymaterialOptions.value, 'thickness', 0, 1, 0.1)
  gui.add(rendererOpts, 'toneMappingExposure', 0, 1, 0.1)

  gui.add({ envMap: 'hdr' }, 'envMap', ['hdr', 'cube']).onChange((val) => {
    show.value = val
  })
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
