<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { isEmpty } from 'lodash'
import {
  useContainer,
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

const scene = useScene()
const dragService = useDragService()
const storeService = useStoreService()
const dom = useContainer()

let dragControls: DragControls | null = null

watch(
  [dragService.aollections, () => storeService.renderCamera.value],
  ([collection, camera]) => {
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
})
</script>
