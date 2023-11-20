<template>
  <div ref="domRef" class="farst-three">
    <FtScene
      :options="{
        background: () => new Color(0xffffff),
      }"
    >
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
            <FtTextureLoader
              url="/textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_roughness.jpg"
              type="roughnessMap"
            />
            <FtTextureLoader
              url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_metallic.jpg"
              type="metalnessMap"
            />
            <FtCubeTextureLoader
              :urls="[
                '/textures/fullscreen/1.left.jpg',
                '/textures/fullscreen/1.right.jpg',
                '/textures/fullscreen/1.top.jpg',
                '/textures/fullscreen/1.bottom.jpg',
                '/textures/fullscreen/1.front.jpg',
                '/textures/fullscreen/1.back.jpg',
              ]"
              type="envMap"
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
          <FtMeshPhysicalMaterial :options="phymaterialOptions">
            <FtTextureLoader
              url="/textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_roughness.jpg"
              type="roughnessMap"
            />
            <FtCubeTextureLoader
              :urls="[
                '/textures/fullscreen/1.left.jpg',
                '/textures/fullscreen/1.right.jpg',
                '/textures/fullscreen/1.top.jpg',
                '/textures/fullscreen/1.bottom.jpg',
                '/textures/fullscreen/1.front.jpg',
                '/textures/fullscreen/1.back.jpg',
              ]"
              type="envMap"
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
        <FtGridHelper />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Color } from 'three'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtCubeTextureLoader,
  FtDirectionalLight,
  FtGridHelper,
  FtMesh,
  FtMeshPhysicalMaterial,
  FtMeshStandardMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtSphereGeometry,
  FtTextureLoader,
  FtWebglRenderer,
} from '@farst-three/components'
import type {
  MeshPhysicalMaterialOptions,
  MeshStandardMaterialOptions,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()
const materialOptions = ref<MeshStandardMaterialOptions>({
  envMapIntensity: 1,
  roughness: 0,
  metalness: 0,
})

const phymaterialOptions = ref<MeshPhysicalMaterialOptions>({
  clearcoat: true,
  envMapIntensity: 1,
  roughness: 0,
  transmission: 1,
  ior: 1,
  thickness: 1.0,
})

const animationFn = () => {
  //
}

const { guiPromise } = useGui(domRef)

guiPromise.then((gui) => {
  gui.add(phymaterialOptions.value, 'roughness', 0, 1, 0.1)
  gui.add(phymaterialOptions.value, 'clearcoat')
  gui.add(phymaterialOptions.value, 'transmission', 0, 1, 0.1)
  gui.add(phymaterialOptions.value, 'ior', 1, 2.33, 0.1)
  gui.add(phymaterialOptions.value, 'thickness', 0, 1, 0.1)
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
