<template>
  <div class="farst-three">
    <FtScene :options="sceneOptions">
      <FtMesh :options="{ position: { z: 0 } }">
        <FtSphereGeometry :radius="0.5" :widthSegments="64" :heightSegments="64"></FtSphereGeometry>
        <FtMeshBasicMaterial></FtMeshBasicMaterial>
      </FtMesh>
      <FtMesh :options="{ position: { z: 1 } }">
        <FtSphereGeometry :radius="0.5" :widthSegments="64" :heightSegments="64"></FtSphereGeometry>
        <FtMeshBasicMaterial></FtMeshBasicMaterial>
      </FtMesh>
      <FtMesh :options="{ position: { z: 2 } }">
        <FtSphereGeometry :radius="0.5" :widthSegments="64" :heightSegments="64"></FtSphereGeometry>
        <FtMeshBasicMaterial></FtMeshBasicMaterial>
      </FtMesh>
      <FtMesh :options="{ position: { z: 3 } }">
        <FtSphereGeometry :radius="0.5" :widthSegments="64" :heightSegments="64"></FtSphereGeometry>
        <FtMeshBasicMaterial></FtMeshBasicMaterial>
      </FtMesh>
      <FtDirectionalLight :color="0xffffff" :intensity="0.7" :options="{ position: { set: [1, 2, 4] } }" />
      <FtAmbientLight :color="0xffffff" :intensity="0.5" />
      <FtPerspectiveCamera :fov="75" :near="0.01" :far="100" :options="caneraOps" />
      <FtWebglRenderer :params="{ antialias: true }" :animationFn="animationFn">
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  PerspectiveCameraOptions,
  SceneOptions,
  WebGLRendererLoadEvent,
} from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import { MeshDepthMaterial, Vector3 } from 'three'
import { reactive } from 'vue'

const sceneOptions: SceneOptions = reactive({
  overrideMaterial: () => new MeshDepthMaterial({
      transparent: true,
      opacity: 0.5
    }),
})
const caneraOps = reactive<PerspectiveCameraOptions>({
  position: {
    set: [0.1, 1, 3.5],
    z: 3.5,
  }
})
const { gui } = useGui()

const animationFn = ({ }: WebGLRendererLoadEvent) => {
  //
}
let pos = caneraOps.position as Vector3
gui.add(pos, 'z', 0, 10, 0.1)

</script>

<style lang="scss" scoped>
.farst-three {
  height: 100vh;
  width: 100vw;
}
</style>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
