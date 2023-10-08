<template>
  <div ref="domRef" class="farst-three">
    <FtScene :options="sceneOptions">
      <FtMesh :options="{ position: { z: 0.5 } }">
        <FtSphereGeometry
          :radius="0.5"
          :width-segments="64"
          :height-segments="64"
        />
        <FtMeshDepthMaterial />
      </FtMesh>
      <FtMesh :options="{ position: { z: 1.5 } }">
        <FtSphereGeometry
          :radius="0.5"
          :width-segments="64"
          :height-segments="64"
        />
        <FtMeshDepthMaterial />
      </FtMesh>
      <FtMesh :options="{ position: { z: 2.5 } }">
        <FtSphereGeometry
          :radius="0.5"
          :width-segments="64"
          :height-segments="64"
        />
        <FtMeshDepthMaterial />
      </FtMesh>
      <FtMesh :options="{ position: { z: 3.5 } }">
        <FtSphereGeometry
          :radius="0.5"
          :width-segments="64"
          :height-segments="64"
        />
        <FtMeshDepthMaterial />
      </FtMesh>
      <FtDirectionalLight
        :color="0xffffff"
        :intensity="1"
        :options="{ position: { set: [1, 1, 1] } }"
      />
      <FtAmbientLight :color="0xffffff" :intensity="0.5" />
      <FtPerspectiveCamera
        :fov="75"
        :near="1"
        :far="1000"
        :options="caneraOps"
      />
      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
      >
        <FtGridHelper />
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  FtAmbientLight,
  FtDirectionalLight,
  FtGridHelper,
  FtMesh,
  FtMeshDepthMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtSphereGeometry,
  FtWebglRenderer,
} from '@farst-three/components'
import type { Scene, Vector3 } from 'three'
import type {
  PerspectiveCameraOptions,
  SceneOptions,
} from '@farst-three/components'

const domRef = ref<HTMLDivElement>()
const sceneOptions: SceneOptions = reactive({})
const caneraOps = reactive<PerspectiveCameraOptions>({
  position: {
    set: [0, 2, 5],
    z: 5,
  },
  lookAt: (scene: Scene) => {
    return [scene.position]
  },
})

const animationFn = () => {
  //
}
const pos = caneraOps.position as Vector3
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
