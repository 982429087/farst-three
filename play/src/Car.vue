<template>
  <div class="farst-three">
    <FtScene>
      <FtGroup
        :options="{
          position: {
            y: 0.2,
          },
        }"
      >
        <FtMesh>
          <FtBoxGeometry :width="2" :height="0.2" :depth="1"></FtBoxGeometry>
          <FtMeshLambertMaterial
            :params="{ color: 0x1890ff }"
          />
        </FtMesh>
        <FtMesh v-for="(item, index) in wheels" :key="index" :options="item">
          <FtCylinderGeometry
            :radiusTop="0.2"
            :radiusBottom="0.2"
            :height="0.3"
            :radialSegments="10"
          ></FtCylinderGeometry>
          <FtMeshBasicMaterial :params="{ color: 0xff00ff }" />
        </FtMesh>
        <FtMesh
          :options="{
            position: {
              set: [-1.05, 0, 0.2],
            },
          }"
        >
          <FtBoxGeometry
            :width="0.1"
            :height="0.1"
            :depth="0.1"
          ></FtBoxGeometry>
          <FtMeshBasicMaterial :params="{ color: 0xffff00 }" />
        </FtMesh>
        <FtMesh
          :options="{
            position: {
              set: [-1.05,0,-0.2],
            },
          }"
        >
          <FtBoxGeometry
            :width="0.1"
            :height="0.1"
            :depth="0.1"
          ></FtBoxGeometry>
          <FtMeshBasicMaterial :params="{ color: 0xffff00 }" />
        </FtMesh>
      </FtGroup>
      <FtOrthographicCamera
        :left="-size"
        :right="size"
        :top="size / 2"
        :bottom="-size / 2"
        :near="0.1"
        :far="10"
        :options="othCameraOptions"
      />
      <FtDirectionalLight
        :color="0xffffff"
        :intensity="0.5"
      />
      <FtAmbientLight :color="0xffffff" />
      <FtAxesHelper />
      <FtGridHelper
        :size="10"
        :divisions="10"
        :color1="0xcd37aa"
        :color2="0x4a4a4a"
      ></FtGridHelper>
      <FtWebglRenderer :params="{ antialias: true }" :animationFn="animationFn">
        <FtOrbitControls v-if="showControl" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  MeshOptions,
  OrthographicCameraOptions,
  WebGLRendererLoadEvent,
} from '@farst-three/components'
import { Scene } from 'three'
import { ref, shallowRef } from 'vue'

const size = 4
const showControl = ref(true)

const othCameraOptions = shallowRef<OrthographicCameraOptions>({
  position: {
    set: [2, 2, 3],
  },
  lookAt: (scene: Scene) => [scene.position],
})

const wheels = ref<MeshOptions[]>([
  {
    name: 'wheel',
    rotation: {
      x: -Math.PI / 2,
    },
    position: {
      set: [-0.5, 0, 0.4],
    },
  },
  {
    name: 'wheel',
    rotation: {
      x: -Math.PI / 2,
    },
    position: {
      set: [-0.5, 0, -0.4],
    },
  },
  {
    name: 'wheel',
    rotation: {
      x: -Math.PI / 2,
    },
    position: {
      set: [0.5, 0, -0.4],
    },
  },
  {
    name: 'wheel',
    rotation: {
      x: -Math.PI / 2,
    },
    position: {
      set: [0.5, 0, 0.4],
    },
  },
])

const animationFn = (e: WebGLRendererLoadEvent) => {

}

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
