<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="27"
        :near="2"
        :far="3500"
        :options="cameraOptions"
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
              color: '#ffffff',
              size: 0.1,
              depthTest: true, // 深度测试
              depthWrite: false, // 材质是否对深度缓冲区有影响
              blending: AdditiveBlending,
            }"
          />
          <FtBufferGeometry :options="bufferGeoOpts" />
        </FtPoints>
        <FtFog :color="0x000000" :near="0" :far="20" />

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
  FtFog,
  FtGridHelper,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPoints,
  FtPointsMaterial,
  FtScene,
  FtTextureLoader,
  FtWebglRenderer,
} from '@farst-three/components'
import type { DeepPartial, OptionFunction, Options } from '@farst-three/utils'
import type {
  BufferGeometry,
  Euler,
  NormalBufferAttributes,
  Vector3,
} from 'three'
import type {
  AmbientLightOptions,
  BufferGeometryOptions,
  PointsOptions,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()

const positions: number[] = []
const particles = 700
const cameraOptions = reactive({
  position: {
    z: 0,
  },
})

const n = 1000,
  n2 = n / 2 // particles spread in the cube

function random(min: number, max: number) {
  return min + Math.random() * (max - min)
}
for (let i = 0; i < particles; i++) {
  // positions

  const x = Math.sin(i)
  const y = Math.cos(i)
  const z = random(-60, 0)

  positions.push(x, y, z)
}

const pointsOpts = reactive<PointsOptions>({
  rotation: {
    z: 0,
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
    const i32 = i3 + 2
    const z = copyPosition[i32]
    const diatance = z - cameraOptions.position.z
    if (diatance >= 0) {
      copyPosition[i32] = random(-100, -50)
    } else copyPosition[i32] = z + 0.01
  }
  const attributes = bufferGeoOpts.attributes as DeepPartial<
    Options<NormalBufferAttributes>
  >
  const rotation = pointsOpts.rotation as Euler
  attributes.position = () => new Float32BufferAttribute(copyPosition, 3)
  rotation.z += 0.01
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
