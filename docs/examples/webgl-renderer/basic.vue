<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtGroup>
        <FtMesh>
          <FtBoxGeometry />
          <FtMeshBasicMaterial :params="{ color: '#ABCDEF' }" />
        </FtMesh>
      </FtGroup>
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
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import {
  FtBoxGeometry,
  FtGroup,
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
const domRef = ref<HTMLDivElement>()
const size = 4

const othCameraOptions = ref<OrthographicCameraOptions>({
  position: {
    set: [0, 1, 4],
  },
  lookAt: (scene: Scene) => scene.position,
})

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
