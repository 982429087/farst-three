<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtMesh
        :options="{
          position: {
            z: 40,
            y: -1,
          },
          receiveShadow: true,
        }"
      >
        <FtBoxGeometry :width="100" :height="4" :depth="100" />
        <FtMeshLambertMaterial>
          <FtTextureLoader url="\textures\monastery_stone_floor_diff_2k.jpg" />
        </FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh
        :options="{
          position: {
            z: -140,
            y: -1,
          },
          receiveShadow: true,
        }"
      >
        <FtBoxGeometry :width="50" :height="4" :depth="50" />
        <FtMeshLambertMaterial>
          <FtTextureLoader url="\textures\monastery_stone_floor_diff_2k.jpg" />
        </FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh
        :options="{
          position: {
            y: 3,
            z: 12,
          },
          castShadow: true,
        }"
      >
        <FtSphereGeometry
          :radius="2"
          :height-segments="64"
          :width-segments="64"
        />
        <FtMeshLambertMaterial>
          <FtTextureLoader url="\textures\decorative-4813.jpg" />
        </FtMeshLambertMaterial>
      </FtMesh>
      <FtGroup
        :options="{
          position: {
            z: -95,
          },
        }"
      >
        <FtMesh
          v-for="item in 8"
          :key="item"
          :options="{
            position: {
              z: 10 * item,
              y: -10,
            },
          }"
        >
          <FtBoxGeometry :width="10" :height="10" :depth="10" />
          <FtMeshLambertMaterial>
            <FtTextureLoader
              url="\textures\monastery_stone_floor_diff_2k.jpg"
            />
          </FtMeshLambertMaterial>
        </FtMesh>
      </FtGroup>
      <FtAmbientLight :color="0xffffff" :intensity="0.95" />
      <FtGridHelper
        :size="100"
        :divisions="100"
        :color1="0xcd37aa"
        :color2="0x4a4a4a"
      />
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="500"
        :options="{
          position: {
            set: [0.01, 40, 40],
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
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtGridHelper,
  FtGroup,
  FtMesh,
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtSphereGeometry,
  FtTextureLoader,
  FtWebglRenderer,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()

const animationFn = () => {
  //
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
