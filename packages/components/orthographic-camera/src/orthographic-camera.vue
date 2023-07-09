<template>
  <slot />
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { OrthographicCamera } from 'three'
import { useScene, useSetRenderCamera } from '@farst-three/hooks'
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
const camera = new OrthographicCamera(
  props.left,
  props.right,
  props.top,
  props.bottom,
  props.near,
  props.far
)
const scene = useScene()
props.autoAddToScene && scene.add(camera)
emit('load', { scene, camera })
provide(orthographicCameraInjectionKey, camera)
useSetRenderCamera(props, camera)
</script>
