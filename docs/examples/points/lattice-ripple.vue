<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="27"
        :near="5"
        :far="3500"
        :options="{
          position: {
            z: 50,
            y: 3,
            x: 20,
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
        <FtPoints :options="pointsOpts">
          <FtPointsMaterial
            :params="{
              size: 0.2,
              vertexColors: true, // 顶点颜色
            }"
          />
          <FtBufferGeometry :options="bufferGeoOpts" />
        </FtPoints>
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  BufferAttribute,
  Clock,
  Color,
  Float32BufferAttribute,
  Fog,
  SRGBColorSpace,
} from 'three'
import {
  FtBufferGeometry,
  FtGridHelper,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPoints,
  FtPointsMaterial,
  FtScene,
  FtWebglRenderer,
} from 'farst-three'

import type {
  AmbientLightOptions,
  BufferGeometryOptions,
  PointsOptions,
} from 'farst-three'
const domRef = ref<HTMLDivElement>()

const positions: number[] = []
const colors: number[] = []
const color = new Color()

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    const x = i - 50
    const y = j - 50
    positions.push(x, y, 0)
    color.setRGB(Math.random(), Math.random(), Math.random(), SRGBColorSpace)
    colors.push(color.r, color.g, color.b)
  }
}

const pointsOpts = reactive<PointsOptions>({
  rotation: {
    x: -Math.PI * 0.49,
  },
})

const bufferGeoOpts = reactive<BufferGeometryOptions>({
  attributes: {
    position: () => new Float32BufferAttribute(positions, 3),
    color: () => new Float32BufferAttribute(colors, 3),
  },
  computeBoundingSphere: true,
})
const clock = new Clock()
const animationFn = () => {
  const elapsedTime = clock.getElapsedTime() * 2
  const count = positions.length / 3
  const ppp: any = []
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const x = positions[i3]
    const y = positions[i3 + 1]
    const z =
      Math.sin(x * 0.5 + elapsedTime) * 0.2 +
      Math.cos(y * 0.5 + elapsedTime) * 0.2
    ppp.push(x, y, z)
  }
  bufferGeoOpts.attributes = {
    position: () => new Float32BufferAttribute(ppp, 3),
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
