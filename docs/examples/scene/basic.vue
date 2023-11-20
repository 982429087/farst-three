<template>
  <div ref="domRef" class="farst-three">
    <FtScene :options="{ background: () => new Color('rgb(100, 100, 100)') }">
      <FtOrthographicCamera
        :left="-size"
        :right="size"
        :top="size / 2"
        :bottom="-size / 2"
        :near="0.001"
        :far="100"
        :options="othCameraOptions"
      />
      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
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
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type {
  OrthographicCameraOptions,
  WebGLRendererProps,
} from '@farst-three/components'
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

function meshHover() {
  console.log('meshHover')
}

const animationFn: WebGLRendererProps['animationFn'] = () => {
  if (cameraHelper.value) {
    cameraHelper.value.update()
  }
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
