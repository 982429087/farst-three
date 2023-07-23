<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh
        :options="{
          position: {
            x: -1,
          },
        }"
      >
        <FtBoxGeometry :width="1" :height="1" :depth="1"></FtBoxGeometry>
        <FtMeshLambertMaterial>
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003\Wood_Ceiling_Coffers_003_basecolor.jpg"
            :type="'map'"
          ></FtTextureLoader>
        </FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh
        :options="{
          position: {
            x: 1,
          },
        }"
      >
        <FtBoxGeometry :width="1" :height="1" :depth="1" :widthSegments="64" :heightSegments="64" :depthSegments="64"></FtBoxGeometry>
        <FtMeshLambertMaterial
          :options="{
            displacementBias: 0.1,
            displacementScale: 0.1,
          }"
          @load="lbasicMaterialLoad"
        >
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003\Wood_Ceiling_Coffers_003_basecolor.jpg"
            :type="'map'"
          ></FtTextureLoader>
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003\Wood_Ceiling_Coffers_003_ambientOcclusion.jpg"
            :type="'displacementMap'"
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
      <FtDirectionalLight :color="0xffffff" :intensity="0.5" />
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

const animationFn: WebGLRendererProps['animationFn'] = ({}) => {
  if (cameraHelper.value) {
    cameraHelper.value.update()
  }
}

const { gui } = useGui()

function lbasicMaterialLoad({ material }: MeshLambertMaterialLoadEvent) {
  gui.add(material, 'displacementScale', 0, 1, 0.1)
  gui.add(material, 'displacementBias', 0, 1, 0.1)
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
