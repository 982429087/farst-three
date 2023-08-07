<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh
        :options="{
          position: {
            x: -1.5,
          },
        }"
      >
        <FtCylinderGeometry :radius-top="1" :radius-bottom="1" :height="1" />
        <FtMeshLambertMaterial
          :params="{
            color: 0x1890ff,
          }"
        >
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003\Wood_Ceiling_Coffers_003_basecolor.jpg"
            :type="'map'"
          />
        </FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh
        :options="{
          position: {
            x: 1,
          },
        }"
      >
        <FtBoxGeometry :width="1" :height="1" :depth="1" />
        <FtMeshLambertMaterial v-for="(_, index) in 6" :key="index">
          <FtTextureLoader
            :url="`/textures/fullscreen/0${index + 1}.jpg`"
            :type="'map'"
          />
        </FtMeshLambertMaterial>
      </FtMesh>
      <FtOrthographicCamera
        :left="-size"
        :right="size"
        :top="size / 2"
        :bottom="-size / 2"
        :near="0.001"
        :far="100"
        :options="othCameraOptions"
        @load="cameraLoad"
      />
      <FtDirectionalLight :color="0xffffff" :intensity="0.5" />
      <FtAmbientLight :color="0xffffff" />

      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
      >
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtCylinderGeometry,
  FtDirectionalLight,
  FtMesh,
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtOrthographicCamera,
  FtScene,
  FtTextureLoader,
  FtWebglRenderer,
} from '@farst-three/components'
import type { CameraHelper } from 'three'
import type {
  OrthographicCameraLoadEvent,
  WebGLRendererProps,
} from '@farst-three/components'

const cameraHelper = shallowRef<CameraHelper>()
const size = 4

const othCameraOptions = ref({
  position: {
    set: [0, 1, 4],
  },
})

const animationFn: WebGLRendererProps['animationFn'] = () => {
  if (cameraHelper.value) {
    cameraHelper.value.update()
  }
}

const cameraLoad = ({ camera, scene }: OrthographicCameraLoadEvent) => {
  // camera.position.set(1, 0.5, 2)
  camera.lookAt(scene.position)
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
