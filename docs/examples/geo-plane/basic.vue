<template>
  <el-button @click="handleCamera">打印相机</el-button>

  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100000"
        :options="{
          position: {
            set: [-0.45, -2.1, 5.6],
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
        <FtOrbitControls />
        <FtAmbientLight :color="0xffffff" :intensity="1" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import {
  FtAmbientLight,
  FtGeoPlane,
  FtOrbitControls,
  FtPerspectiveCamera,
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
