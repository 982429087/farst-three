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
      <FtOrthographicCamera
        :left="-size"
        :right="size"
        :top="size / 2"
        :bottom="-size / 2"
        :near="0.001"
        :far="100"
        @load="cameraLoad"
      >
        <FtWebglRenderer
          :params="{
            antialias: true,
          }"
          :animationFn="animationFn"
        >
          <FtOrbitControls />
        </FtWebglRenderer>
      </FtOrthographicCamera>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  BoxGeometryEmits,
  MeshEmits,
  OrthographicCameraLoadEvent,
  WebGLRendererProps,
} from '@farst-three/components'
import FtMeshBasicMaterial, {
  MeshBasicMateriaLoadEvent,
} from '@farst-three/components/mesh-basic-material'
import { BoxGeometry, Color, Mesh } from 'three'
import { shallowRef } from 'vue'

const meshRef = shallowRef<Mesh>()
const geometryRef = shallowRef<BoxGeometry>()
const size = 4

const meshBasicParamsFn = () => {
  return {
    color: new Color(Math.random() * 0x00ffff),
  }
}

const cameraLoad = ({ camera, scene }: OrthographicCameraLoadEvent) => {
  camera.position.set(1, 0.5, 2)
  camera.lookAt(scene.position)
}

const loadMesh: MeshEmits['load'] = (mesh) => {
  meshRef.value = mesh
  return mesh
}

const animationFn: WebGLRendererProps['animationFn'] = ({}) => {
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
