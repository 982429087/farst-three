<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtMesh :options="planeOps">
        <FtPlaneGeometry :width="1" :height="1" />
        <FtMeshBasicMaterial :options="params" />
      </FtMesh>
      <FtMesh :options="sphereOps">
        <FtSphereGeometry
          :radius="0.5"
          :width-segments="16"
          :height-segments="16"
        />
        <FtMeshBasicMaterial :options="params" />
      </FtMesh>
      <FtMesh :options="boxOps">
        <FtBoxGeometry :width="1" :height="1" :depth="1" />
        <FtMeshBasicMaterial :options="params" />
      </FtMesh>
      <FtMesh :options="torusOps">
        <FtTorusGeometry
          :radius="0.4"
          :tube="0.2"
          :radial-segments="16"
          :tubular-segments="32"
        />
        <FtMeshBasicMaterial :options="params" />
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
      <FtDirectionalLight
        :color="0xffffff"
        :intensity="0.7"
        :options="{ position: { set: [1, 2, 4] } }"
      />
      <FtAmbientLight :color="0xffffff" :intensity="0.5" />
      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
      >
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Clock, Color, DoubleSide } from 'three'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtDirectionalLight,
  FtMesh,
  FtMeshBasicMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPlaneGeometry,
  FtScene,
  FtSphereGeometry,
  FtTorusGeometry,
  FtWebglRenderer,
} from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import type {
  MeshBasicMaterialOptions,
  MeshOptions,
} from '@farst-three/components'

const clock = new Clock()
const domRef = ref<HTMLDivElement>()
const params = ref<MeshBasicMaterialOptions>({
  color: new Color(0x1890ff),
  side: DoubleSide,
  transparent: true,
  opacity: 0.7,
  wireframe: false,
})
const planeOps = reactive<MeshOptions>({
  position: {
    z: -1,
  },
})
const sphereOps = ref<MeshOptions>({
  position: {
    x: -1.5,
  },
})
const boxOps = ref<MeshOptions>({
  position: {
    z: 1,
  },
})
const torusOps = ref<MeshOptions>({
  position: {
    x: 1.5,
  },
})
const animationFn = () => {
  const elapsedTime = clock.getElapsedTime()
  planeOps.rotation = {
    y: elapsedTime * 0.2,
  }
  sphereOps.value.rotation = {
    y: elapsedTime * 0.2,
  }
  boxOps.value.rotation = {
    y: elapsedTime * 0.2,
  }
  torusOps.value.rotation = {
    y: elapsedTime * 0.2,
  }
}

const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.addColor({ color: 0x1890ff }, 'color').onChange((v) => {
    params.value.color = new Color(v)
  })
  gui.add(params.value, 'opacity', 0, 1, 0.01)
  gui.add(params.value, 'transparent').onChange((v) => {
    // params.value.transparent = v
  })
  gui.add(params.value, 'wireframe').name('线框')
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
