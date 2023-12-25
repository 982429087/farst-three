<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera :fov="fov" :far="2000" :options="cameraOptions" />
      <FtWebglRenderer>
        <FtQuantum />
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
  FtQuantum,
  FtScene,
  FtWebglRenderer,
  useGui,
} from 'farst-three'

const domRef = ref<HTMLDivElement>()
const perspective = 800
const fov =
  (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI
const cameraOptions = reactive({
  position: {
    set: [0, 0, perspective],
  },
})
const { guiPromise } = useGui(domRef)

guiPromise.then((gui) => {
  //
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
