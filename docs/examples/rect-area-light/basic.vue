<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
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
        <FtMesh :options="boxOpts">
          <FtBoxGeometry :width="1" :height="1" :depth="1" />
          <FtMeshStandardMaterial :params="{ color: 0x1890ff }" />
        </FtMesh>
        <FtMesh :options="wallOps">
          <FtPlaneGeometry :width="10" :height="10" />
          <FtMeshStandardMaterial :params="{ side: DoubleSide }">
            <FtTextureLoader
              :url="
                baseUrl +
                'textures/large_sandstone_blocks/large_sandstone_blocks_diff_2k.jpg'
              "
              :type="'map'"
            />
          </FtMeshStandardMaterial>
        </FtMesh>
        <FtMesh :options="floorOps">
          <FtPlaneGeometry :width="10" :height="10" />
          <FtMeshStandardMaterial :params="{ side: DoubleSide, roughness: 0 }">
            <FtTextureLoader
              :url="
                baseUrl + 'textures/floor_tiles_06/floor_tiles_06_diff_2k.jpg'
              "
              :type="'map'"
            />
          </FtMeshStandardMaterial>
        </FtMesh>
        <FtGroup
          :options="{
            position: {
              z: -5,
              y: 4,
            },
          }"
        >
          <FtMesh
            :options="{
              position: {
                z: 0.001,
              },
            }"
          >
            <FtPlaneGeometry :width="4.4" :height="6.4" />
            <FtMeshStandardMaterial :params="{ color: 0xd08a38 }" />
          </FtMesh>

          <FtMesh
            :options="{
              position: {
                z: 0.005,
              },
            }"
          >
            <FtPlaneGeometry :width="4" :height="6" />
            <FtMeshStandardMaterial :params="{ roughness: 0 }">
              <FtTextureLoader
                :url="baseUrl + 'textures/frames/A02I7634.png'"
              />
            </FtMeshStandardMaterial>
          </FtMesh>
        </FtGroup>

        <FtRectAreaLight
          :color="0xffffff"
          :intensity="10"
          :width="2"
          :height="4"
          :options="{
            position: {
              set: [0, 1, 5],
            },
          }"
          :uniforms="true"
        >
          <FtRectAreaLightHelper />
        </FtRectAreaLight>
        <FtAmbientLight
          :options="lightOptions"
          :color="0xffffff"
          :intensity="0.95"
        />
        <FtGridHelper />

        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Color, DoubleSide } from 'three'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtGridHelper,
  FtGroup,
  FtMesh,
  FtMeshLambertMaterial,
  FtMeshStandardMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPlaneGeometry,
  FtRectAreaLight,
  FtRectAreaLightHelper,
  FtScene,
  FtTextureLoader,
  FtWebglRenderer,
} from 'farst-three'
import type { AmbientLightOptions, MeshOptions } from 'farst-three'
const baseUrl = import.meta.env.VITE_BASE_URL

const domRef = ref<HTMLDivElement>()
const boxOpts = reactive<MeshOptions>({
  position: {
    z: -1,
    x: 0,
    y: 0,
  },
  castShadow: true,
})
const wallOps = reactive<MeshOptions>({
  position: {
    y: 4,
    z: -5,
  },
  receiveShadow: true,
})
const floorOps = reactive<MeshOptions>({
  rotation: {
    x: -Math.PI / 2,
  },
  receiveShadow: true,
  position: {
    y: -1,
  },
})

const lightOptions = reactive<AmbientLightOptions>({
  position: { set: [1, 2, 4] },
  intensity: 0.05,
  visible: true,
  color: () => new Color(0xffffff),
})

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
