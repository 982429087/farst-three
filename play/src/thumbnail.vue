<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh>
        <FtBoxGeometry>
          <FtMeshBasicMaterial :params="meshBasicParams" />
        </FtBoxGeometry>
      </FtMesh>
      <FtPerspectiveCamera :fov="100" :near="0.01" :far="1000" @load="cameraLoad">
        <FtWebglRenderer :animationFn="animationFn">
          <FtOrbitControls />
        </FtWebglRenderer>
      </FtPerspectiveCamera>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  PerspectiveCameraLoadEvent,
  WebGLRendererLoadEvent,
} from '@farst-three/components'
import FtMeshBasicMaterial from '@farst-three/components/mesh-basic-material'
import { Color } from 'three'

const meshBasicParams = {
  color: new Color(Math.random() * 0x00ffff),
}
const cameraLoad = ({ camera }: PerspectiveCameraLoadEvent) => {
  camera.position.z = 5
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
