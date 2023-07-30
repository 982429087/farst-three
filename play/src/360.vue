<template>
  <div class="farst-three">
    <FtScene :options="sceneOptions">
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
        ></FtSphereGeometry>
        <FtMeshPhysicalMaterial
          :options="{
            metalness: 1,
            roughness: 0,
          }"
        >
          <FtTextureLoader
            url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_basecolor.jpg"
            :type="'map'"
          >
          </FtTextureLoader>
          <FtTextureLoader
            url="/textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_roughness.jpg"
            type="roughnessMap"
          >
          </FtTextureLoader>
          <FtTextureLoader
            url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_metallic.jpg"
            type="metalnessMap"
          >
          </FtTextureLoader>
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
        ></FtSphereGeometry>
        <FtMeshPhysicalMaterial :options="phymaterialOptions">
          <FtTextureLoader
            url="/textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_roughness.jpg"
            type="roughnessMap"
          >
          </FtTextureLoader>
          <FtTextureLoader
            url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_metallic.jpg"
            type="metalnessMap"
          >
          </FtTextureLoader>
          <FtCubeTextureLoader
            v-if="show === 'cube'"
            :load="cubeLoad"
            :urls="[
              '/textures/fullscreen/1.left.jpg',
              '/textures/fullscreen/1.right.jpg',
              '/textures/fullscreen/1.top.jpg',
              '/textures/fullscreen/1.bottom.jpg',
              '/textures/fullscreen/1.front.jpg',
              '/textures/fullscreen/1.back.jpg',
            ]"
            type="envMap"
          ></FtCubeTextureLoader>
          <FtRgbeLoader
            v-if="show === 'hdr'"
            :type="'envMap'"
            url="\textures\rectangular\san_giuseppe_bridge_2k.hdr"
            :load="rgbeLoad"
          ></FtRgbeLoader>
        </FtMeshPhysicalMaterial>
      </FtMesh>
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
      <FtDirectionalLight
        :color="0xffffff"
        :intensity="0.7"
        :options="{ position: { set: [1, 2, 4] } }"
      />
      <FtAmbientLight :color="0xffffff" :intensity="0.5" />
      <FtWebglRenderer
        :options="rendererOpts"
        :params="{ antialias: true }"
        :animationFn="animationFn"
      >
        <FtOrbitControls />
        <FtGridHelper></FtGridHelper>
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
CubeTextureLoaderOnLoad,
  MeshPhysicalMaterialOptions,
  RGBELoaderOnLoad,
  SceneOptions,
  WebGLRendererLoadEvent,
  WebglRendererOptions,
} from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import {
  ACESFilmicToneMapping,
  Color,
  DoubleSide,
  EquirectangularReflectionMapping,
} from 'three'
import { ref, reactive } from 'vue'

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
const animationFn = ({}: WebGLRendererLoadEvent) => {}

const { gui } = useGui()

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
</script>

<style lang="scss" scoped>
.farst-three {
  height: 100vh;
  width: 100vw;
}
</style>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
