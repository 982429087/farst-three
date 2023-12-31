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
        :params="{ antialias: true }"
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
        <FtMesh :options="wallOps">
          <FtPlaneGeometry :width="10" :height="10" />
          <FtMeshLambertMaterial :params="{ side: DoubleSide }" />
        </FtMesh>
        <FtMesh :options="floorOps">
          <FtPlaneGeometry :width="10" :height="10" />
          <FtMeshLambertMaterial :params="{ side: DoubleSide }" />
        </FtMesh>
        <FtMesh :options="pointYellowOpts">
          <FtSphereGeometry
            :radius="0.05"
            :width-segments="64"
            :height-segments="64"
          />
          <FtMeshBasicMaterial :params="{ color: 0xf3ae3d }" />
        </FtMesh>
        <FtMesh :options="pointGreenOpts">
          <FtSphereGeometry
            :radius="0.05"
            :width-segments="64"
            :height-segments="64"
          />
          <FtMeshBasicMaterial :params="{ color: 0xa1fc8f }" />
        </FtMesh>

        <FtPointLight
          :options="pointLightYellowOpts"
          :color="0xf3ae3d"
          :intensity="0.8"
          @load="pointLightYellowLoad"
        >
          <FtPointLightHelper :options="plhOpts" />
        </FtPointLight>
        <FtPointLight
          :options="pointLightGreenOpts"
          :color="0xa1fc8f"
          :intensity="0.8"
          @load="pointLightGreenLoad"
        />
        <FtAmbientLight
          :options="lightOptions"
          :color="0xffffff"
          :intensity="0.95"
        />
        <FtPoints />
        <FtGridHelper />
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  Color,
  DoubleSide,
  MeshBasicMaterial,
  Points,
  PointsMaterial,
  SphereGeometry,
} from 'three'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtGridHelper,
  FtMesh,
  FtMeshBasicMaterial,
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPlaneGeometry,
  FtPointLight,
  FtPointLightHelper,
  FtPoints,
  FtScene,
  FtSphereGeometry,
  FtWebglRenderer,
  useGui,
} from 'farst-three'
import type { DirectionalLightShadow, Vector3 } from 'three'
import type {
  AmbientLightOptions,
  DirectionalLightHelperOptions,
  MeshLoadEvent,
  MeshOptions,
  PointLightLoadEvent,
  PointLightOptions,
  PointsOptions,
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

const pointLightYellowOpts = reactive<PointLightOptions>({
  castShadow: true,
  position: { x: -1, y: 1, z: 2 },
  intensity: 0.8,
  distance: 10,
  decay: 2,
  color: () => new Color(0xf3ae3d),
})

const pointLightGreenOpts = reactive<PointLightOptions>({
  castShadow: true,
  position: { set: [1, 1, 2] },
})

const pointGreenOpts = reactive<PointsOptions>({
  position: {},
})
const pointYellowOpts = reactive<PointsOptions>({
  position: {
    x: -1,
    y: 1,
    z: 2,
  },
})

const plhOpts = reactive<DirectionalLightHelperOptions>({
  update: () => [],
})

function pointLightGreenLoad(e: PointLightLoadEvent) {
  ;(pointGreenOpts.position as Vector3)!.copy = () => e.light.position
}
function pointLightYellowLoad(e: PointLightLoadEvent) {
  ;(pointYellowOpts.position as Vector3)!.copy = () => e.light.position
}

const animationFn = () => {
  //
}

function boxLoad({ mesh }: MeshLoadEvent) {
  //
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

  const pointlightFolder = gui.addFolder('pointLightYellow')
  pointlightFolder.add(pointLightYellowOpts, 'intensity', -10, 10, 0.1)
  const position = pointLightYellowOpts.position as Vector3
  const pointPosition = pointYellowOpts.position as Vector3
  pointlightFolder.add(position, 'x', -10, 10, 0.1).onChange((val) => {
    pointPosition.x = val
  })
  pointlightFolder.add(position, 'y', -10, 10, 0.1).onChange((val) => {
    pointPosition.y = val
  })
  pointlightFolder.add(position, 'z', -10, 10, 0.1).onChange((val) => {
    pointPosition.z = val
  })
  pointlightFolder.add(pointLightYellowOpts, 'distance', 0, 20, 0.1)
  pointlightFolder.add(pointLightYellowOpts, 'decay', 0, 20, 0.1)
  pointlightFolder.open()
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
