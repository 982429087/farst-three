<template>
  <div ref="domRef" class="farst-three">
    <FtScene :options="{ background: () => new Color('rgb(0, 0, 0)') }">
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="10000"
        :options="{
          position: {
            set: [0.1, 4, 7],
          },
        }"
      />
      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
        @load="renderLoad"
      >
        <FtMesh @hover="meshHover">
          <FtBoxGeometry />
          <FtMeshBasicMaterial :params="{ color: '#abcdef' }" />
        </FtMesh>
        <FtOrbitControls v-if="showControl" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { Color } from 'three'
import {
  FtBoxGeometry,
  FtMesh,
  FtMeshBasicMaterial,
  FtOrbitControls,
  FtOrthographicCamera,
  FtPerspectiveCamera,
  FtScene,
  FtWebglRenderer,
} from 'farst-three'
import { FtDiffusionWave } from '@farst-three/core'
import type {
  OrthographicCameraOptions,
  WebGLRendererLoadEvent,
  WebGLRendererProps,
} from 'farst-three'
import type { CameraHelper, Scene } from 'three'
const cameraHelper = shallowRef<CameraHelper>()
const size = 4
const showControl = ref(true)
const domRef = ref<HTMLDivElement>()
const othCameraOptions = ref<OrthographicCameraOptions>({
  position: {
    set: [0, 1, 4],
  },
  lookAt: (scene: Scene) => scene.position,
})

let fdw: FtDiffusionWave
function meshHover() {
  console.log('meshHover')
}

const animationFn: WebGLRendererProps['animationFn'] = () => {
  if (cameraHelper.value) {
    cameraHelper.value.update()
  }
  fdw?.loop()
}

const renderLoad = ({ camera, renderer, scene }: WebGLRendererLoadEvent) => {
  fdw = new FtDiffusionWave(scene)
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
