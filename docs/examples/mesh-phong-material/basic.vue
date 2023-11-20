<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="caneraOps"
      />
      <FtWebglRenderer :animation-fn="animationFn">
        <FtMesh :options="{ position: { x: -1 } }">
          <FtBoxGeometry :width="1" :height="1" :depth="1" />
          <FtMeshPhongMaterial
            :params="{
              side: DoubleSide,
              specular: new Color('#ffff00'),
              shininess: 50,
            }"
            :options="phongOpts"
          >
            <FtTextureLoader
              url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_basecolor.jpg"
              :type="'map'"
            />
          </FtMeshPhongMaterial>
        </FtMesh>
        <FtDirectionalLight :color="0xffffff" :intensity="1" />
        <FtAmbientLight :color="0xffffff" :intensity="1" />
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Color, DoubleSide } from 'three'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtDirectionalLight,
  FtMesh,
  FtMeshPhongMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtScene,
  FtTextureLoader,
  FtWebglRenderer,
} from '@farst-three/components'
import type {
  MeshPhongMaterialOptions,
  PerspectiveCameraOptions,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()

const phongOpts = reactive<MeshPhongMaterialOptions>({
  side: DoubleSide,
  specular: () => new Color('#ffff00'),
  shininess: 50,
})
const caneraOps = reactive<PerspectiveCameraOptions>({
  position: {
    set: [0.1, 1, 3.5],
    z: 3.5,
  },
})
const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.addColor({ specular: '#ffff00' }, 'specular').onChange((val) => {
    phongOpts.specular = () => new Color(val)
  })
})
const animationFn = () => {
  //
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
