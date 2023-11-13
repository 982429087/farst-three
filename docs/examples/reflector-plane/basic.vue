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
        <FtReflectorPlane />
        <FtOrbitControls />
        <!-- <FtAmbientLight :options="{ color: () => new Color('#ffffff') }" /> -->
        <FtPointLight
          :options="{
            color: () => new Color('#ffffff'),
            position: {
              set: [0, 100, 0],
            },
          }"
        />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Color } from 'three'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPointLight,
  FtReflectorPlane,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()
const cameraOptions = reactive({
  position: {
    set: [0, 100, 70],
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
