<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
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
          <FtMeshStandardMaterial :options="materialOptions">
            <FtTextureLoader
              url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_basecolor.jpg"
              :type="'map'"
            />
          </FtMeshStandardMaterial>
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
          <FtMeshStandardMaterial :options="materialOptions">
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
            <FtCubeTextureLoader
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
          </FtMeshStandardMaterial>
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
import { ref } from 'vue'
import {
  FtAmbientLight,
  FtCubeTextureLoader,
  FtDirectionalLight,
  FtMesh,
  FtMeshStandardMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtSphereGeometry,
  FtTextureLoader,
  FtWebglRenderer,
  useGui,
} from 'farst-three'
import type { MeshStandardMaterialOptions } from 'farst-three'
const baseUrl = import.meta.env.VITE_BASE_URL

const materialOptions = ref<MeshStandardMaterialOptions>({
  envMapIntensity: 1,
  roughness: 0,
  metalness: 0,
})
const domRef = ref<HTMLDivElement>()
const animationFn = () => {
  //
}

const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.add(materialOptions.value, 'metalness', 0, 1, 0.1)
  gui.add(materialOptions.value, 'roughness', 0, 1, 0.1)
  gui.add(materialOptions.value, 'envMapIntensity', 0, 1, 0.1)
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
