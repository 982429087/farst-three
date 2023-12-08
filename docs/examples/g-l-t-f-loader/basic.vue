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

      <FtWebglRenderer
        :params="{ antialias: true, logarithmicDepthBuffer: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtGLTFLoader :url="url" :load="gltfLoad" />
        <FtGLTFLoader :url="url2" :load="glbLoad" decoder-path="/draco/" />
        <FtAmbientLight />
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
  // useEffectComposer,
} from 'farst-three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
const domRef = ref<HTMLDivElement>()
const baseUrl = import.meta.env.VITE_BASE_URL

const url = `${baseUrl}models/batman_arkham_knight_batmobile/scene.gltf`
const url2 = `${baseUrl}models/LittlestTokyo.glb`
// const { composer } = useEffectComposer()

const animationFn = () => {
  //
}
function gltfLoad(e: GLTF) {
  e.scene.scale.set(1.2, 1.2, 1.2)
  e.scene.traverse((child) => {
    console.log(child.name === 'Object687')
  })
  e.scene.getObjectByName('Object687')
}
function glbLoad(e: GLTF) {
  e.scene.scale.set(0.05, 0.05, 0.05)
}
// const { gui } = useGui(domRef)
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
