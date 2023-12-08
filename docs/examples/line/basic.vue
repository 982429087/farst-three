<template>
  <div class="farst-three">
    <FtScene @load="sceneLoad">
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0.1, 1, 3],
          },
        }"
      />

      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
      >
        <FtLine>
          <FtLineBasicMaterial :params="{ vertexColors: true }" />
          <FtBufferGeometry :options="buffgeoOpts" @load="bufferGeoLoad" />
        </FtLine>
        <FtDirectionalLight
          :color="0xffffff"
          :intensity="0.7"
          :options="{ position: { set: [1, 2, 4] } }"
        />
        <FtAmbientLight :color="0xffffff" :intensity="0.5" />
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Float32BufferAttribute } from 'three'
import {
  FtAmbientLight,
  FtBufferGeometry,
  FtDirectionalLight,
  FtLine,
  FtLineBasicMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtWebglRenderer,
} from 'farst-three'
import type {
  BufferGeometryLoadEvent,
  BufferGeometryOptions,
  SceneLoadEvent,
} from 'farst-three'

const animationFn = () => {
  //
}
const position: number[] = []
const colors: number[] = []
const numbers = 10000
const r = 4
for (let i = 0; i < numbers; i++) {
  const x = Math.random() * r - r / 2
  const y = Math.random() * r - r / 2
  const z = Math.random() * r - r / 2
  position.push(x, y, z)
  colors.push(x / r + 0.5, y / r + 0.5, z / r + 0.5)
}
const buffgeoOpts = reactive<BufferGeometryOptions>({
  // setAttribute: ['color', new Float32BufferAttribute(colors, 3)],
  attributes: {
    position: () => new Float32BufferAttribute(position, 3),
    color: () => new Float32BufferAttribute(colors, 3),
  },
})

function sceneLoad({ scene }: SceneLoadEvent) {
  //
}
function bufferGeoLoad({ geometry }: BufferGeometryLoadEvent) {
  //
}
</script>
<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
