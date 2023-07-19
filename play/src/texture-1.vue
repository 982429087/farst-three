<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh :options="{
          position: {
            x: -1.5,
          },
        }">
        <FtCylinderGeometry :radiusTop="1" :radiusBottom="1" :height="1" />
        <FtMeshLambertMaterial>
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003\Wood_Ceiling_Coffers_003_basecolor.jpg"
            :type="'map'"
          ></FtTextureLoader>
        </FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh :options="{
          position: {
            x: 1,
          },
        }">
        <FtBoxGeometry :width="1" :height="1" :depth="1"></FtBoxGeometry>
        <FtMeshLambertMaterial>
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003/wood_ceiling_coffers_003_basecolor.jpg"
            :type="'map'"
          ></FtTextureLoader>
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003\Wood_Ceiling_Coffers_003_ambientOcclusion.jpg"
            :type="'aoMap'"
          ></FtTextureLoader>
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003\Wood_Ceiling_Coffers_003_height.png"
            :type="'bumpMap'"
          ></FtTextureLoader>
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003\Wood_Ceiling_Coffers_003_normal.jpg"
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
        @load="cameraLoad"
        :options="othCameraOptions"
      />
      <FtDirectionalLight :color="0xffffff" :intensity="0.5" />
      <FtAmbientLight :color="0xffffff" />

      <FtWebglRenderer :params="{ antialias: true }" :animationFn="animationFn">
        <FtOrbitControls v-if="showControl" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  OrthographicCameraLoadEvent,
  WebGLRendererProps,
} from '@farst-three/components'
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


const cameraLoad = ({ camera, scene }: OrthographicCameraLoadEvent) => {
  // camera.position.set(1, 0.5, 2)
  camera.lookAt(scene.position)
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
