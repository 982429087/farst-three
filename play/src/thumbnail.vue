<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh>
        <FtBoxGeometry>
          <FtMeshBasicMaterial :params="meshBasicParams" />
        </FtBoxGeometry>
      </FtMesh>
      <FtOrthographicCamera
        :left="-aspect * frustumSize"
        :right="aspect * frustumSize"
        :top="frustumSize"
        :bottom="-frustumSize"
        :near="0.001"
        :far="1000"
        @load="cameraLoad"
      >
        <FtWebglRenderer :animationFn="animationFn" :scissor="true">
          <FtOrbitControls />
          <FtThumbnail @load="thumbnailCameraLoad" :isRenderCamera="false" />
        </FtWebglRenderer>
      </FtOrthographicCamera>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  OrthographicCameraLoadEvent,
  WebGLRendererLoadEvent,
} from '@farst-three/components'
import FtMeshBasicMaterial from '@farst-three/components/mesh-basic-material'
import { Color } from 'three'

const frustumSize = 4
const aspect = window.innerWidth / window.innerHeight

const meshBasicParams = {
  color: new Color(Math.random() * 0x00ffff),
}
const cameraLoad = ({ camera, scene }: OrthographicCameraLoadEvent) => {
  camera.position.set(1, 0.5, 2)
  camera.lookAt(scene.position)
}

function thumbnailCameraLoad ({ camera, scene}: OrthographicCameraLoadEvent) {
  camera.position.set(1, 0.5, 2)
  camera.lookAt(scene.position)
}

function animationFn(e: WebGLRendererLoadEvent) {
  //
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
