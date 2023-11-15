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
import { EdgeMoveLine } from './use-edge-move-line'

defineOptions({
  name: 'FtEdgeMoveLine',
})

const props = defineProps(edgeMoveLineProps)
const emit = defineEmits(edgeMoveLineEmits)

const projection = useProjection()
const scene = useScene()
const animation = useAnimationService()

const edgeMoveLine = new EdgeMoveLine(
  scene,
  projection,
  props.options,
  props.geojson
)

watch(
  [() => props.geojson, () => props.options],
  ([json, opts]) => {
    if (!json) return
    edgeMoveLine.geoJson = json
    edgeMoveLine.options = opts
    edgeMoveLine.render()
    emit('load', { scene, edgeMoveLine })
  },
  {
    immediate: true,
    deep: true,
  }
)

animation.on('edge-move-line', () => {
  edgeMoveLine.animationLoop()
})
onBeforeUnmount(() => {
  edgeMoveLine.dispose()
})
</script>
