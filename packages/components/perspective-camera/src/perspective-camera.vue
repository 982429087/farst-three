<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { provide } from '@vue/runtime-core'
import { PerspectiveCamera } from 'three'
import { debounce } from 'lodash-es'
import { perspectiveCameraInjectionKey } from '@farst-three/constants/injection'
import { useScene, useSceneRef, useSetRenderCamera } from '@farst-three/hooks'
import {
  perspectiveCameraEmits,
  perspectiveCameraProps,
} from './perspective-camera'

defineOptions({
  name: 'FtPerspectiveCamera',
})

const props = defineProps(perspectiveCameraProps)
const emit = defineEmits(perspectiveCameraEmits)

const container = useSceneRef()
const scene = useScene()
const camera = new PerspectiveCamera(
  props.fov,
  props.aspect || container.offsetWidth / container.offsetHeight,
  props.near,
  props.far
)
scene.add(camera)
emit('load', { camera, scene })
useSetRenderCamera(props, camera)
provide(perspectiveCameraInjectionKey, camera)
const resize = () => {
  camera.aspect = container.offsetWidth / container.offsetHeight
  camera.updateProjectionMatrix()
}
const dOb = debounce(() => resize(), 5)
const observer = new ResizeObserver(dOb)
observer.observe(container)
onBeforeUnmount(() => {
  observer.unobserve(container)
})
</script>
