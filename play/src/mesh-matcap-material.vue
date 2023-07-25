<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh :options="{ position: { x: -1.5 } }">
        <FtBoxGeometry :width="1" :height="1" :depth="1"></FtBoxGeometry>
        <FtMeshMatcapMaterial :options="params">
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003\Wood_Ceiling_Coffers_003_basecolor.jpg"
            :type="'map'"
          ></FtTextureLoader>
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003\Wood_Ceiling_Coffers_003_normal.jpg"
            :type="'matcap'"
          ></FtTextureLoader>
        </FtMeshMatcapMaterial>
      </FtMesh>
      <FtMesh :options="{ position: { x: 1.5 } }">
        <FtBoxGeometry :width="1" :height="1" :depth="1"></FtBoxGeometry>
        <FtMeshMatcapMaterial :params="{ normalScale: new Vector2(1, 1) }">
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003\Wood_Ceiling_Coffers_003_basecolor.jpg"
            :type="'map'"
          ></FtTextureLoader>
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003\Wood_Ceiling_Coffers_003_ambientOcclusion.jpg"
            :type="'normalMap'"
          ></FtTextureLoader>
          <FtTextureLoader
            url="\textures\Wood_Ceiling_Coffers_003\Wood_Ceiling_Coffers_003_normal.jpg"
            :type="'matcap'"
          ></FtTextureLoader>
        </FtMeshMatcapMaterial>
      </FtMesh>
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0.1, 1, 3],
          },
        }"
      />
      <FtWebglRenderer :params="{ antialias: true }" :animationFn="animationFn">
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  MeshBasicMaterialOptions,
  WebGLRendererLoadEvent,
} from '@farst-three/components'
import { Vector2 } from 'three'
import { ref } from 'vue'

const params = ref<MeshBasicMaterialOptions>({
  // color: new Color(0x1890ff),
  // side: DoubleSide,
  // transparent: true,
  // opacity: 0.7,
  // wireframe: false,
})

const animationFn = ({}: WebGLRendererLoadEvent) => {
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
