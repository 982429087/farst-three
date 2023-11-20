<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import {
  Outline,
  useAnimationService,
  useRenderCamera,
  useRenderer,
  useScene,
} from '@farst-three/hooks'
import { outlineEmits, outlineProps } from './outline'

defineOptions({
  name: 'FtOutline',
})

const props = defineProps(outlineProps)
const emit = defineEmits(outlineEmits)

const scene = useScene()
const camera = useRenderCamera()
const renderer = useRenderer()
const animation = useAnimationService()

const outline = new Outline(scene, camera, renderer)
outline.render()

watch(
  () => props.options,
  (v) => {
    if (outline) outline.options = v
  },
  { deep: true, immediate: true }
)

watch(
  () => props.selected,
  (v) => {
    if (outline.outlinePass) outline.outlinePass.selectedObjects = v
  },
  { deep: true, immediate: true }
)

emit('load', { scene, outline })
animation.noRender = true
animation.on('high-light', () => {
  outline.loop()
})
onBeforeUnmount(() => {
  animation.noRender = false
  animation.off('high-light')
  outline.dispose()
})
</script>
