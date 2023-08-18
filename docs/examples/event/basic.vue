<template>
  <div ref="domRef" class="farst-three">
    <FtScene
      :options="{
        background: 0xffff88,
      }"
    >
      <FtMesh :options="boxOpts" @click="meshClick">
        <FtBoxGeometry :width="1" :height="1" :depth="1" />
        <FtMeshLambertMaterial
          :options="boxMaterialOpts"
          :params="{ color: 0x1890ff }"
        />
      </FtMesh>
      <FtMesh :options="boxOpts2" @hover="meshHover2">
        <FtBoxGeometry :width="1" :height="1" :depth="1" />
        <FtMeshLambertMaterial
          :options="boxMaterialOpts2"
          :params="{ color: 0x1890ff }"
        />
      </FtMesh>
      <FtMesh v-for="item in 300" :key="item" :options="randomMeshOpts">
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
import { Color } from 'three'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtMesh,
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtTextureLoader,
  FtTorusGeometry,
  FtWebglRenderer,
} from '@farst-three/components'
import type { FunsEvent } from '@farst-three/hooks'
import type {
  AmbientLightOptions,
  MeshLambertMaterialOptions,
  MeshOptions,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()

const randomMeshOpts = reactive({
  position: {
    set: () => [
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 50,
    ],
  },
  rotation: {
    set: () => [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ],
  },
  scale: {
    set: () => [
      Math.random() * 0.3 + 0.5,
      Math.random() * 0.3 + 0.5,
      Math.random() * 0.3 + 0.5,
    ],
  },
})
const boxOpts = reactive<MeshOptions>({
  position: {
    set: [0, 1, 0],
  },
  castShadow: true,
  name: 'box-mesh',
})
const boxOpts2 = reactive<MeshOptions>({
  position: {
    set: [2, 1, 0],
  },
  castShadow: true,
  name: 'box-mesh2',
})

const lightOptions = reactive<AmbientLightOptions>({
  position: { set: [1, 2, 4] },
  intensity: 0.95,
  visible: true,
  color: () => new Color(0xffffff),
})

const boxMaterialOpts = reactive<MeshLambertMaterialOptions>({
  transparent: true,
  opacity: 1,
})
const boxMaterialOpts2 = reactive<MeshLambertMaterialOptions>({
  transparent: true,
  opacity: 1,
})

const animationFn = () => {
  //
}

const { gui } = useGui(domRef)

function meshHover2(e: FunsEvent) {
  console.log(e, 'box-mesh2')
  if (e.targets.length) {
    boxMaterialOpts2.opacity = 0.1
  } else {
    boxMaterialOpts2.opacity = 1
  }
}

function meshClick(e: FunsEvent) {
  console.log('box-mesh', e.targets[0].object)
  boxMaterialOpts.color = () => new Color('#ccc')
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
