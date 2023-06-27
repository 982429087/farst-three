<template>
  <slot />
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue'
import { provide } from '@vue/runtime-core'
import { PerspectiveCamera } from 'three'
import { cameraInjectionKey } from '@farst-three/constants/injection'
import { perspectiveCameraProps } from './perspective-camera'

defineOptions({
  name: 'FtPerspectiveCamera',
})

defineProps(perspectiveCameraProps)

// init here
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 5
provide(cameraInjectionKey, shallowRef(camera))
</script>
