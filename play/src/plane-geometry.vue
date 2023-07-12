<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh @load="meshLoad">
        <FtPlaneGeometry :width="2" :height="2" />
        <FtMeshLambertMaterial :params="{ color: 0xffffff, side: DoubleSide }" />
      </FtMesh>

      <FtPerspectiveCamera :fov="75" :near="0.1" :far="100" :isRenderCamera="currentCamera === 'PerspectiveCamera'"
        @load="perspectiveCameraLoad" />
      <FtOrthographicCamera :left="-size" :right="size" :top="size / 2" :bottom="-size / 2" :near="0.001" :far="100"
        :isRenderCamera="currentCamera === 'OrthographicCamera'" @load="cameraLoad" />

      <FtAmbientLight :color="0xffffff" :intensity=".4" />
      <FtPointLight :color="0xff0000" :intensity="1" @load="pointlightLoad" />
      <FtWebglRenderer :params="{ antialias: true }" :animationFn="animationFn">
        <FtOrbitControls v-if="showControl" />
        <FtCameraHelper @load="cameraHelperLoad" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  CameraHelperLoadEvent,
  FtMeshLambertMaterial,
  MeshLoadEvent,
  OrthographicCameraLoadEvent,
  PerspectiveCameraLoadEvent,
  PointLightLoadEvent,
  WebGLRendererProps,
} from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import { CameraHelper, DoubleSide } from 'three'
import { ref, shallowRef } from 'vue'

const cameraHelper = shallowRef<CameraHelper>()
const size = 4
const currentCamera = ref('OrthographicCamera')
const showControl = ref(true)

const { gui } = useGui()

const cameraLoad = ({ camera, scene }: OrthographicCameraLoadEvent) => {
  camera.position.set(1, 0.5, 2)
  camera.lookAt(scene.position)
  const parsms = {
    switchCamera() {
      if (currentCamera.value === 'PerspectiveCamera') {
        currentCamera.value = 'OrthographicCamera'
      } else {
        currentCamera.value = 'PerspectiveCamera'
      }
    }
  }
  gui.add(parsms, 'switchCamera')
}


const animationFn: WebGLRendererProps['animationFn'] = ({ }) => {
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

function pointlightLoad ({light}: PointLightLoadEvent) {
  light.position.set(200, 200, 300)
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
