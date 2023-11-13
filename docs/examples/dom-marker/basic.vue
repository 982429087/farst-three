<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera :options="cameraOptions" />
      <FtWebglRenderer>
        <FtDomMarkerRenderer>
          <FtDomMarker :x="5" :options="markerOptions">
            <img class="origin-img" src="/images/figure-1.png" alt="" />
            <div>
              {{ (markerOptions.position as any).x }},
              {{ (markerOptions.position as any).y }},
              {{ (markerOptions.position as any).z }}
            </div>
          </FtDomMarker>
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
import type { Vector3 } from 'three'
import type { CSS2DObjectOptions } from '@farst-three/components'
const domRef = ref<HTMLDivElement>()
const cameraOptions = reactive({
  position: {
    set: [0, 10, 7],
  },
})
const markerOptions = reactive<CSS2DObjectOptions>({
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
})
const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.add(markerOptions.position as Vector3, 'x', -10, 10, 1)
  gui.add(markerOptions.position as Vector3, 'y', -10, 10, 1)
  gui.add(markerOptions.position as Vector3, 'z', -10, 10, 1)
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
.origin-img {
  width: 40px;
}
</style>
