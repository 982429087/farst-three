<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
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

      <FtWebglRenderer
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtMesh :options="boxOpts" @load="boxLoad">
          <FtBoxGeometry :width="1" :height="1" :depth="1" />
          <FtMeshLambertMaterial :params="{ color: 0x1890ff }" />
        </FtMesh>
        <FtMesh :options="skyOps">
          <FtPlaneGeometry :width="10000" :height="10000" />
          <FtMeshLambertMaterial :params="{ side: DoubleSide }" />
        </FtMesh>
        <FtMesh :options="floorOps">
          <FtPlaneGeometry :width="10000" :height="10000" />
          <FtMeshLambertMaterial :params="{ side: DoubleSide }" />
        </FtMesh>
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
        <FtHemisphereLight
          :sky-color="0xffff55"
          :ground-color="0x00ffff"
          :intensity="1"
          :options="hemisOpts"
        >
          <FtHemisphereLightHelper :size="1" />
        </FtHemisphereLight>

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
  FtDirectionalLight,
  FtDirectionalLightHelper,
  FtGridHelper,
  FtHemisphereLight,
  FtHemisphereLightHelper,
  FtMesh,
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPlaneGeometry,
  FtScene,
  FtWebglRenderer,
  useGui,
} from 'farst-three'
import type { DirectionalLightShadow, Vector3 } from 'three'
import type {
  AmbientLightOptions,
  DirectionalLightHelperOptions,
  DirectionalLightOptions,
  HemisphereLightOptions,
  MeshLoadEvent,
  MeshOptions,
} from 'farst-three'
const domRef = ref<HTMLDivElement>()
const boxOpts = reactive<MeshOptions>({
  position: {
    z: -1,
    x: 0,
    y: 0,
  },
  castShadow: true,
})
const skyOps = reactive<MeshOptions>({
  position: {
    y: 10,
  },
  rotation: {
    x: Math.PI / 2,
  },
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
  visible: false,
  color: () => new Color(0x1890ff),
})

const hemisOpts = reactive<HemisphereLightOptions>({
  intensity: 1,
  visible: true,
  position: {
    x: 0,
    y: 1,
    z: 0,
  },
})

const directionalLightOptions = reactive<DirectionalLightOptions>({
  intensity: 0.95,
  visible: true,
  color: () => new Color(0xffffaa),
  castShadow: true,
  position: {
    x: 0,
    y: 1,
    z: 2,
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

const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
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

  const heLightFolder = gui.addFolder('半球光')
  const heposition = hemisOpts.position as Vector3
  heLightFolder.add(hemisOpts, 'intensity', 0, 1, 0.01)
  heLightFolder.add(hemisOpts, 'visible')
  heLightFolder.add(heposition, 'x', -20, 20, 0.1)
  heLightFolder.add(heposition, 'y', -20, 20, 0.1)
  heLightFolder.add(heposition, 'z', -20, 20, 0.1)
  heLightFolder.open()
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
