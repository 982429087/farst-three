<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera :options="cameraOptions" />
      <FtWebglRenderer>
        <FtPointMarker
          v-for="item in 5"
          :key="item"
          :options="{
            x: item,
            z: item,
            scale: 1.1,
          }"
        />
        <FtPointMarker :options="pointMarkerOptions" />
        <FtOrbitControls />
        <FtGridHelper />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useGui } from '@farst-three/hooks'
import {
  FtGridHelper,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPointMarker,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type { PointMarkerOptions } from '@farst-three/components'
const domRef = ref<HTMLDivElement>()
const cameraOptions = reactive({
  position: {
    set: [0, 10, 7],
  },
})
const pointMarkerOptions = reactive<PointMarkerOptions>({
  x: 0,
  y: 0,
  z: 0,
  materialOptions: {
    color: '#00ffc4',
  },
})
const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.add(pointMarkerOptions, 'x', -10, 10, 1)
  gui.add(pointMarkerOptions, 'y', -10, 10, 1)
  gui.add(pointMarkerOptions, 'z', -10, 10, 1)
  gui.addColor(pointMarkerOptions.materialOptions!, 'color')
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
