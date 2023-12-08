<template>
  <div class="farst-three">
    <FtScene>
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
      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
      >
        <FtMesh :options="{ position: { x: -1.5 } }">
          <FtBoxGeometry :width="1" :height="1" :depth="1" />
          <FtMeshMatcapMaterial :options="params">
            <FtTextureLoader
              :url="
                baseUrl +
                'textures/Wood_Ceiling_Coffers_003/Wood_Ceiling_Coffers_003_basecolor.jpg'
              "
              :type="'map'"
            />
            <FtTextureLoader
              :url="
                baseUrl +
                'textures/Wood_Ceiling_Coffers_003/Wood_Ceiling_Coffers_003_normal.jpg'
              "
              :type="'matcap'"
            />
          </FtMeshMatcapMaterial>
        </FtMesh>
        <FtMesh :options="{ position: { x: 1.5 } }">
          <FtBoxGeometry :width="1" :height="1" :depth="1" />
          <FtMeshMatcapMaterial :params="{ normalScale: new Vector2(1, 1) }">
            <FtTextureLoader
              :url="
                baseUrl +
                'textures/Wood_Ceiling_Coffers_003/Wood_Ceiling_Coffers_003_basecolor.jpg'
              "
              :type="'map'"
            />
            <FtTextureLoader
              :url="
                baseUrl +
                'textures/Wood_Ceiling_Coffers_003/Wood_Ceiling_Coffers_003_ambientOcclusion.jpg'
              "
              :type="'normalMap'"
            />
            <FtTextureLoader
              :url="
                baseUrl +
                'textures/Wood_Ceiling_Coffers_003/Wood_Ceiling_Coffers_003_normal.jpg'
              "
              :type="'matcap'"
            />
          </FtMeshMatcapMaterial>
        </FtMesh>
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Vector2 } from 'three'
import {
  FtBoxGeometry,
  FtMesh,
  FtMeshMatcapMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtTextureLoader,
  FtWebglRenderer,
} from 'farst-three'
import type { MeshBasicMaterialOptions } from 'farst-three'

const baseUrl = import.meta.env.VITE_BASE_URL

const params = ref<MeshBasicMaterialOptions>({
  // color: new Color(0x1890ff),
  // side: DoubleSide,
  // transparent: true,
  // opacity: 0.7,
  // wireframe: false,
})

const animationFn = () => {
  //
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
