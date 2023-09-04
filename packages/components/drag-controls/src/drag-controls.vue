<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { isEmpty } from 'lodash'
import {
  useDragService,
  useOptions,
  useScene,
  useStoreService,
} from '@farst-three/hooks'
import { dragControlsEmits, dragControlsProps } from './drag-controls'

defineOptions({
  name: 'FtDragControls',
})

const props = defineProps(dragControlsProps)
const emit = defineEmits(dragControlsEmits)

let scene = useScene()
let dragService = useDragService()
let storeService = useStoreService()

let dragControls: DragControls | null = null

watch(
  [
    dragService.aollections,
    () => storeService.renderCamera.value,
    () => storeService.sceneRef.value,
  ],
  ([collection, camera, dom]) => {
    if (!isEmpty(collection) && camera && dom) {
      dragControls = new DragControls(collection, camera, dom)
      emit('load', { scene, dragControls })
    } else {
      dragControls?.dispose()
      dragControls = null
    }
  },
  { immediate: true }
)

useOptions(props.options, dragControls, scene)

onBeforeUnmount(() => {
  dragControls?.dispose()
  dragService.clearCount()
  ;(scene as any) = null
  ;(dragControls as any) = null
  ;(dragService as any) = null
  ;(storeService as any) = null
})
</script>
