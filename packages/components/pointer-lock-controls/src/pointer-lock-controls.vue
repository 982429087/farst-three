<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { useOptions, useScene, useStoreService } from '@farst-three/hooks'
import {
  pointerLockControlsEmits,
  pointerLockControlsProps,
} from './pointer-lock-controls'

defineOptions({
  name: 'FtPointerLockControls',
})

const props = defineProps(pointerLockControlsProps)
const emit = defineEmits(pointerLockControlsEmits)

// init here
let scene = useScene()
let storeService = useStoreService()
let pointerLockControls = {} as PointerLockControls

watch(
  [() => storeService.renderCamera.value, () => storeService.sceneRef.value],
  ([camera, dom]) => {
    if (camera) {
      pointerLockControls = new PointerLockControls(camera, dom)
      emit('load', { scene, pointerLockControls })
      useOptions(props.options, pointerLockControls, scene)
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  pointerLockControls.dispose()
  ;(scene as any) = null
  ;(storeService as any) = null
  ;(pointerLockControls as any) = null
})
</script>
