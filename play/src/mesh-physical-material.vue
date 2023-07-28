<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh :options="{
        position: {
          x: -1
        }
      }">
        <FtSphereGeometry :radius=".5" :width-segments="64" :height-segments="64"></FtSphereGeometry>
        <FtMeshStandardMaterial :options="materialOptions">
          <FtTextureLoader url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_basecolor.jpg"
            :type="'map'">
          </FtTextureLoader>
          <FtTextureLoader url="/textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_roughness.jpg"
            type="roughnessMap">
          </FtTextureLoader>
          <FtTextureLoader url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_metallic.jpg"
            type="metalnessMap">
          </FtTextureLoader>
          <FtCubeTextureLoader :urls="[
            '/textures/fullscreen/1.left.jpg',
            '/textures/fullscreen/1.right.jpg',
            '/textures/fullscreen/1.top.jpg',
            '/textures/fullscreen/1.bottom.jpg',
            '/textures/fullscreen/1.front.jpg',
            '/textures/fullscreen/1.back.jpg',
          ]" type="envMap"></FtCubeTextureLoader>
        </FtMeshStandardMaterial>
      </FtMesh>
      <FtMesh :options="{
        position: {
          x: 1
        }
      }">
        <FtSphereGeometry :radius=".5" :width-segments="64" :height-segments="64"></FtSphereGeometry>
        <FtMeshPhysicalMaterial :options="phymaterialOptions">
          <FtTextureLoader url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_basecolor.jpg"
            :type="'map'">
          </FtTextureLoader>
          <FtTextureLoader url="/textures/Warning_Sign_HighVoltage_001/Warning_Sign_HighVoltage_001_roughness.jpg"
            type="roughnessMap">
          </FtTextureLoader>
          <FtTextureLoader url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_metallic.jpg"
            type="metalnessMap">
          </FtTextureLoader>
          <FtCubeTextureLoader :urls="[
            '/textures/fullscreen/1.left.jpg',
            '/textures/fullscreen/1.right.jpg',
            '/textures/fullscreen/1.top.jpg',
            '/textures/fullscreen/1.bottom.jpg',
            '/textures/fullscreen/1.front.jpg',
            '/textures/fullscreen/1.back.jpg',
          ]" type="envMap"></FtCubeTextureLoader>
        </FtMeshPhysicalMaterial>
      </FtMesh>
      <FtPerspectiveCamera :fov="75" :near="0.01" :far="100" :options="{
        position: {
          set: [0.1, 1, 3],
        },
      }" />
      <FtDirectionalLight :color="0xffffff" :intensity="0.7" :options="{ position: { set: [1, 2, 4] } }" />
      <FtAmbientLight :color="0xffffff" :intensity="0.5" />
      <FtWebglRenderer :params="{ antialias: true }" :animationFn="animationFn">
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { MeshPhysicalMaterialOptions, MeshStandardMaterialOptions, WebGLRendererLoadEvent } from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import { ref } from 'vue'

const materialOptions = ref<MeshStandardMaterialOptions>({
  envMapIntensity: 1,
  roughness: 0,
  metalness: 0,
})

const phymaterialOptions = ref<MeshPhysicalMaterialOptions>({
  clearcoat: 1,
  envMapIntensity: 1,
  roughness: 0,
  transmission: 1,
  ior: 1.5,
  thickness: 0.1,
  specularColor: 0x00ffff,
  specularIntensity: 1,
})

const animationFn = ({ }: WebGLRendererLoadEvent) => {

}

const { gui } = useGui()

gui.add(phymaterialOptions.value, 'roughness', 0, 1, 0.1)
gui.add(phymaterialOptions.value, 'clearcoat', 0, 1, 0.1)
gui.add(phymaterialOptions.value, 'transmission', 0, 1, 0.1)
gui.add(phymaterialOptions.value, 'ior', 1, 2.33, 0.05)
gui.add(phymaterialOptions.value, 'thickness', 0, 1, 0.1)

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
