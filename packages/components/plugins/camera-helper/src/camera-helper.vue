<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { CameraHelper } from 'three'
import { useScene, useStoreService } from '@farst-three/hooks'
import { cameraHelperEmits, cameraHelperProps } from './camera-helper'
import type { StoreService } from '@farst-three/hooks'
import type { Camera, Scene } from 'three'

defineOptions({
  name: 'FtCameraHelper',
})

defineProps(cameraHelperProps)
const emit = defineEmits(cameraHelperEmits)

// init here

let scene: Scene | null = useScene()
let storeService: StoreService | null = useStoreService()
let camera: Camera | undefined = storeService.getRenderCamera()

watch(
  () => storeService?.renderCamera.value,
  (v) => {
    if (v) camera = v
  },
  { immediate: true }
)
if (!camera) throw new Error('camera is not defined')
let helper: CameraHelper | null = new CameraHelper(camera)
scene.add(helper)
emit('load', { helper, camera, scene })

onBeforeUnmount(() => {
  helper?.dispose()
  helper = null
  scene = null
  storeService = null
})
</script>
