<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtMesh @load="loadMesh">
        <FtBoxGeometry @load="ftBoxGeometryLoad">
          <FtMeshBasicMaterial :params="meshBasicParamsFn" />
        </FtBoxGeometry>
      </FtMesh>

      <FtPerspectiveCamera
        :fov="75"
        :near="0.1"
        :far="100"
        :is-render-camera="currentCamera === 'PerspectiveCamera'"
        @load="perspectiveCameraLoad"
      />
      <FtOrthographicCamera
        :left="-size"
        :right="size"
        :top="size / 2"
        :bottom="-size / 2"
        :near="0.001"
        :far="100"
        :is-render-camera="currentCamera === 'OrthographicCamera'"
        @load="cameraLoad"
      />
      <FtWebglRenderer
        :params="{
          antialias: true,
        }"
        :animation-fn="animationFn"
      >
        <FtOrbitControls />
        <FtCameraHelper @load="cameraHelperLoad" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { Color } from 'three'
import { useGui } from '@farst-three/hooks'
import {
  FtBoxGeometry,
  FtCameraHelper,
  FtMesh,
  FtMeshBasicMaterial,
  FtOrbitControls,
  FtOrthographicCamera,
  FtPerspectiveCamera,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type { BoxGeometry, CameraHelper, Mesh } from 'three'
import type {
  BoxGeometryLoadEvent,
  CameraHelperLoadEvent,
  MeshEmits,
  OrthographicCameraLoadEvent,
  PerspectiveCameraLoadEvent,
  WebGLRendererProps,
} from '@farst-three/components'

const domRef = ref<HTMLDivElement>()
const meshRef = shallowRef<Mesh>()
const geometryRef = shallowRef<BoxGeometry>()
const cameraHelper = shallowRef<CameraHelper>()
const size = 4
const currentCamera = ref('OrthographicCamera')

const { gui } = useGui(domRef)

const meshBasicParamsFn = {
  color: new Color(Math.random() * 0x00ffff),
}

const cameraLoad = ({ camera, scene }: OrthographicCameraLoadEvent) => {
  camera.position.set(1, 0.5, 2)
  camera.lookAt(scene.position)
  gui.add(camera.position, 'x', -10, 10, 0.1)
  gui.add(camera, 'zoom', 0.1, 4, 0.1).onChange(() => {
    camera.updateProjectionMatrix()
    cameraHelper.value?.update()
  })
  gui.add(camera, 'near', 0.001, 4, 0.01).onChange(() => {
    camera.updateProjectionMatrix()
    cameraHelper.value?.update()
  })
  gui.add(camera, 'far', 0.1, 40, 0.1).onChange((val) => {
    camera.far = val
    camera.updateProjectionMatrix()
    cameraHelper.value?.update()
  })
  const parsms = {
    switchCamera() {
      if (currentCamera.value === 'PerspectiveCamera') {
        currentCamera.value = 'OrthographicCamera'
      } else {
        currentCamera.value = 'PerspectiveCamera'
      }
    },
  }
  gui.add(parsms, 'switchCamera').name('切换相机')
}

const loadMesh: MeshEmits['load'] = (e) => {
  meshRef.value = e.mesh
  return e
}

const animationFn: WebGLRendererProps['animationFn'] = () => {
  if (cameraHelper.value) {
    cameraHelper.value.update()
  }
}

const ftBoxGeometryLoad = ({ geometry }: BoxGeometryLoadEvent) => {
  geometryRef.value = geometry
}

const cameraHelperLoad = ({ camera, helper, scene }: CameraHelperLoadEvent) => {
  cameraHelper.value = helper
}

const perspectiveCameraLoad = ({
  camera,
  scene,
}: PerspectiveCameraLoadEvent) => {
  camera.position.set(1, 0.5, 10)
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
