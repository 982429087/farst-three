<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="27"
        :near="5"
        :far="3500"
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
        <FtPoints :options="pointsOpts">
          <FtPointsMaterial
            :params="{
              size: 15,
              depthTest: true, // 深度测试
              depthWrite: false, // 材质是否对深度缓冲区有影响
              blending: AdditiveBlending,
            }"
          >
            <FtTextureLoader
              :type="'map'"
              :url="baseUrl + 'textures/snowflake.png'"
            />
          </FtPointsMaterial>
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
  AdditiveBlending,
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
  FtTextureLoader,
  FtWebglRenderer,
} from 'farst-three'
import type { DeepPartial, OptionFunction, Options } from '@farst-three/utils'
import type { NormalBufferAttributes, Vector3 } from 'three'
import type {
  AmbientLightOptions,
  BufferGeometryOptions,
  PointsOptions,
} from 'farst-three'
const domRef = ref<HTMLDivElement>()
const baseUrl = import.meta.env.VITE_BASE_URL

const positions: number[] = []
const colors: number[] = []
const particles = 10000
const color = new Color()
const speed = new Float32Array(particles)
const delta = new Float32Array(particles)

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
  speed[i] = Math.random()
  delta[i] = Math.random()
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
  },
  computeBoundingSphere: true,
})

const copyPosition = [...positions]
const length = copyPosition.length / 3
const animationFn = () => {
  for (let i = 0; i < length; i++) {
    const i3 = i * 3
    const i31 = i3 + 1
    copyPosition[i3] += speed[i3] / 20
    copyPosition[i31] -= speed[i * 2] / 10 + delta[i3] / 5

    if (copyPosition[i3] >= 500) {
      copyPosition[i3] = Math.random() * 60 - 100
      copyPosition[i31] = Math.random() * 60 - 10
    }
  }
  ;(
    bufferGeoOpts.attributes as DeepPartial<Options<NormalBufferAttributes>>
  ).position = () => new Float32BufferAttribute(copyPosition, 3)
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
