<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { useObj3d, useOptions, useScene } from '@farst-three/hooks'
import { textGeometryEmits, textGeometryProps } from './text-geometry'
import { useTextGeometry } from './use-text-geometry'
import type { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

defineOptions({
  name: 'FtTextGeometry',
})

const props = defineProps(textGeometryProps)
const emit = defineEmits(textGeometryEmits)

let scene = useScene()
let obj3d = useObj3d()

let geometry: TextGeometry
useTextGeometry(
  {
    text: props.text,
    url: props.url,
  },
  props.params
).then((res) => {
  geometry = res
  obj3d.geometry = geometry
  if (props.center) {
    geometry.center()
  }
  emit('load', { scene, geometry, obj3d })
  useOptions(props.options, geometry, scene)
})
onBeforeUnmount(() => {
  geometry?.dispose()
  ;(scene as any) = null
  ;(obj3d as any) = null
  ;(geometry as any) = null
})
</script>
