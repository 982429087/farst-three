<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, shallowRef } from 'vue'
import { provide } from '@vue/runtime-core'
import { PerspectiveCamera } from 'three'
import { debounce } from 'lodash-es'
import {
  perspectiveCameraInjectionKey,
  sceneRefInjectionKey,
} from '@farst-three/constants/injection'
import { useInjection } from '@farst-three/hooks'
import {
  perspectiveCameraEmits,
  perspectiveCameraProps,
} from './perspective-camera'

defineOptions({
  name: 'FtPerspectiveCamera',
})

const props = defineProps(perspectiveCameraProps)
const emit = defineEmits(perspectiveCameraEmits)

// init here
const container = useInjection<HTMLDivElement>(sceneRefInjectionKey)

const camera = new PerspectiveCamera(
  props.fov,
  props.aspect || container.offsetWidth / container.offsetHeight,
  props.near,
  props.far
)

emit('load', camera)

provide(perspectiveCameraInjectionKey, shallowRef(camera))
const resize = () => {
  camera.aspect = container.offsetWidth / container.offsetHeight
  camera.updateProjectionMatrix()
}
const dOb = debounce(() => resize(), 10)
const observer = new ResizeObserver(dOb)
observer.observe(container)
onBeforeUnmount(() => {
  observer.unobserve(container)
})
</script>
