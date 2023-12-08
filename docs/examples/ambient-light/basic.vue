<template>
  <div ref="domRef" class="farst-three">
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
        <FtMesh :options="boxOpts">
          <FtBoxGeometry :width="1" :height="1" :depth="1" />
          <FtMeshLambertMaterial :params="{ color: 0x1890ff }" />
        </FtMesh>
        <FtMesh :options="wallOps">
          <FtPlaneGeometry :width="10" :height="10" />
          <FtMeshLambertMaterial :params="{ side: DoubleSide }" />
        </FtMesh>
        <FtMesh :options="floorOps">
          <FtPlaneGeometry :width="10" :height="10" />
          <FtMeshLambertMaterial :params="{ side: DoubleSide }" />
        </FtMesh>
        <FtAmbientLight
          :options="lightOptions"
          :color="0xffffff"
          :intensity="0.5"
        />

        <FtGridHelper />
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Color, DoubleSide } from 'three'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtGridHelper,
  FtMesh,
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPlaneGeometry,
  FtScene,
  FtWebglRenderer,
  useGui,
} from 'farst-three'
import type { DirectionalLightOptions, MeshOptions } from 'farst-three'
const domRef = ref<HTMLElement>()
const boxOpts = reactive<MeshOptions>({
  position: {
    z: -1,
  },
})
const wallOps = reactive<MeshOptions>({
  position: {
    y: 4,
    z: -5,
  },
})
const floorOps = reactive<MeshOptions>({
  rotation: {
    x: -Math.PI / 2,
  },
  position: {
    y: -1,
  },
})

const lightOptions = reactive<DirectionalLightOptions>({
  position: { set: [1, 2, 4] },
  intensity: 1,
  visible: true,
  color: new Color(0x1890ff),
})

const animationFn = () => {
  //
}

const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.add(lightOptions, 'intensity', 0, 1, 0.01)
  gui.add(lightOptions, 'visible')
  gui.addColor({ color: 0x1890ff }, 'color').onChange((val) => {
    lightOptions.color = () => new Color(val)
  })
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
