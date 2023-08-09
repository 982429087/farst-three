<template>
  <div ref="domRef" class="farst-three">
    <FtScene
      :options="{
        background: () => new Color(0x050505),
        fog: () => new Fog(0x050505, 2000, 3500),
      }"
    >
      <FtPoints :options="pointsOpts">
        <FtPointsMaterial
          :params="{
            size: 15,
            vertexColors: true,
          }"
        />
        <FtBufferGeometry :options="bufferGeoOpts" />
      </FtPoints>
      <FtPerspectiveCamera
        :fov="27"
        :near="5"
        :far="3500"
        :options="{
          position: {
            z: 2750,
          },
        }"
      />

      <FtGridHelper />
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
import { Color, Float32BufferAttribute, Fog, SRGBColorSpace } from 'three'
import { useGui } from '@farst-three/hooks'
import {
  FtBufferGeometry,
  FtGridHelper,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPoints,
  FtPointsMaterial,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type { Vector3 } from 'three'
import type {
  AmbientLightOptions,
  BufferGeometryOptions,
  PointsOptions,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()

const positions: number[] = []
const colors: number[] = []
const particles = 500000
const color = new Color()

const n = 1000,
  n2 = n / 2 // particles spread in the cube

for (let i = 0; i < particles; i++) {
  // positions

  const x = Math.random() * n - n2
  const y = Math.random() * n - n2
  const z = Math.random() * n - n2

  positions.push(x, y, z)

  // colors

  const vx = x / n + 0.5
  const vy = y / n + 0.5
  const vz = z / n + 0.5

  color.setRGB(vx, vy, vz, SRGBColorSpace)

  colors.push(color.r, color.g, color.b)
}

const pointsOpts = reactive<PointsOptions>({
  rotation: {
    x: 0,
    y: 0,
  },
})

const bufferGeoOpts = reactive<BufferGeometryOptions>({
  attributes: {
    position: () => new Float32BufferAttribute(positions, 3),
    color: () => new Float32BufferAttribute(colors, 3),
  },
  computeBoundingSphere: true,
})
const position = pointsOpts.rotation as Vector3
const animationFn = () => {
  const time = Date.now() * 0.001
  position.x = time * 0.25
  position.y = time * 0.25
}

const { gui } = useGui(domRef)
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
