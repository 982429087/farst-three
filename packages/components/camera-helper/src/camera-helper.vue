<template>
  <slot />
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { CameraHelper } from 'three'
import { useScene, useStoreService } from '@farst-three/hooks'
import { cameraHelperEmits, cameraHelperProps } from './camera-helper'
import type { Camera } from 'three'

defineOptions({
  name: 'FtCameraHelper',
})

defineProps(cameraHelperProps)
const emit = defineEmits(cameraHelperEmits)

// init here

const scene = useScene()
const storeService = useStoreService()
let camera: Camera | undefined = storeService.getRenderCamera()

watch(
  () => storeService.renderCamera.value,
  (v) => {
    if (v) camera = v
  },
  { immediate: true }
)
if (!camera) throw new Error('camera is not defined')
const helper = new CameraHelper(camera)
scene.add(helper)
emit('load', { helper, camera, scene })
</script>
