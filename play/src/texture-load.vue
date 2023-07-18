<template>
  <div class="farst-three">
    <FtScene>
      <FtGroup @load="groupLoad">
        <FtMesh>
          <FtBoxGeometry></FtBoxGeometry>
          <FtMeshBasicMaterial v-for="item in 5" :key="item">
            <FtTextureLoader url="/Material_1741/basecolor.jpg" :type="'map'"></FtTextureLoader>
          </FtMeshBasicMaterial>
          <FtMeshBasicMaterial></FtMeshBasicMaterial>
        </FtMesh>
        <FtAmbientLight :color="0x0000dd" :intensity="0.4" />
        <FtPointLight :color="0xbbccee" :intensity="1" @load="pointlightLoad" />
      </FtGroup>
      <FtOrthographicCamera
        :left="-size"
        :right="size"
        :top="size / 2"
        :bottom="-size / 2"
        :near="0.001"
        :far="100"
        @load="cameraLoad"
        :options="othCameraOptions"
      />

      <FtWebglRenderer :params="{ antialias: true }" :animationFn="animationFn">
        <FtOrbitControls v-if="showControl" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  GroupLoadEvent,
  OrthographicCameraLoadEvent,
  PointLightLoadEvent,
  WebGLRendererProps,
} from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import { CameraHelper } from 'three'
import { ref, shallowRef } from 'vue'

const cameraHelper = shallowRef<CameraHelper>()
const size = 4
const showControl = ref(true)

const othCameraOptions = ref({
  position: {
    set: [0, 1, 4],
  },
})

const { gui } = useGui()

const animationFn: WebGLRendererProps['animationFn'] = ({}) => {
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
