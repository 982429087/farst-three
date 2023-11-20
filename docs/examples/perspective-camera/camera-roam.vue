<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="100"
        :near="0.01"
        :far="1000"
        @load="cameraLoad"
      />

      <FtWebglRenderer :animation-fn="animationFn">
        <FtMesh>
          <FtBoxGeometry>
            <FtMeshBasicMaterial :params="meshBasicParams" />
          </FtBoxGeometry>
        </FtMesh>
        <FtMesh>
          <FtTubeGeometry
            :path="curve"
            :tubular-segments="200"
            :radius="0.01"
            :radial-segments="8"
            :closed="true"
          >
            <FtMeshBasicMaterial :params="meshBasicParams" />
          </FtTubeGeometry>
        </FtMesh>
        <FtMesh @load="meshLoad">
          <FtSphereGeometry
            :radius="0.5"
            :width-segments="32"
            :height-segments="64"
          >
            <FtMeshBasicMaterial :params="meshBasicParams" />
          </FtSphereGeometry>
        </FtMesh>
        <FtAxesHelper :size="4" />
        <FtGridHelper
          :size="100"
          :divisions="10"
          :color1="0xcd37aa"
          :color2="0x4a4a4a"
        />
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Color } from 'three'
import { HeartCurve } from 'three/examples/jsm/curves/CurveExtras'
import {
  FtAxesHelper,
  FtBoxGeometry,
  FtGridHelper,
  FtMesh,
  FtMeshBasicMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtSphereGeometry,
  FtTubeGeometry,
  FtWebglRenderer,
} from '@farst-three/components'
import type {
  MeshLoadEvent,
  PerspectiveCameraLoadEvent,
  WebGLRendererLoadEvent,
} from '@farst-three/components'
import type { Mesh, PerspectiveCamera } from 'three'
const domRef = ref<HTMLDivElement>()

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

const meshLoad = ({ mesh }: MeshLoadEvent) => {
  // 都是同步代码，上面的加载比下面快
  mesh.position.copy(perCamera.position)
  cmesh = mesh
}

const points = curve.getPoints(3000)
let count = 0

function animationFn(e: WebGLRendererLoadEvent) {
  const camera = e.camera as PerspectiveCamera
  const index = count % 3000
  const point = points[index]
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
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
