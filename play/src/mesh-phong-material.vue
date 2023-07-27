<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh :options="{ position: { x: -1 } }">
        <FtBoxGeometry :width="1" :height="1" :depth="1"></FtBoxGeometry>
        <FtMeshPhongMaterial :params="{
          side: DoubleSide,
          specular: new Color('#ffff00'),
          shininess: 50
        }" :options="phongOpts">
          <FtTextureLoader url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_basecolor.jpg"
            :type="'map'"></FtTextureLoader>
        </FtMeshPhongMaterial>
      </FtMesh>
      <FtDirectionalLight :color="0xffffff" :intensity="1" />
      <FtAmbientLight :color="0xffffff" :intensity="1" />
      <FtPerspectiveCamera :fov="75" :near="0.01" :far="100" :options="caneraOps" />
      <FtWebglRenderer :animationFn="animationFn">
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import {
  MeshPhongMaterialOptions,
  PerspectiveCameraOptions,
  WebGLRendererLoadEvent,
} from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import { Color, DoubleSide } from 'three'
import { reactive } from 'vue'

const phongOpts = reactive<MeshPhongMaterialOptions>({
  side: DoubleSide,
  specular: () => new Color('#ffff00'),
  shininess: 50
})
const caneraOps = reactive<PerspectiveCameraOptions>({
  position: {
    set: [0.1, 1, 3.5],
    z: 3.5,
  }
})
const { gui } = useGui()

const animationFn = ({ }: WebGLRendererLoadEvent) => {
  //
}
gui.addColor({ specular: '#ffff00' }, 'specular').onChange((val) => {

  phongOpts.specular = () => new Color(val)
})


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
