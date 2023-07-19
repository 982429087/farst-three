<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { provide } from '@vue/runtime-core'
import { PerspectiveCamera } from 'three'
import { debounce } from 'lodash-es'
import { perspectiveCameraInjectionKey } from '@farst-three/constants/injection'
import {
  useOptions,
  useScene,
  useSceneRef,
  useSetRenderCamera,
} from '@farst-three/hooks'
import {
  perspectiveCameraEmits,
  perspectiveCameraProps,
} from './perspective-camera'

defineOptions({
  name: 'FtPerspectiveCamera',
})

const props = defineProps(perspectiveCameraProps)
const emit = defineEmits(perspectiveCameraEmits)

let container = useSceneRef()
let scene = useScene()
let camera = new PerspectiveCamera(
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

useOptions(props.options, camera, scene)

onBeforeUnmount(() => {
  scene.remove(camera)
  observer.unobserve(container)
  ;(scene as any) = null
  ;(container as any) = null
  ;(camera as any) = null
})
</script>
