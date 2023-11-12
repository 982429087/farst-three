<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera :options="cameraOptions" />
      <FtWebglRenderer>
        <FtDomMarkerRenderer>
          <FtDomMarker :point="[0, 0]">0,0</FtDomMarker>
          <FtDomMarker :point="[0, 5]" :y="5">0,5,5</FtDomMarker>
          <FtDomMarker :point="[-5, 0]">-5,0</FtDomMarker>
          <FtDomMarker :point="[0, -5]">-5,0</FtDomMarker>
          <FtDomMarker :point="[5, 0]">5,0</FtDomMarker>
        </FtDomMarkerRenderer>
        <FtOrbitControls />
        <FtAxesHelper :size="5" />
        <FtGridHelper :size="10" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useGui } from '@farst-three/hooks'
import {
  FtAxesHelper,
  FtDomMarker,
  FtDomMarkerRenderer,
  FtGridHelper,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()
const cameraOptions = reactive({
  position: {
    set: [0, 10, 7],
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
