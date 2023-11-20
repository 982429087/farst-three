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
        <FtMesh :options="boxOpts" @load="meshlaod">
          <FtBoxGeometry :width="1" :height="1" :depth="1" />
          <FtMeshLambertMaterial :params="{ color: 0x1890ff }" />
        </FtMesh>
        <FtMesh :options="floorOps">
          <FtPlaneGeometry :width="1000" :height="1000" />
          <FtMeshLambertMaterial :params="{ side: DoubleSide }" />
        </FtMesh>

        <FtSpotLight :options="soptLightOpts" @load="soptLightLoad">
          <!-- <FtSpotLightHelper :options="spothOpts" @load="spotLightHelperload" /> -->
        </FtSpotLight>
        <FtAmbientLight
          :options="lightOptions"
          :color="0xffffff"
          :intensity="0.95"
        />

        <FtGridHelper :size="1000" :divisions="1000" />
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, shallowRef } from 'vue'
import { CameraHelper, Color, DoubleSide } from 'three'
import { useGui } from '@farst-three/hooks'
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
  FtSpotLight,
  FtSpotLightHelper,
  FtWebglRenderer,
} from '@farst-three/components'
import type {
  PerspectiveCamera,
  SpotLight,
  SpotLightHelper,
  SpotLightShadow,
  Vector3,
} from 'three'
import type {
  AmbientLightOptions,
  DirectionalLightHelperOptions,
  DirectionalLightOptions,
  MeshLoadEvent,
  MeshOptions,
  SpotLightHelperLoadEvent,
  SpotLightLoadEvent,
  SpotLightOptions,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()
const boxOpts = reactive<MeshOptions>({
  position: {
    z: 0,
    x: 0,
    y: 2,
  },
  castShadow: true,
})
const floorOps = reactive<MeshOptions>({
  rotation: {
    x: -Math.PI / 2,
  },
  receiveShadow: true,

  position: {
    y: -0.01,
  },
})

const lightOptions = reactive<AmbientLightOptions>({
  position: { set: [1, 2, 4] },
  intensity: 0.95,
  visible: false,
  color: () => new Color(0xffffff),
})

const soptLightOpts = reactive<SpotLightOptions>({
  castShadow: true,
  position: {
    y: 5,
    z: 0,
    x: 0,
  },
  intensity: 0.95,
  distance: 100,
  angle: Math.PI / 4,
  penumbra: 0.05,
  decay: 2,
  color: () => new Color(0xfffff0),
  shadow: {
    camera: {
      near: 1,
      far: 2,
      fov: 75,
    },
  },
})

const soptLightInstance = shallowRef<SpotLight>()
const soptShadowCameraHelper = shallowRef<any>()
const soptLightLoad = ({ light, scene }: SpotLightLoadEvent) => {
  soptLightInstance.value = light
  const helper = new CameraHelper(light.shadow!.camera)
  scene.add(helper)
  soptShadowCameraHelper.value = helper
}
const spothOpts = reactive<DirectionalLightHelperOptions>({
  update: () => [],
})

function meshlaod({ mesh }: MeshLoadEvent) {
  soptLightOpts.target = () => mesh
}

const animationFn = () => {
  const shadow = soptLightOpts.shadow as SpotLightShadow
  const camera = shadow.camera as PerspectiveCamera
  if (soptLightInstance.value) {
    // soptLightInstance.value.shadow.camera.near = camera.near
    soptLightInstance.value.shadow.camera.far = camera.far
    // soptLightInstance.value.shadow.camera.fov = camera.fov
  }
  if (soptShadowCameraHelper.value) {
    soptShadowCameraHelper.value.update()
  }
}

const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  const boxFolder = gui.addFolder('物体')
  const boxPosition = boxOpts.position as Vector3
  boxFolder
    .add(boxPosition, 'x', -30, 30)
    .name('box x')
    .onChange(() => (spothOpts.update = () => []))
  const soptLightFolder = gui.addFolder('点光源')
  soptLightFolder.add(soptLightOpts, 'intensity', 0, 1).name('强度')
  soptLightFolder
    .add(soptLightOpts, 'distance', 0, 100)
    .name('距离')
    .onChange(() => (spothOpts.update = () => []))
  soptLightFolder.add(soptLightOpts, 'angle', 0, Math.PI * 2).name('角度')
  soptLightFolder.add(soptLightOpts, 'penumbra', 0, 1).name('半影')
  soptLightFolder.add(soptLightOpts, 'decay', 0, 2).name('衰减')
  const position = soptLightOpts.position as Vector3
  soptLightFolder.add(position, 'x', -30, 30).name('x')
  soptLightFolder.add(position, 'y', -30, 30).name('y')
  soptLightFolder.add(position, 'z', -30, 30).name('z')

  const shadowFolder = gui.addFolder('阴影')
  const shadowCamera = (soptLightOpts.shadow as SpotLightShadow)
    .camera as PerspectiveCamera
  shadowFolder.add(shadowCamera, 'near', 0.01, 10, 0.1)
  shadowFolder.add(shadowCamera, 'far', 0.01, 100, 0.1)
  shadowFolder.add(shadowCamera, 'fov').name('fov')
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
