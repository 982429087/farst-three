<template>
  <div ref="domRef" class="farst-three">
    <FtScene
      :options="{ background: () => new Color(0xffffff) }"
      @click="handleClick"
    >
      <FtPerspectiveCamera
        :options="{
          position: {
            set: [0.1, 0, 15],
          },
        }"
      />

      <FtWebglRenderer :animation-fn="animationFn">
        <FtAmbientLight :color="0x808080" />
        <FtPointLight
          :color="0xffffff"
          :options="{ position: { y: 50, z: 0 } }"
        />
        <FtPointLight
          :color="0xffffff"
          :options="{ position: { y: -50, z: 0 } }"
        />
        <FtPointLight
          :color="0xffffff"
          :options="{ position: { y: 0, z: 0 } }"
        />
        <FtMesh v-for="i in n" :key="i" :options="meshOptionsArr[i - 1]">
          <FtTorusGeometry
            :radius="i * 0.2"
            :tube="0.1"
            :radial-segments="8"
            :tubular-segments="(i + 2) * 4"
          />
          <FtMeshToonMaterial :options="toonOptionaArr[i - 1]" />
        </FtMesh>
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import chroma from 'chroma-js'
import { Color } from 'three'
import {
  FtAmbientLight,
  FtMesh,
  FtMeshToonMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPointLight,
  FtScene,
  FtTorusGeometry,
  FtWebglRenderer,
} from '@farst-three/components'

const domRef = ref<HTMLDivElement>()
const n = 30
let cscale = chroma.scale(['#dd3e1b', '#0b509c'])
const toonOptionaArr = reactive(
  Array.from({ length: n }, (_, i) => {
    return {
      color: () => new Color(color(i + 1)),
    }
  })
)
const meshOptionsArr = reactive(
  Array.from({ length: n }, () => ({
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  }))
)

function color(i: number) {
  return cscale(i / 30).css()
}

function handleClick() {
  cscale = chroma.scale([chroma.random(), chroma.random(), chroma.random()])
  toonOptionaArr.forEach((_, i) => {
    toonOptionaArr[i].color = () => new Color(color(i))
  })
}

function animationFn() {
  const t = Date.now()
  let ti, mesh
  for (let i = 1; i <= n; i++) {
    mesh = meshOptionsArr[i - 1]
    ti = t - i * 500
    mesh.rotation.x = ti * 0.00015
    mesh.rotation.y = ti * 0.0002
    mesh.rotation.z = ti * 0.00017
  }
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
