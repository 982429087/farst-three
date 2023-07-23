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
        <FtMeshLambertMaterial>
          <FtTextureLoader
            url="\textures\Glass_Vintage_001\Glass_Vintage_001_basecolor.jpg"
            :type="'map'"
          ></FtTextureLoader>
        </FtMeshLambertMaterial>
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
        <FtMeshLambertMaterial
          :options="{
            displacementBias: 0.1,
            displacementScale: 0.1,
          }"
          @load="lbasicMaterialLoad"
        >
          <FtTextureLoader
            url="\textures\Glass_Vintage_001\Glass_Vintage_001_basecolor.jpg"
            :type="'map'"
          ></FtTextureLoader>
          <FtTextureLoader
            url="\textures\Glass_Vintage_001\Glass_Vintage_001_normal.jpg"
            :type="'normalMap'"
          ></FtTextureLoader>
        </FtMeshLambertMaterial>
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
      <FtDirectionalLight :color="0xffffff" :intensity="0.7" :options="{ position: { set: [1,2,4]}}" />
      <FtAmbientLight :color="0xffffff" :intensity="0.5" />

      <FtWebglRenderer :params="{ antialias: true }" :animationFn="animationFn">
        <FtOrbitControls v-if="showControl" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  MeshLambertMaterialLoadEvent,
  WebGLRendererProps,
} from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import { CameraHelper, Vector2 } from 'three'
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

function lbasicMaterialLoad({ material }: MeshLambertMaterialLoadEvent) {
  const params = {
    normalScaleX: 1,
    normalScaleY: 1,
  }
  gui.add(params, 'normalScaleX', 0, 1, 0.1).onChange(() => {
    material.normalScale = new Vector2(params.normalScaleX, params.normalScaleY)
  })
  gui.add(params, 'normalScaleY', 0, 1, 0.1).onChange(() => {
    material.normalScale = new Vector2(params.normalScaleX, params.normalScaleY)
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
