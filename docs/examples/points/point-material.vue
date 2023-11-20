<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="27"
        :near="5"
        :far="3500"
        :options="{
          position: {
            z: 20,
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
        <FtPoints
          :options="{
            position: {
              x: 2,
            },
          }"
        >
          <FtPointsMaterial
            :params="{
              size: 0.05,
              color: 0xffffff * Math.random(),
              sizeAttenuation: false, // 粒子大小不受距离影响 (仅限于透视摄像机)
            }"
            :options="pointMaterialOpts"
          />
          <FtBoxGeometry
            :width="2"
            :height="2"
            :depth="2"
            :width-segments="16"
            :height-segments="32"
            :depth-segments="32"
          />
        </FtPoints>
        <FtPoints
          :options="{
            position: {
              x: -2,
            },
          }"
        >
          <FtPointsMaterial
            :params="{
              size: 0.05,
              color: 0xffffff * Math.random(),
            }"
            :options="pointMaterialOpts"
          />
          <FtSphereGeometry
            :radius="2"
            :width-segments="32"
            :height-segments="32"
          />
        </FtPoints>
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
  FtBoxGeometry,
  FtBufferGeometry,
  FtGridHelper,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPoints,
  FtPointsMaterial,
  FtScene,
  FtSphereGeometry,
  FtWebglRenderer,
} from '@farst-three/components'
import type { Vector3 } from 'three'
import type {
  AmbientLightOptions,
  BoxGeometryOptions,
  BufferGeometryOptions,
  PointsMaterialOptions,
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

const bufferGeoOpts = reactive<BufferGeometryOptions>({
  attributes: {
    position: () => new Float32BufferAttribute(positions, 3),
    color: () => new Float32BufferAttribute(colors, 3),
  },
  computeBoundingSphere: true,
})

const animationFn = () => {
  //
}

const pointMaterialOpts = reactive<PointsMaterialOptions>({
  size: 0.05,
})

const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.add(pointMaterialOpts, 'size', 0.05, 0.5, 0.01)
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
