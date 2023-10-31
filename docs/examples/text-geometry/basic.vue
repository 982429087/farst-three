<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtMesh>
        <FtTextGeometry
          :url="'/helvetiker_regular.typeface.json'"
          :text="'this is font text'"
          :params="{
            size: 10,
            height: 0.5,
          }"
          :center="true"
        />
        <FtMeshPhongMaterial />
      </FtMesh>
      <FtPointLight
        :color="0xff6000"
        :intensity="0.85"
        :options="{ position: { x: 100 } }"
      />
      <FtPointLight
        :color="0x0000ff"
        :intensity="0.85"
        :options="{ position: { x: -100 } }"
      />
      <FtAmbientLight :color="0x808080" />
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="10000"
        :options="{
          position: {
            z: 200,
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
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtMesh,
  FtMeshPhongMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPointLight,
  FtScene,
  FtTextGeometry,
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
