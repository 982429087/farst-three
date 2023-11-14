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
import { edgeMoveLineEmits, edgeMoveLineProps } from './edge-move-line'
import { useEdgeMoveLine } from './use-edge-move-line'
import type { AnyFun } from '@farst-three/utils'

defineOptions({
  name: 'FtEdgeMoveLine',
})

const props = defineProps(edgeMoveLineProps)
const emit = defineEmits(edgeMoveLineEmits)

const projection = useProjection()
const scene = useScene()
const animation = useAnimationService()
let animationFn: AnyFun | undefined
let destroy: AnyFun | undefined
watch(
  [() => props.geojson, () => props.options],
  ([json, opts]) => {
    if (!json) return
    destroy?.()
    const { render, dispose } = useEdgeMoveLine(scene, projection, {
      ...opts,
      geoJson: json,
    })
    animationFn = render
    destroy = dispose
  },
  {
    immediate: true,
    deep: true,
  }
)

emit('load', { scene })
animation.on('edge-move-line', () => {
  animationFn?.()
})
onBeforeUnmount(() => {
  destroy?.()
})
</script>
