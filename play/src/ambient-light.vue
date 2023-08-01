<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh :options="boxOpts">
        <FtBoxGeometry :width="1" :height="1" :depth="1"></FtBoxGeometry>
        <FtMeshLambertMaterial
          :params="{ color: 0x1890ff }"
        ></FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh :options="wallOps">
        <FtPlaneGeometry :width="10" :height="10"></FtPlaneGeometry>
        <FtMeshLambertMaterial
          :params="{ side: DoubleSide }"
        ></FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh :options="floorOps">
        <FtPlaneGeometry :width="10" :height="10"></FtPlaneGeometry>
        <FtMeshLambertMaterial
          :params="{ side: DoubleSide }"
        ></FtMeshLambertMaterial>
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
        :options="lightOptions"
      />
      <FtAmbientLight :color="0xffffff" :intensity="0.5" />

      <FtGridHelper></FtGridHelper>
      <FtWebglRenderer :params="{ antialias: true }" :animationFn="animationFn">
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  DirectionalLightOptions,
  MeshOptions,
  WebGLRendererLoadEvent,
} from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import { Color, DoubleSide } from 'three'
import { reactive } from 'vue'

const boxOpts = reactive<MeshOptions>({
  position: {
    z: -1,
  },
})
const wallOps = reactive<MeshOptions>({
  position: {
    y: 4,
    z: -5,
  },
})
const floorOps = reactive<MeshOptions>({
  rotation: {
    x: -Math.PI / 2,
  },
  position: {
    y: -1,
  },
})

const lightOptions = reactive<DirectionalLightOptions>({
  position: { set: [1, 2, 4] },
  intensity: 1,
  visible: true,
  color: new Color(0x1890ff),
})

const animationFn = ({}: WebGLRendererLoadEvent) => {}

const { gui } = useGui()
gui.add(lightOptions, 'intensity', 0, 1, 0.01)
gui.add(lightOptions, 'visible')
gui.addColor({color: 0x1890ff}, 'color')
.onChange(val => {
  lightOptions.color = () => new Color(val)
})
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
