<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh :options="planeOps">
        <FtPlaneGeometry :width="1" :height="1"></FtPlaneGeometry>
        <FtMeshLambertMaterial :options="params"></FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh :options="sphereOps">
        <FtSphereGeometry
          :radius="0.5"
          :widthSegments="16"
          :heightSegments="16"
        ></FtSphereGeometry>
        <FtMeshLambertMaterial :options="params"></FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh :options="boxOps">
        <FtBoxGeometry :width="1" :height="1" :depth="1"></FtBoxGeometry>
        <FtMeshLambertMaterial :options="params"></FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh :options="torusOps">
        <FtTorusGeometry
          :radius="0.4"
          :tube="0.2"
          :radial-segments="16"
          :tubular-segments="32"
        ></FtTorusGeometry>
        <FtMeshLambertMaterial :options="params"></FtMeshLambertMaterial>
      </FtMesh>
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0.1, 1, 3],
          },
        }"
      />
      <FtDirectionalLight
        :color="0xffffff"
        :intensity="0.7"
        :options="directionOpts"
      />
      <FtAmbientLight :color="0xffffff" :intensity="0.5" />
      <FtWebglRenderer :params="{ antialias: true }" :animationFn="animationFn">
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
DirectionalLightOptions,
  MeshBasicMaterialOptions,
  MeshOptions,
  WebGLRendererLoadEvent,
} from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import { Color, DoubleSide } from 'three'
import { reactive, ref } from 'vue'


const params = ref<MeshBasicMaterialOptions>({
  color: new Color(0x1890ff),
  side: DoubleSide,
  transparent: true,
  opacity: 0.7,
  wireframe: false,
})
const planeOps = reactive<MeshOptions>({
  position: {
    z: -1,
  },
})
const sphereOps = ref<MeshOptions>({
  position: {
    x: -1.5,
  },
})
const boxOps = ref<MeshOptions>({
  position: {
    z: 1,
  },
})
const torusOps = ref<MeshOptions>({
  position: {
    x: 1.5,
  },
})

const directionOpts = reactive<DirectionalLightOptions>({
  position: {
    set: [2, 2, 2],
    x: 2,
    y: 2,
    z: 2,
  },
  intensity: 0.7,
})

const animationFn = ({}: WebGLRendererLoadEvent) => {
  //
}

const { gui } = useGui()
gui.addColor({ color: 0x1890ff }, 'color').onChange((v) => {
  directionOpts.color = new Color(v)
})
gui.add(directionOpts.position!, 'x', -10, 10, 0.1)
gui.add(directionOpts.position!, 'y', -10, 10, 0.1)
gui.add(directionOpts.position!, 'z', -10, 10, 0.1)

gui.add(directionOpts, 'intensity', 0, 1, 0.1)
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
