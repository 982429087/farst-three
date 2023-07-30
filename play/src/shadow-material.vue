<template>
  <div class="farst-three">
    <FtScene
      :options="{
        background: () => new Color(0xf0f0f0),
      }"
    >
      <FtMesh :options="planeOps">
        <FtPlaneGeometry :width="3" :height="3"></FtPlaneGeometry>
        <FtShadowMaterial></FtShadowMaterial>
      </FtMesh>

      <FtMesh :options="boxOps">
        <FtBoxGeometry :width="1" :height="1" :depth="1"></FtBoxGeometry>
        <FtMeshBasicMaterial
          :options="{
            color: 0x00ff00,
          }"
        ></FtMeshBasicMaterial>
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
        :options="{
          position: {
            set: [2, 2, 2],
          },
          castShadow: true,
          shadow: {
            radius: 10,
            mapSize: { set: [1024, 1024] },
            camera: {
              near: 0.01,
              far: 100,
            },
          },
        }"
      />
      <FtAmbientLight :color="0xffffff" :intensity="0.5" />
      <FtWebglRenderer
        :options="{
          shadowMap: {
            enabled: true,
            type: PCFSoftShadowMap
          },
        }"
        :params="{ antialias: true }"
        :animationFn="animationFn"
      >
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { MeshOptions, WebGLRendererLoadEvent } from '@farst-three/components'
import { Color, PCFSoftShadowMap } from 'three'
import { reactive, ref } from 'vue'

const planeOps = reactive<MeshOptions>({
  position: {
    y: 1
  },
  castShadow: true,
  receiveShadow: true,
})

const boxOps = ref<MeshOptions>({
  position: {
    z: 1,
    y: 1
  },
  castShadow: true,
  receiveShadow: true,

})

const animationFn = ({}: WebGLRendererLoadEvent) => {}
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
