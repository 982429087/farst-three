<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useOptions, useScene, useStoreService } from '@farst-three/hooks'
import { orbitControlsEmits, orbitControlsProps } from './orbit-controls'
import type { Camera } from 'three'
defineOptions({
  name: 'FtOrbitControls',
})

const props = defineProps(orbitControlsProps)
const emit = defineEmits(orbitControlsEmits)

// init here
let scene = useScene()
let storeService = useStoreService()
let renderer = storeService.getRenderer()

let camera: Camera | undefined = storeService.getRenderCamera()
let controls: OrbitControls | undefined
watch(
  () => storeService.renderCamera.value,
  (v) => {
    if (v) camera = v
    if (!camera) throw new Error('<OrbitControls /> 没有找到主渲染相机!')
    if (!renderer) throw new Error('<OrbitControls /> 没有找到渲染器!')
    controls = new OrbitControls(camera, renderer.domElement)
    emit('load', { controls, camera, renderer })
    useOptions(props.options, controls, scene)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  controls?.dispose()
  ;(renderer as any) = null
  ;(storeService as any) = null
  ;(camera as any) = null
  ;(controls as any) = null
  ;(scene as any) = null
})
</script>
