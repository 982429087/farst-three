<template>
  <div class="farst-three">
    <FtScene>
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
        :params="{ antialias: true }"
        :animation-fn="animationFn"
      >
        <FtMesh @load="meshLoad">
          <FtPlaneGeometry :width="2" :height="2" />
          <FtMeshLambertMaterial
            :params="{ color: 0xffffff, side: DoubleSide }"
          />
        </FtMesh>
        <FtAmbientLight :color="0xffffff" :intensity="0.4" />
        <FtPointLight :color="0xbbccee" :intensity="1" @load="pointlightLoad" />
        <FtOrbitControls v-if="showControl" />
        <FtCameraHelper @load="cameraHelperLoad" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { DoubleSide } from 'three'
import {
  FtAmbientLight,
  FtCameraHelper,
  FtMesh,
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtOrthographicCamera,
  FtPerspectiveCamera,
  FtPlaneGeometry,
  FtPointLight,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import type {
  CameraHelperLoadEvent,
  MeshLoadEvent,
  OrthographicCameraLoadEvent,
  PerspectiveCameraLoadEvent,
  PointLightLoadEvent,
  WebGLRendererProps,
} from '@farst-three/components'
import type { CameraHelper } from 'three'

const cameraHelper = shallowRef<CameraHelper>()
const currentCamera = ref('OrthographicCamera')
const showControl = ref(true)
const size = 4

const { guiPromise } = useGui()

const cameraLoad = ({ camera, scene }: OrthographicCameraLoadEvent) => {
  camera.position.set(1, 0.5, 2)
  camera.lookAt(scene.position)
  guiPromise.then((gui) => {
    const parsms = {
      switchCamera() {
        if (currentCamera.value === 'PerspectiveCamera') {
          currentCamera.value = 'OrthographicCamera'
        } else {
          currentCamera.value = 'PerspectiveCamera'
        }
      },
    }
    gui.add(parsms, 'switchCamera')
  })
}

const animationFn: WebGLRendererProps['animationFn'] = () => {
  if (cameraHelper.value) {
    cameraHelper.value.update()
  }
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

function meshLoad({ mesh }: MeshLoadEvent) {
  // mesh.rotation.x = -Math.PI / 2
  // mesh.position.y = 0.5
}

function pointlightLoad({ light }: PointLightLoadEvent) {
  light.position.set(200, 200, 300)
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
