<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera :options="cameraOptions" />
      <FtWebglRenderer>
        <FtRotationPlane :options="{ speed: 0.001 }" />
        <FtRotationPlane
          :options="planeOption"
          :mesh-options="{
            scale: {
              set: [1.2, 1.2, 1.2],
            },
          }"
        />
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  FtOrbitControls,
  FtPerspectiveCamera,
  FtRotationPlane,
  FtScene,
  FtWebglRenderer,
  useGui,
} from 'farst-three'
import type { RotationPlaneOptions } from 'farst-three'
const domRef = ref<HTMLDivElement>()
const cameraOptions = reactive({
  position: {
    set: [3, 74, 100],
  },
})
const baseUrl = import.meta.env.VITE_BASE_URL

const planeOption = reactive<RotationPlaneOptions>({
  texture: `${baseUrl}geo/rotating-point2.png`,
  speed: -0.001,
})
const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.add(planeOption, 'speed', -0.01, 0.01, 0.001)
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
