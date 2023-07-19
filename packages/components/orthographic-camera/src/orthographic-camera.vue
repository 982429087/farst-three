<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { OrthographicCamera } from 'three'
import { useOptions, useScene, useSetRenderCamera } from '@farst-three/hooks'
import { orthographicCameraInjectionKey } from '@farst-three/constants/injection'
import {
  orthographicCameraEmits,
  orthographicCameraProps,
} from './orthographic-camera'

defineOptions({
  name: 'FtOrthographicCamera',
})

const props = defineProps(orthographicCameraProps)
const emit = defineEmits(orthographicCameraEmits)
// init here
let camera = new OrthographicCamera(
  props.left,
  props.right,
  props.top,
  props.bottom,
  props.near,
  props.far
)
let scene = useScene()
props.autoAddToScene && scene.add(camera)
emit('load', { scene, camera })
provide(orthographicCameraInjectionKey, camera)

useSetRenderCamera(props, camera)

useOptions(props.options, camera, scene)

onBeforeUnmount(() => {
  scene.remove(camera)
  ;(scene as any) = null
  ;(camera as any) = null
})
</script>
