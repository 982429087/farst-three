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
        <FtMeshPhongMaterial>
          <FtTextureLoader
            url="\textures\earth\earth_atmos_2048.jpg"
            :type="'map'"
          ></FtTextureLoader>
        </FtMeshPhongMaterial>
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
        <FtMeshPhongMaterial
          :options="{
            shininess: 10,
            specular: new Color(0x00ffff)
          }"
          @load="lbasicMaterialLoad"
        >
          <FtTextureLoader
            url="\textures\earth\earth_atmos_2048.jpg"
            :type="'map'"
          ></FtTextureLoader>
          <FtTextureLoader
            url="\textures\earth\earth_specular_2048.jpg"
            :type="'specularMap'"
          ></FtTextureLoader>

        </FtMeshPhongMaterial>
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
MeshPhongMaterialLoadEvent,
  WebGLRendererProps,
} from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import { CameraHelper, Color } from 'three'
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

function lbasicMaterialLoad({ material }: MeshPhongMaterialLoadEvent) {
  gui.add(material, 'shininess', 0, 100, 0.1).onChange((val) => {
    material.shininess = val
  })
  gui.addColor({color: 0x00ffff}, 'color').onChange((val) => {
    material.specular = new Color(val)
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
