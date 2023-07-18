<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { BoxGeometry } from 'three'
import { useMesh } from '@farst-three/hooks'
import { geometryInjectionKey } from '@farst-three/constants/injection'
import { boxGeometryEmits, boxGeometryProps } from './box-geometry'
import type { Mesh } from 'three'
defineOptions({
  name: 'FtBoxGeometry',
})

const props = defineProps(boxGeometryProps)
const emit = defineEmits(boxGeometryEmits)

// init here
let geometry: BoxGeometry | null = new BoxGeometry(
  props.width,
  props.height,
  props.depth,
  props.widthSegments,
  props.heightSegments,
  props.depthSegments
)

let mesh: Mesh | null = useMesh()
mesh.geometry = geometry
mesh.geometry.computeBoundingBox()
emit('load', geometry)
provide(geometryInjectionKey, geometry)

onBeforeUnmount(() => {
  geometry?.dispose()
  geometry = null
  mesh = null
})
</script>
