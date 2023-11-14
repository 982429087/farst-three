<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { useProjection, useScene } from '@farst-three/hooks'
import { geoJsonPlaneEmits, geoJsonPlaneProps } from './geo-json-plane'
import { useGeoJsonPlaneLines } from './use-geo-json-plane-lines'
import { useGeoJsonPlane } from './use-geo-json-plane'

defineOptions({
  name: 'FtGeoJsonPlane',
})

const props = defineProps(geoJsonPlaneProps)
const emit = defineEmits(geoJsonPlaneEmits)
const scene = useScene()
const projection = useProjection()
let destroy: () => void
let destroy2: () => void

// 生成线
watch(
  [() => props.geoJson, () => props.lineOptions],
  ([json, opts]) => {
    if (!json) return
    destroy?.()
    const { dispose, group } = useGeoJsonPlaneLines(scene, projection, {
      ...opts,
      geoJson: json,
    })
    destroy = dispose
    emit('load', { scene, group })
  },
  { immediate: true, deep: true }
)

// 生成平面
watch(
  [() => props.geoJsonOutline, () => props.planeOptions],
  ([json, opts]) => {
    if (!json) return
    destroy2?.()
    const { dispose } = useGeoJsonPlane(scene, projection, {
      ...opts,
      geoJson: json,
    })
    destroy2 = dispose
  },
  { immediate: true, deep: true }
)

onBeforeUnmount(() => {
  destroy()
  destroy2()
})
</script>
