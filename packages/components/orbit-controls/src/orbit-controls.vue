<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  useOptions,
  useRenderer,
  useScene,
  useStoreService,
} from '@farst-three/hooks'
import { orbitControlsEmits, orbitControlsProps } from './orbit-controls'
import type { Camera } from 'three'
defineOptions({
  name: 'FtOrbitControls',
})

const props = defineProps(orbitControlsProps)
const emit = defineEmits(orbitControlsEmits)

// init here
let scene = useScene()
let renderer = useRenderer()
let storeService = useStoreService()
let camera: Camera | undefined = storeService.getRenderCamera()

watch(
  () => storeService.renderCamera.value,
  (v) => {
    if (v) camera = v
  },
  { immediate: true }
)
if (!camera) throw new Error('没有找到主渲染相机!')
let controls = new OrbitControls(camera, renderer.domElement)
emit('load', { controls, camera, renderer })
useOptions(props.options, controls, scene)
onBeforeUnmount(() => {
  controls.dispose()
  ;(renderer as any) = null
  ;(storeService as any) = null
  ;(camera as any) = null
  ;(controls as any) = null
  ;(scene as any) = null
})
</script>
