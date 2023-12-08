<template>
  <div ref="domRef" class="farst-three">
    <FtScene :options="sceneOptions" @hover-position="onLiquidHover">
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0, 20, 0],
          },
        }"
      />
      <FtWebglRenderer
        :params="{ antialias: true }"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtAmbientLight :color="0xffffff" />
        <FtGroup
          :options="{
            rotation: {
              set: [-Math.PI / 2, 0, 0],
            },
          }"
        >
          <FtMesh>
            <FtPlaneGeometry
              :width="state.WIDTH"
              :height="state.HEIGHT"
              :width-segments="512"
              :height-segments="512"
            />
            <FtLiquidPlane
              :params="{
                color: 0xffffff,
                metalness: 0.2,
                roughness: 0,
                displacementScale: 20,
                transmission: 1,
                thickness: 4,
                envMapIntensity: 1,
                side: DoubleSide,
              }"
              @load="onLiquidLoad"
            >
              <FtCubeTextureLoader
                :type="'envMap'"
                :urls="[
                  baseUrl + 'textures/fullscreen/1.left.jpg',
                  baseUrl + 'textures/fullscreen/1.right.jpg',
                  baseUrl + 'textures/fullscreen/1.top.jpg',
                  baseUrl + 'textures/fullscreen/1.bottom.jpg',
                  baseUrl + 'textures/fullscreen/1.front.jpg',
                  baseUrl + 'textures/fullscreen/1.back.jpg',
                ]"
                :load="rgbeLoad"
              />
            </FtLiquidPlane>
          </FtMesh>

          <FtMesh
            :options="{
              position: {
                z: -2,
              },
            }"
          >
            <FtPlaneGeometry
              :width="state.WIDTH"
              :height="state.HEIGHT"
              :width-segments="512"
              :height-segments="512"
            />
            <FtMeshStandardMaterial
              :params="{
                metalness: 0.2,
                roughness: 0,
              }"
            >
              <FtTextureLoader
                :type="'map'"
                :url="baseUrl + 'textures/Tiles107_1K_Color.jpg'"
              />
            </FtMeshStandardMaterial>
          </FtMesh>
        </FtGroup>

        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { DoubleSide, EquirectangularReflectionMapping } from 'three'
import {
  FtAmbientLight,
  FtCubeTextureLoader,
  FtGroup,
  FtLiquidPlane,
  FtMesh,
  FtMeshStandardMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPlaneGeometry,
  FtRgbeLoader,
  FtScene,
  FtTextureLoader,
  FtWebglRenderer,
} from 'farst-three'
import type {
  CubeTextureLoaderOnLoad,
  FunsEvent,
  LiquidEffect,
  LiquidInstance,
  LiquidLoadEvent,
  RGBELoaderOnLoad,
  SceneOptions,
} from 'farst-three'
const baseUrl = import.meta.env.VITE_BASE_URL

const domRef = ref<HTMLDivElement>()
const liquid = ref<LiquidInstance>()
const sceneOptions = reactive<SceneOptions>({})

const state = reactive({
  WIDTH: 30,
  HEIGHT: 30,
})
let liquidEffect: LiquidEffect
function onLiquidLoad(e: LiquidLoadEvent) {
  liquidEffect = e.liquidEffect
  e.liquidEffect.addDrop(0, 0, 0.05, 0.05)
}

function onLiquidHover({ position }: FunsEvent) {
  if (!position || !liquidEffect) return

  const x = (2 * position.x) / state.WIDTH
  const y = (2 * -position.z) / state.HEIGHT
  liquidEffect.addDrop(x, y, 0.025, 0.005)
}

const rgbeLoad: CubeTextureLoaderOnLoad = (e) => {
  sceneOptions.background = () => e
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
