<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera :options="cameraOptions" />
      <FtWebglRenderer
        :params="{
          antialias: true,
          alpha: true,
        }"
      >
        <FtMesh
          :options="{
            position: {
              set: [0, 20, 0],
            },
          }"
        >
          <FtBoxGeometry :width="20" :height="20" :depth="20" />
          <FtMeshPhongMaterial
            :params="{
              color: 0xffffff,
            }"
          />
        </FtMesh>
        <FtReflectorPlane
          :options="reflectorPlaneOpts"
          :floor-mesh-options="floorMeshOpts"
          :circle-mesh-options="circleMeshOpts"
          :mirror-options="mirrorOpts"
        />
        <FtOrbitControls />
        <FtAxesHelper :size="1000" />
        <!-- <FtAmbientLight :options="{ color: () => new Color('#ffffff') }" /> -->
        <FtPointLight
          :color="0xe7e7e7"
          :intensity="2.5"
          :distance="250"
          :decay="0"
          :options="{
            position: {
              set: [0, 60, 0],
            },
          }"
        />
        <FtPointLight
          :color="0x00ff00"
          :intensity="0.5"
          :distance="1000"
          :decay="0"
          :options="{
            position: {
              set: [550, 60, 0],
            },
          }"
        />
        <FtPointLight
          :color="0xff0000"
          :intensity="0.5"
          :distance="1000"
          :decay="0"
          :options="{
            position: {
              set: [-550, 60, 0],
            },
          }"
        />
        <FtPointLight
          :color="0xbbbbfe"
          :intensity="0.5"
          :distance="1000"
          :decay="0"
          :options="{
            position: {
              set: [0, 60, 550],
            },
          }"
        />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtAxesHelper,
  FtBoxGeometry,
  FtMesh,
  FtMeshPhongMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPointLight,
  FtReflectorPlane,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type { ReflectorPlaneOptions } from '@farst-three/components'
const domRef = ref<HTMLDivElement>()
const cameraOptions = reactive({
  position: {
    set: [0, 100, 70],
  },
})

const reflectorPlaneOpts = reactive<ReflectorPlaneOptions>({
  mirrorPlaneGeometryOptions: [800, 800],
  circlePlaneGeometryOptions: [120, 120],
  circleMaterialOptions: {
    color: 0x00ffff,
  },
  floorMaterialOptions: {
    color: 0xffffff,
  },
  reflectorOptions: {
    color: '#8f9299',
  },
})
const floorMeshOpts = reactive({
  position: {
    y: 0.3,
  },
})
const circleMeshOpts = reactive({
  position: {
    y: 0.4,
  },
})
const mirrorOpts = reactive({
  position: {
    y: -0.1,
  },
})

const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.add(reflectorPlaneOpts.mirrorPlaneGeometryOptions!, '0', 1, 1000, 10)
  gui.add(reflectorPlaneOpts.circlePlaneGeometryOptions!, '0', 1, 200, 10)
  gui.addColor(reflectorPlaneOpts.circleMaterialOptions!, 'color')
  gui.addColor(reflectorPlaneOpts.floorMaterialOptions!, 'color')
  gui.addColor(reflectorPlaneOpts.reflectorOptions!, 'color')
  gui.add(floorMeshOpts.position!, 'y', -5, 5, 0.5).name('floor y')
  gui.add(circleMeshOpts.position!, 'y', -5, 5, 0.5).name('circle y')
  gui.add(mirrorOpts.position!, 'y', -5, 5, 0.5).name('mirror y')
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
