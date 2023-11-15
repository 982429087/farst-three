<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { useProjection, useScene } from '@farst-three/hooks'
import { geoJsonPlaneEmits, geoJsonPlaneProps } from './geo-json-plane'
import { GeoJsonPlane } from './GeoJsonPlane'

defineOptions({
  name: 'FtGeoJsonPlane',
})

const props = defineProps(geoJsonPlaneProps)
const emit = defineEmits(geoJsonPlaneEmits)
const scene = useScene()
const projection = useProjection()

const geoJsonPlane = new GeoJsonPlane(scene, projection)

watch(
  [() => props.geoJson, () => props.options],
  ([json, v]) => {
    if (!json) return
    geoJsonPlane.geoJson = json
    if (v) geoJsonPlane.options = v
    geoJsonPlane.render()
    emit('load', { scene, geoJsonPlane })
  },
  {
    immediate: true,
    deep: true,
  }
)

// // 生成线
// watch(
//   [() => props.geoJson, () => props.lineOptions],
//   ([json, opts]) => {
//     if (!json) return
//     destroy?.()
//     const { dispose, group } = useGeoJsonPlaneLines(scene, projection, {
//       ...opts,
//       geoJson: json,
//     })
//     destroy = dispose
//     emit('load', { scene, group })
//   },
//   { immediate: true, deep: true }
// )

// // 生成平面
// watch(
//   [() => props.geoJsonOutline, () => props.planeOptions],
//   ([json, opts]) => {
//     if (!json) return
//     destroy2?.()
//     const { dispose } = useGeoJsonPlane(scene, projection, {
//       ...opts,
//       geoJson: json,
//     })
//     destroy2 = dispose
//   },
//   { immediate: true, deep: true }
// )

onBeforeUnmount(() => {
  geoJsonPlane.dispose()
})
</script>
