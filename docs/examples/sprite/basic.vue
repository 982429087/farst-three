<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <template v-for="item in positions" :key="item">
        <FtSprite
          :options="{
            position: {
              set: [item.x, item.y, item.z],
            },
          }"
        >
          <FtSpriteMaterial
            :params="{
              color: Math.random() * 0xffffff,
              rotation: Math.random() * Math.PI,
              opacity: Math.random(),
            }"
          >
            <FtTextureLoader
              :options="{
                colorSpace: SRGBColorSpace,
              }"
              url="\textures\raindrop.png"
              :type="'map'"
            />
          </FtSpriteMaterial>
        </FtSprite>
      </template>

      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0.1, 4, 7],
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
import { SRGBColorSpace, type Vector3 } from 'three'
import {
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtSprite,
  FtSpriteMaterial,
  FtTextureLoader,
  FtWebglRenderer,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()

const positions: { x: number; y: number; z: number }[] = []
for (let x = -10; x < 10; x++) {
  for (let y = -10; y < 10; y++) {
    positions.push({
      x: x * Math.random(),
      y: y * Math.random(),
      z: Math.random() * 10,
    })
  }
}

const animationFn = () => {
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
