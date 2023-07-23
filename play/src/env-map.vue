<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh
        :options="{
          position: {
            x: -2.5,
          },
        }"
      >
        <FtSphereGeometry
          :radius="2"
          :widthSegments="64"
          :heightSegments="64"
        ></FtSphereGeometry>
        <FtMeshStandardMaterial>
          <FtTextureLoader
            url="/textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_basecolor.jpg"
            :type="'map'"
          ></FtTextureLoader>
        </FtMeshStandardMaterial>
      </FtMesh>
      <FtMesh
        :options="{
          position: {
            x: 2.5,
          },
        }"
      >
        <FtSphereGeometry
          :radius="2"
          :widthSegments="64"
          :heightSegments="64"
        ></FtSphereGeometry>
        <FtMeshStandardMaterial
          :options="{
            roughness: 0,
            metalness: 0.9,
            envMapIntensity: 1.0
          }"
          @load="lbasicMaterialLoad"
        >
          <FtTextureLoader
            url="/textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_basecolor.jpg"
            :type="'map'"
          ></FtTextureLoader>
          <FtTextureLoader
            url="/textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_roughness.jpg"
            :type="'roughnessMap'"
          ></FtTextureLoader>
          <FtTextureLoader
            url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_metallic.jpg"
            :type="'metalnessMap'"
          ></FtTextureLoader>
          <FtCubeTextureLoader
            :type="'envMap'"
            :urls="['/textures/fullscreen/1.left.jpg', '/textures/fullscreen/1.right.jpg', '/textures/fullscreen/1.top.jpg', '/textures/fullscreen/1.bottom.jpg', '/textures/fullscreen/1.front.jpg', '/textures/fullscreen/1.back.jpg']"
          ></FtCubeTextureLoader>
        </FtMeshStandardMaterial>
      </FtMesh>
      <FtOrthographicCamera
        :left="-size"
        :right="size"
        :top="size / 2"
        :bottom="-size / 2"
        :near="0.001"
        :far="100"
        :options="othCameraOptions"
      />
      <FtDirectionalLight
        :color="0xffffff"
        :intensity="0.7"
        :options="{ position: { set: [1, 2, 4] } }"
      />
      <FtAmbientLight :color="0xffffff" :intensity="0.5" />

      <FtWebglRenderer :params="{ antialias: true }" :animationFn="animationFn">
        <FtOrbitControls v-if="showControl" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  MeshStandardMaterialLoadEvent,
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
    set: [0, 1, 6],
  },
})

const animationFn: WebGLRendererProps['animationFn'] = ({}) => {
  if (cameraHelper.value) {
    cameraHelper.value.update()
  }
}

const { gui } = useGui()

function lbasicMaterialLoad({ material }: MeshStandardMaterialLoadEvent) {
  gui.add(material, 'metalness', 0, 1, 0.1).onChange((val) => {
    material.metalness = val
  })
  gui.add(material, 'roughness', 0, 1, 0.1).onChange((val) => {
    material.roughness = val
  })
  gui.add(material, 'envMapIntensity', 0, 1, 0.1).onChange((val) => {
    material.envMapIntensity = val
  })
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
