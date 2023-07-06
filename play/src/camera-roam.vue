<template>
  <div class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="100"
        :near="0.01"
        :far="1000"
        @load="cameraLoad"
      >
      </FtPerspectiveCamera>
      <FtMesh>
        <FtBoxGeometry>
          <FtMeshBasicMaterial :initCount="6" :params="meshBasicParams" />
        </FtBoxGeometry>
      </FtMesh>
      <FtMesh>
        <FtTubeGeometry
          :path="curve"
          :tubularSegments="200"
          :radius="0.01"
          :radialSegments="8"
          :closed="true"
        >
          <FtMeshBasicMaterial :params="meshBasicParams"></FtMeshBasicMaterial>
        </FtTubeGeometry>
      </FtMesh>
      <FtMesh @load="meshLoad">
        <FtSphereGeometry
          :radius="0.5"
          :widthSegments="32"
          :heightSegments="64"
        >
          <FtMeshBasicMaterial :params="meshBasicParams"></FtMeshBasicMaterial>
        </FtSphereGeometry>
      </FtMesh>
      <FtAxesHelper :size="4" />
      <FtGridHelper
        :size="100"
        :divisions="10"
        :color1="0xcd37aa"
        :color2="0x4a4a4a"
      />

      <FtWebglRenderer :animationFn="animationFn">
        <FtOrbitControls />

      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
MeshLoadEvent,
  PerspectiveCameraLoadEvent,
  WebGLRendererLoadEvent,
} from '@farst-three/components'
import FtMeshBasicMaterial from '@farst-three/components/mesh-basic-material'
import { Color, Mesh, PerspectiveCamera } from 'three'
import { HeartCurve } from 'three/examples/jsm/curves/CurveExtras'

const curve = new HeartCurve(0.5)
const meshBasicParams = {
  color: new Color(Math.random() * 0x00ffff),
}
let perCamera: PerspectiveCamera
let cmesh: Mesh
const cameraLoad = ({ camera }: PerspectiveCameraLoadEvent) => {
  camera.position.z = 5
  perCamera = camera
}

const meshLoad = ({mesh}: MeshLoadEvent) => {
  // 都是同步代码，上面的加载比下面快
  mesh.position.copy(perCamera.position)
  cmesh = mesh
}

const points = curve.getPoints(3000)
let count = 0

function animationFn(e: WebGLRendererLoadEvent) {
  const camera = e.camera as PerspectiveCamera
  const index = count % 3000
  let point = points[index]
  const nextPoint = points[index + 1 > 3000 ? 0 : index + 1]
  cmesh.position.set(point.x, point.y, point.z)

  cmesh.lookAt(nextPoint.x, 0, -nextPoint.y)
  // camera.position.set(point.x, point.y, point.z)
  // camera.lookAt(nextPoint.x, 0, -nextPoint.y)
  camera.updateProjectionMatrix()
  count++
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
