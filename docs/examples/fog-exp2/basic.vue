<template>
  <div ref="domRef" class="farst-three">
    <FtScene
      :options="{
        background: 0xe0e0e0,
      }"
      @load="(e) => (sceneInsance = e.scene)"
    >
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
        <FtMesh :options="boxOpts" @load="boxmeshLoad">
          <FtBoxGeometry :width="1" :height="1" :depth="1" />
          <FtMeshLambertMaterial :params="{ color: 0x1890ff }" />
        </FtMesh>

        <FtMesh :options="floorOps">
          <FtPlaneGeometry :width="1000" :height="500" />
          <FtMeshMatcapMaterial :params="{ side: DoubleSide }" />
        </FtMesh>
        <FtMesh
          :options="{
            rotation: {
              x: -Math.PI / 2,
            },
            receiveShadow: true,
            position: {
              y: -0.01,
              z: 250,
            },
          }"
        >
          <FtPlaneGeometry :width="1000" :height="500" />
          <FtMeshMatcapMaterial
            :params="{
              color: new Color(0xe0e0e0),
              side: DoubleSide,
              fog: false,
            }"
          />
        </FtMesh>
        <FtMesh
          v-for="item in 300"
          :key="item"
          :options="{
            position: {
              set: [(Math.random() - 0.5) * 50, 1, Math.random() * -50],
            },
            rotation: {
              set: [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI,
              ],
            },
            scale: {
              set: [
                Math.random() * 0.3 + 0.5,
                Math.random() * 0.3 + 0.5,
                Math.random() * 0.3 + 0.5,
              ],
            },
          }"
        >
          <FtTorusGeometry
            :radius="Math.random()"
            :tube="Math.abs(Math.random() - 0.5)"
            :radial-segments="64"
          />
          <FtMeshLambertMaterial :params="{ color: 0xffffff }">
            <FtTextureLoader
              :url="baseUrl + 'textures/matcaps/BA472D_CA6E67-256px.png'"
              :type="'map'"
            />
          </FtMeshLambertMaterial>
        </FtMesh>
        <FtMesh
          v-for="item in 300"
          :key="item"
          :options="{
            position: {
              set: [(Math.random() - 0.5) * 50, 1, Math.random() * 50],
            },
            rotation: {
              set: [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI,
              ],
            },
            scale: {
              set: [
                Math.random() * 0.3 + 0.5,
                Math.random() * 0.3 + 0.5,
                Math.random() * 0.3 + 0.5,
              ],
            },
          }"
        >
          <FtTorusGeometry
            :radius="Math.random()"
            :tube="Math.abs(Math.random() - 0.5)"
            :radial-segments="64"
          />
          <FtMeshLambertMaterial
            :options="{ fog: false }"
            :params="{ color: 0xffffff }"
          >
            <FtTextureLoader
              :url="baseUrl + 'textures/matcaps/BA472D_CA6E67-256px.png'"
              :type="'map'"
            />
          </FtMeshLambertMaterial>
        </FtMesh>
        <FtMesh
          :options="{
            position: {
              y: 9,
            },
            rotation: {
              z: -Math.PI / 4,
            },
          }"
        >
          <FtRingGeometry
            :inner-radius="10"
            :outer-radius="50"
            :theta-segments="4"
            :phi-segments="8"
          />
          <FtMeshLambertMaterial
            :params="{
              color: 0x666666,
              side: DoubleSide,
              fog: false,
            }"
          >
            <FtTextureLoader
              :url="
                baseUrl +
                'textures/large_sandstone_blocks/large_sandstone_blocks_diff_2k.jpg'
              "
              :type="'map'"
              :options="{
                rotation: Math.PI / 4,
                wrapT: RepeatWrapping,
              }"
            />
          </FtMeshLambertMaterial>
        </FtMesh>

        <FtAmbientLight
          :options="lightOptions"
          :color="0xe0e0e0"
          :intensity="0.95"
        />
        <FtFogExp2 :color="0xe0e0e0" :density="0.01" :options="fogOpts" />
        <FtGridHelper :size="1000" :divisions="1000" />
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Color, DoubleSide, MeshLambertMaterial, RepeatWrapping } from 'three'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtFog,
  FtFogExp2,
  FtGridHelper,
  FtMesh,
  FtMeshLambertMaterial,
  FtMeshMatcapMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPlaneGeometry,
  FtRingGeometry,
  FtScene,
  FtTextureLoader,
  FtTorusGeometry,
  FtWebglRenderer,
} from '@farst-three/components'
import type { Material, Mesh, MeshMatcapMaterial, Scene } from 'three'

import type {
  AmbientLightOptions,
  FogExp2Options,
  FogOptions,
  MeshLoadEvent,
  MeshOptions,
} from '@farst-three/components'
const baseUrl = import.meta.env.VITE_BASE_URL

const domRef = ref<HTMLDivElement>()
const boxOpts = reactive<MeshOptions>({
  position: {
    z: 0,
    x: 0,
    y: 1,
  },
  castShadow: true,
})
const floorOps = reactive<MeshOptions>({
  rotation: {
    x: -Math.PI / 2,
  },
  receiveShadow: true,
  position: {
    y: -0.01,
    z: -250,
  },
})
const sceneInsance = ref<Scene>()
const meshInsance = ref<Mesh>()

const lightOptions = reactive<AmbientLightOptions>({
  position: { set: [1, 2, 4] },
  intensity: 0.95,
  visible: true,
  color: () => new Color(0xffffff),
})

const fogOpts = reactive<FogExp2Options>({
  color: () => new Color(0xe0e0e0),
  density: 0.05,
})

const animationFn = () => {
  //
}

const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  const boxFolder = gui.addFolder('box')
  boxFolder.add({ fog: true }, 'fog').onChange((val) => {
    const material = new MeshLambertMaterial({ color: 0x1890ff })
    material.fog = val
    boxOpts.material = () => material
  })
  gui.addColor({ color: 0xe0e0e0 }, 'color').onChange((color) => {
    fogOpts.color = (scene: Scene) => {
      scene.background = new Color(color)
      return new Color(color)
    }
  })
  gui.add(fogOpts, 'density', 0, 0.1)
})

function boxmeshLoad(e: MeshLoadEvent) {
  meshInsance.value = e.mesh
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
