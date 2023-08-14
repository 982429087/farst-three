<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtMesh :options="boxOpts" @load="boxLoad">
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

      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="100"
        :options="{
          position: {
            set: [0.1, 4, 7],
          },
        }"
      />
      <FtDirectionalLight
        :options="directionalLightOptions"
        :color="0xffffaa"
        :intensity="0.95"
      >
        <FtDirectionalLightHelper :options="dlhOpts" />
      </FtDirectionalLight>
      <FtAmbientLight
        :options="lightOptions"
        :color="0xffffff"
        :intensity="0.95"
      />

      <FtGridHelper />
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
import { Color, DoubleSide } from 'three'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtDirectionalLight,
  FtDirectionalLightHelper,
  FtGridHelper,
  FtMesh,
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPlaneGeometry,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type { DirectionalLightShadow, Vector3 } from 'three'
import type {
  AmbientLightOptions,
  DirectionalLightHelperOptions,
  DirectionalLightOptions,
  MeshLoadEvent,
  MeshOptions,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()
const boxOpts = reactive<MeshOptions>({
  position: {
    z: -1,
    x: 0,
    y: 0,
  },
  castShadow: true,
})
const wallOps = reactive<MeshOptions>({
  position: {
    y: 4,
    z: -5,
  },
  receiveShadow: true,
})
const floorOps = reactive<MeshOptions>({
  rotation: {
    x: -Math.PI / 2,
  },
  receiveShadow: true,

  position: {
    y: -1,
  },
})

const lightOptions = reactive<AmbientLightOptions>({
  position: { set: [1, 2, 4] },
  intensity: 0.95,
  visible: true,
  color: () => new Color(0x1890ff),
})

const directionalLightOptions = reactive<DirectionalLightOptions>({
  intensity: 0.95,
  visible: true,
  color: () => new Color(0xffffaa),
  castShadow: true,
  position: {
    x: 0,
    y: 3,
    z: 0,
  },
  shadow: {
    mapSize: {
      x: 512,
      y: 512,
    },
    radius: 0,
  },
})

const dlhOpts = reactive<DirectionalLightHelperOptions>({
  update: () => [],
})

const animationFn = () => {
  //
}

function boxLoad({ mesh }: MeshLoadEvent) {
  directionalLightOptions.target = () => mesh
}

const { gui } = useGui(domRef)
const lightFolder = gui.addFolder('环境光')
lightFolder.add(lightOptions, 'intensity', 0, 1, 0.01)
lightFolder.add(lightOptions, 'visible')
lightFolder.addColor({ color: 0x1890ff }, 'color').onChange((val) => {
  lightOptions.color = () => new Color(val)
})
lightFolder.open()
const directionalFolder = gui.addFolder('平行光')
directionalFolder.add(directionalLightOptions, 'intensity', 0, 1, 0.01)
directionalFolder.add(directionalLightOptions, 'visible')
directionalFolder.addColor({ color: 0xffffaa }, 'color').onChange((val) => {
  directionalLightOptions.color = () => new Color(val)
})
const position = directionalLightOptions.position as Vector3
directionalFolder.add(position, 'x', -20, 20, 0.1)
directionalFolder.add(position, 'y', -20, 20, 0.1)
directionalFolder.add(position, 'z', -20, 20, 0.1)

directionalFolder.open()
const boxPosition = boxOpts.position as Vector3
const boxFolder = gui.addFolder('方块')
boxFolder.add(boxPosition, 'x', -20, 20, 0.1).onChange(() => {
  dlhOpts.update = () => []
})
boxFolder.add(boxPosition, 'y', -20, 20, 0.1).onChange(() => {
  dlhOpts.update = () => []
})
boxFolder.add(boxPosition, 'z', -20, 20, 0.1).onChange(() => {
  dlhOpts.update = () => []
})
boxFolder.open()

const shadowFolder = gui.addFolder('阴影')
const shadow = directionalLightOptions.shadow as DirectionalLightShadow
shadowFolder.add(shadow.mapSize, 'x', [512, 1024, 2048, 4096])
shadowFolder.add(shadow.mapSize, 'y', [512, 1024, 2048, 4096])
shadowFolder.add(shadow, 'radius', 0, 30, 1)
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
