<template>
  <div class="farst-three">
    <FtScene>
      <FtPerspectiveCamera @load="cameraLoad">
        <FtMesh @load="loadMesh">
          <FtBoxGeometry />
          <FtMeshBasicMaterial />
        </FtMesh>
        <FtWebglRenderer :animationFn="animationFn" />
      </FtPerspectiveCamera>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { MeshEmits, PerspectiveCameraEmits } from '@farst-three/farst-three'
import { Mesh } from 'three'
import { shallowRef } from 'vue'

const meshRef = shallowRef<Mesh>()

const cameraLoad: PerspectiveCameraEmits['load'] = (camera) => {
  camera.position.z = 5
  return camera
}

const loadMesh: MeshEmits['load'] = (mesh) => {
  meshRef.value = mesh
  return mesh
}

function animationFn() {
  if (meshRef.value) {
    meshRef.value.rotation.x += 0.01
    meshRef.value.rotation.y += 0.02
  }
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
