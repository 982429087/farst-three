<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera :options="cameraOptions" />
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
const cameraOptions = reactive({
  position: {
    set: [0, 5, 5],
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
