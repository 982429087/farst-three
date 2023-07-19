<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh @load="loadMesh">
        <FtBoxGeometry @load="ftBoxGeometryLoad">
          <FtMeshBasicMaterial
            :params="meshBasicParamsFn"
            @load="ftMeshBasicMaterialLoad"
          />
        </FtBoxGeometry>
      </FtMesh>

      <FtPerspectiveCamera
        :fov="75"
        :near="0.1"
        :far="100"
        :isRenderCamera="currentCamera === 'PerspectiveCamera'"
        @load="perspectiveCameraLoad"
      >
      </FtPerspectiveCamera>
      <FtOrthographicCamera
        :left="-size"
        :right="size"
        :top="size / 2"
        :bottom="-size / 2"
        :near="0.001"
        :far="100"
        :isRenderCamera="currentCamera === 'OrthographicCamera'"
        @load="cameraLoad"
      >
      </FtOrthographicCamera>
      <FtWebglRenderer
        :params="{
          antialias: true,
        }"
        :animationFn="animationFn"
      >
        <FtOrbitControls v-if="showControl" @load="ocLoad" />
        <FtCameraHelper @load="cameraHelperLoad" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  BoxGeometryLoadEvent,
  CameraHelperLoadEvent,
  MeshEmits,
  OrbitControlsLoadEvent,
  OrthographicCameraLoadEvent,
  PerspectiveCameraLoadEvent,
  WebGLRendererProps,
} from '@farst-three/components'
import FtMeshBasicMaterial, {
  MeshBasicMateriaLoadEvent,
} from '@farst-three/components/mesh-basic-material'
import { useGui } from '@farst-three/hooks'
import { BoxGeometry, CameraHelper, Color, Mesh } from 'three'
import { ref, shallowRef } from 'vue'

const meshRef = shallowRef<Mesh>()
const geometryRef = shallowRef<BoxGeometry>()
const cameraHelper = shallowRef<CameraHelper>()
const size = 4
const currentCamera = ref('OrthographicCamera')
const showControl = ref(true)

const { gui } = useGui()

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
    switchCamera () {
      if (currentCamera.value === 'PerspectiveCamera') {
        currentCamera.value = 'OrthographicCamera'
      } else {
        currentCamera.value = 'PerspectiveCamera'
      }
    }
  }
  gui.add(parsms, 'switchCamera')
}

const loadMesh: MeshEmits['load'] = (e) => {
  meshRef.value = e.mesh
  return e
}

const animationFn: WebGLRendererProps['animationFn'] = ({}) => {
  // if (meshRef.value) {
  //   meshRef.value.rotation.x += 0.01
  //   meshRef.value.rotation.y += 0.02
  // }
  if (cameraHelper.value) {
    cameraHelper.value.update()
  }
}

const ftBoxGeometryLoad = ({geometry}: BoxGeometryLoadEvent) => {
  geometryRef.value = geometry
}

const ftMeshBasicMaterialLoad = (e: MeshBasicMateriaLoadEvent) => {
  //
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

const ocLoad = (e: OrbitControlsLoadEvent) => {
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
