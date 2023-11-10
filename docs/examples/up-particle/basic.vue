<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0.1, 4, 7],
          },
        }"
      />

      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtUpParticle />
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useGui } from '@farst-three/hooks'
import {
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtUpParticle,
  FtWebglRenderer,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()

const animationFn = () => {
  //
}

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
