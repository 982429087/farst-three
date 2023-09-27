<template>
  <div ref="domRef" class="farst-three">
    <FtScene
      :options="{
        background: () => new Color(0xffffff),
      }"
    >
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0.1, 4, 20],
          },
        }"
      />
      <FtGLTFLoader :url="url" :load="gltfLoad" />
      <FtAmbientLight />
      <FtWebglRenderer
        :params="{ antialias: true, logarithmicDepthBuffer: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtOrbitControls />
        <FtAxesHelper />
        <FtGridHelper />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Color } from 'three'
import {
  FtAmbientLight,
  FtAxesHelper,
  FtGLTFLoader,
  FtGridHelper,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
const domRef = ref<HTMLDivElement>()
const url = new URL(
  '/models/batman_arkham_knight_batmobile/scene.gltf',
  import.meta.url
).href
console.log(url)

const animationFn = () => {
  //
}
function gltfLoad(e: GLTF) {
  e.scene.scale.set(1.2, 1.2, 1.2)
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
