<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import {
  useAnimationService,
  useProjection,
  useScene,
} from '@farst-three/hooks'
import { markPointEmits, markPointProps } from './mark-point'
import { useMarkPoint } from './use-mark-point'

defineOptions({
  name: 'FtMarkPoint',
})

const props = defineProps(markPointProps)
const emit = defineEmits(markPointEmits)

// init here
const scene = useScene()
const animation = useAnimationService()
const projection = useProjection()
let render1: () => void
let destroy: () => void
watch(
  () => props.points,
  (v) => {
    if (!v) return
    const { render, dispose } = useMarkPoint(scene, projection, v)
    render1 = render
    destroy = dispose
  },
  { immediate: true }
)
animation.on('mark-point', () => {
  if (render1) render1()
})
emit('load', { scene })

onBeforeUnmount(() => {
  if (destroy) destroy()
  animation.off('mark-point')
})
</script>
