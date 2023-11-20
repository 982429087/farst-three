<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {
  useAnimationService,
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

const scene = useScene()
const storeService = useStoreService()
const renderer = useRenderer()
const animationService = useAnimationService()

let camera: Camera | undefined = storeService.getRenderCamera()
let controls: OrbitControls | undefined
watch(
  () => storeService.renderCamera.value,
  (v) => {
    if (v) camera = v
    if (!camera) throw new Error('<OrbitControls /> 没有找到主渲染相机!')
    controls = new OrbitControls(camera, renderer.domElement)
    emit('load', { controls, camera, renderer })
    useOptions(props.options, controls, scene)
  },
  { immediate: true }
)
animationService.on('controls', () => {
  controls?.update()
})
onBeforeUnmount(() => {
  controls?.dispose()
  animationService.off('controls')
})
</script>
