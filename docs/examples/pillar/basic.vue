<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera :options="cameraOptions" />
      <FtWebglRenderer>
        <FtPillar :options="pillarOptions" />
        <FtPillar
          v-for="item in 5"
          :key="item"
          :options="{
            x: item,
            z: item,
            materialOptions: {
              color: '#ff0000',
            },
          }"
        />
        <FtGridHelper />
        <FtOrbitControls />
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
  FtPillar,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type { PillarOptions } from '@farst-three/components'
const domRef = ref<HTMLDivElement>()
const cameraOptions = reactive({
  position: {
    set: [0, 10, 7],
  },
})
const pillarOptions = reactive<PillarOptions>({
  x: 0,
  y: 0,
  z: 0,
  materialOptions: {
    color: '#00ffc4',
  },
})
const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.addColor(pillarOptions.materialOptions!, 'color')
  gui.add(pillarOptions, 'x', -10, 10, 1)
  gui.add(pillarOptions, 'y', -10, 10, 1)
  gui.add(pillarOptions, 'z', -10, 10, 1)
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
