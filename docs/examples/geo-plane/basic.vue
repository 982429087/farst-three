<template>
  <el-button @click="handleCamera">打印相机</el-button>

  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="45"
        :near="0.01"
        :far="2050"
        :options="{
          position: {
            set: [3.53, 74.82, 112.39],
          },
        }"
        @load="cameraLoad"
      />
      <FtWebglRenderer
        :params="{ antialias: true, alpha: true }"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtGeoPlane :url="'/jinghuacity.json'" />
        <!--             autoRotate: true,
            autoRotateSpeed: 0.5, -->
        <FtOrbitControls
          :options="{
            enableDamping: true,
            enableZoom: true,
            minDistance: 1,
            maxDistance: 2000,
            maxPolarAngle: (Math.PI / 180) * 75,
            enablePan: true,
          }"
        />
        <FtAmbientLight :color="0x02518d" :intensity="0.8" />
        <FtDirectionalLight
          :color="0x02518d"
          :intensity="0.5"
          :options="{ position: { set: [100, 10, -100] } }"
        />
        <FtDirectionalLight
          :color="0x02518d"
          :intensity="0.8"
          :options="{ position: { set: [100, 10, 100] } }"
        />
        <FtAxesHelper :size="10000" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import {
  FtAmbientLight,
  FtAxesHelper,
  FtDirectionalLight,
  FtGeoPlane,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPointLight,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type { PerspectiveCamera } from 'three'
import type { PerspectiveCameraLoadEvent } from '@farst-three/components'

const domRef = ref<HTMLDivElement>()
const pcamera = shallowRef<PerspectiveCamera>()
function cameraLoad({ camera }: PerspectiveCameraLoadEvent) {
  pcamera.value = camera
}
function handleCamera() {
  console.log(pcamera.value?.position)
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
