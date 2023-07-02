<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide, shallowRef } from 'vue'
import { OrthographicCamera } from 'three'
import { useScene } from '@farst-three/hooks'
import { cameraInjectionKey } from '@farst-three/constants/injection'
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
scene.add(camera)
emit('load', { scene, camera })
provide(cameraInjectionKey, shallowRef(camera))
</script>
