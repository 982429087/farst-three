<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtGroup @load="groupLoad">
        <FtMesh @load="meshLoad">
          <FtBoxGeometry />
          <FtMeshBasicMaterial :params="{ color: '#abcdef' }" />
        </FtMesh>
      </FtGroup>
      <FtOrthographicCamera
        :left="-size"
        :right="size"
        :top="size / 2"
        :bottom="-size / 2"
        :near="0.001"
        :far="100"
        :options="othCameraOptions"
        @load="cameraLoad"
      />
      <FtAmbientLight :color="'#0000dd'" :intensity="0.4" />
      <FtPointLight :color="'#bbccee'" :intensity="1" @load="pointlightLoad" />
      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
      >
        <FtOrbitControls v-if="showControl" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import gsap from 'gsap'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtGroup,
  FtMesh,
  FtMeshBasicMaterial,
  FtOrbitControls,
  FtOrthographicCamera,
  FtPointLight,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type {
  GroupLoadEvent,
  MeshLoadEvent,
  OrthographicCameraLoadEvent,
  PointLightLoadEvent,
  WebGLRendererProps,
} from '@farst-three/components'
import type { CameraHelper } from 'three'

const cameraHelper = shallowRef<CameraHelper>()
const size = 4
const showControl = ref(true)
const domRef = ref<HTMLDivElement>()
const othCameraOptions = ref({
  position: {
    set: [0, 1, 4],
  },
})

const { gui } = useGui(domRef)

const animationFn: WebGLRendererProps['animationFn'] = () => {
  if (cameraHelper.value) {
    cameraHelper.value.update()
  }
}

function pointlightLoad({ light }: PointLightLoadEvent) {
  light.position.set(200, 200, 300)
}

const cameraLoad = ({ camera, scene }: OrthographicCameraLoadEvent) => {
  // camera.position.set(1, 0.5, 2)
  camera.lookAt(scene.position)
}

function groupLoad({ group, scene }: GroupLoadEvent) {
  gui.add(group.position, 'x', -10, 10)
  gui.add(group.rotation, 'x', -Math.PI, Math.PI)
}

function meshLoad({ mesh }: MeshLoadEvent) {
  const params = {
    rotate() {
      gsap.to(mesh.rotation, {
        duration: 1,
        y: mesh.rotation.y + Math.PI,
      })
    },
  }
  gui.add(params, 'rotate')
  gui.add(mesh.scale, 'x', 1, 3, 0.1).onChange((val) => {
    // 放大
    console.log(val)
  })
  gui.add(mesh.position, 'x', -3, 3, 0.1).name('positionX')
  gui.add(mesh.position, 'y', -3, 3, 0.1).name('positionY')
  gui.add(mesh.position, 'z', -3, 3, 0.1).name('positionZ')
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
