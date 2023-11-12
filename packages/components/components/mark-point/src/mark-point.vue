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

const scene = useScene()
const animation = useAnimationService()
const projection = useProjection()
let animationFn: () => void
let destroy: () => void
watch(
  () => props.points,
  (v) => {
    if (!v) return
    const { render, dispose } = useMarkPoint(scene, projection, v)
    animationFn = render
    destroy = dispose
  },
  { immediate: true }
)
animation.on('mark-point', () => {
  if (animationFn) animationFn()
})
emit('load', { scene })

onBeforeUnmount(() => {
  if (destroy) destroy()
  animation.off('mark-point')
})
</script>
