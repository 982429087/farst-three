<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtMesh
        :options="{
          position: {
            x: 4,
            y: 3,
          },
        }"
      >
        <FtBoxGeometry :width="4" :height="4" :depth="4" />
        <FtMeshLambertMaterial>
          <FtTextureLoader
            url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_basecolor.jpg"
          />
        </FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh
        :options="{
          position: {
            x: -4,
            y: 3,
          },
        }"
      >
        <FtBoxGeometry :width="4" :height="4" :depth="4" />
        <FtMeshLambertMaterial :params="{ color: 0x1890ff }" />
      </FtMesh>
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0, 10, 20],
          },
        }"
      />
      <FtAmbientLight />
      <FtDirectionalLight />
      <FtGridHelper :divisions="20" :size="100" />
      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtGridHelper,
  FtMesh,
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtTextureLoader,
  FtWebglRenderer,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()

const animationFn = () => {
  //
}

const { gui } = useGui(domRef)
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
