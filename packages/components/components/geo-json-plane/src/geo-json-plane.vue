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
import { geoJsonPlaneEmits, geoJsonPlaneProps } from './geo-json-plane'
import { useGeoJsonPlaneLines } from './use-geo-json-plane-lines'
import { useGeoJsonPlane } from './use-geo-json-plane'

defineOptions({
  name: 'FtGeoJsonPlane',
})

const props = defineProps(geoJsonPlaneProps)
const emit = defineEmits(geoJsonPlaneEmits)

const animation = useAnimationService()
const scene = useScene()
const projection = useProjection()
let destroy: () => void
let destroy2: () => void
let render2: () => void
watch(
  () => props.geoJson,
  (v) => {
    if (!v) return
    const { dispose } = useGeoJsonPlaneLines(scene, projection, v)
    destroy = dispose
  },
  { immediate: true }
)

watch(
  () => props.geoJsonOutline,
  (v) => {
    if (!v) return
    const { dispose, render } = useGeoJsonPlane(scene, projection, v)
    render2 = render
    destroy2 = dispose
  },
  { immediate: true }
)
emit('load', { scene })
animation.on('geoJsonPlane', () => {
  if (render2) render2()
})
onBeforeUnmount(() => {
  destroy()
  destroy2()
  animation.off('geoJsonPlane')
})
</script>
