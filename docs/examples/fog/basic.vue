<template>
  <div ref="domRef" class="farst-three">
    <FtScene
      :options="{
        background: 0xffff88,
      }"
      @load="(e) => (sceneInsance = e.scene)"
    >
      <FtMesh :options="boxOpts" @load="boxmeshLoad">
        <FtBoxGeometry :width="1" :height="1" :depth="1" />
        <FtMeshLambertMaterial :params="{ color: 0x1890ff }" />
      </FtMesh>
      <FtMesh :options="floorOps">
        <FtPlaneGeometry :width="1000" :height="1000" />
        <FtMeshMatcapMaterial :params="{ side: DoubleSide }" />
      </FtMesh>
      <FtMesh
        v-for="item in 300"
        :key="item"
        :options="{
          position: {
            set: [(Math.random() - 0.5) * 50, 1, (Math.random() - 0.5) * 50],
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
            url="\textures\matcaps\BA472D_CA6E67-256px.png"
            :type="'map'"
          />
        </FtMeshLambertMaterial>
      </FtMesh>
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
      <FtAmbientLight
        :options="lightOptions"
        :color="0x888888"
        :intensity="0.95"
      />
      <FtFog :color="0x888888" :options="fogOpts" />
      <FtGridHelper :size="1000" :divisions="1000" />
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
import { Color, DoubleSide, MeshLambertMaterial } from 'three'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtFog,
  FtGridHelper,
  FtMesh,
  FtMeshLambertMaterial,
  FtMeshMatcapMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPlaneGeometry,
  FtScene,
  FtTextureLoader,
  FtTorusGeometry,
  FtWebglRenderer,
} from '@farst-three/components'
import type { Material, Mesh, MeshMatcapMaterial, Scene } from 'three'

import type {
  AmbientLightOptions,
  FogOptions,
  MeshLoadEvent,
  MeshOptions,
} from '@farst-three/components'
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

const fogOpts = reactive<FogOptions>({
  color: () => new Color(0x888888),
  near: 0,
  far: 20,
})

const animationFn = () => {
  //
}

const { gui } = useGui(domRef)
const boxFolder = gui.addFolder('box')
boxFolder.add({ fog: true }, 'fog').onChange((val) => {
  const material = new MeshLambertMaterial({ color: 0x1890ff })
  material.fog = val
  boxOpts.material = () => material
})
gui.addColor({ color: 0x888888 }, 'color').onChange((color) => {
  fogOpts.color = (scene: Scene) => {
    scene.background = new Color(color)
    return new Color(color)
  }
})
gui.add(fogOpts, 'near', 0, 100, 0.1)
gui.add(fogOpts, 'far', 0, 100, 0.1)

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
