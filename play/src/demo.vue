<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh @load="loadMesh">
        <FtBoxGeometry @load="ftBoxGeometryLoad">
          <FtMeshBasicMaterial
            :initCount="6"
            :params="meshBasicParamsFn"
            @load="ftMeshBasicMaterialLoad"
          />
        </FtBoxGeometry>
      </FtMesh>
      <FtAxesHelper :size="4" />
      <FtGridHelper
        :size="100"
        :divisions="10"
        :color1="0xcd37aa"
        :color2="0x4a4a4a"
      />
      <FtPerspectiveCamera @load="cameraLoad">
        <FtWebglRenderer :animationFn="animationFn" />
      </FtPerspectiveCamera>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  BoxGeometryEmits,
  MeshEmits,
  PerspectiveCameraEmits,
} from '@farst-three/components'
import FtMeshBasicMaterial, {
  MeshBasicMateriaLoadEvent,
} from '@farst-three/components/mesh-basic-material'
import { BoxGeometry, Color, Mesh } from 'three'
import { shallowRef } from 'vue'

const meshRef = shallowRef<Mesh>()
const geometryRef = shallowRef<BoxGeometry>()
const meshBasicParamsFn = () => {
  return {
    color: new Color(Math.random() * 0x00ffff),
  }
}

const cameraLoad: PerspectiveCameraEmits['load'] = (camera) => {
  camera.position.z = 5
  return camera
}

const loadMesh: MeshEmits['load'] = (mesh) => {
  meshRef.value = mesh
  return mesh
}

function animationFn() {
  // if (meshRef.value) {
  //   meshRef.value.rotation.x += 0.01
  //   meshRef.value.rotation.y += 0.02
  // }
}

const ftBoxGeometryLoad: BoxGeometryEmits['load'] = (geometry) => {
  geometryRef.value = geometry
  return geometry
}

const ftMeshBasicMaterialLoad = (e: MeshBasicMateriaLoadEvent) => {
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
