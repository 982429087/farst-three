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
        <FtMesh :options="planeOps">
          <FtPlaneGeometry :width="1" :height="1" />
          <FtMeshLambertMaterial :options="params" />
        </FtMesh>
        <FtMesh :options="sphereOps">
          <FtSphereGeometry
            :radius="0.5"
            :width-segments="16"
            :height-segments="16"
          />
          <FtMeshLambertMaterial :options="params" />
        </FtMesh>
        <FtMesh :options="boxOps">
          <FtBoxGeometry :width="1" :height="1" :depth="1" />
          <FtMeshLambertMaterial :options="params" />
        </FtMesh>
        <FtMesh :options="torusOps">
          <FtTorusGeometry
            :radius="0.4"
            :tube="0.2"
            :radial-segments="16"
            :tubular-segments="32"
          />
          <FtMeshLambertMaterial :options="params" />
        </FtMesh>
        <FtDirectionalLight
          :color="0xffffff"
          :intensity="0.7"
          :options="directionOpts"
        />
        <FtAmbientLight :color="0xffffff" :intensity="0.5" />
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
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPlaneGeometry,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type { Vector3 } from 'three'
import type {
  DirectionalLightOptions,
  MeshBasicMaterialOptions,
  MeshOptions,
} from '@farst-three/components'
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

const directionOpts = reactive<DirectionalLightOptions>({
  position: {
    set: [2, 2, 2],
    x: 2,
    y: 2,
    z: 2,
  },
  intensity: 0.7,
})

const animationFn = () => {
  //
}

const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.addColor({ color: 0x1890ff }, 'color').onChange((v) => {
    directionOpts.color = new Color(v)
  })

  const position = directionOpts.position as Vector3
  gui.add(position, 'x', -10, 10, 0.1)
  gui.add(position, 'y', -10, 10, 0.1)
  gui.add(position, 'z', -10, 10, 0.1)

  gui.add(directionOpts, 'intensity', 0, 1, 0.1)
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
