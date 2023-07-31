<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { TubeGeometry } from 'three'
import { useObj3d, useScene } from '@farst-three/hooks'
import { geometryInjectionKey } from '@farst-three/constants/injection'
import { tubeGeometryEmits, tubeGeometryProps } from './tube-geometry'

defineOptions({
  name: 'FtTubeGeometry',
})

const props = defineProps(tubeGeometryProps)
const emit = defineEmits(tubeGeometryEmits)

// init here
let obj3d = useObj3d()
let scene = useScene()
let geometry = new TubeGeometry(
  props.path,
  props.tubularSegments,
  props.radius,
  props.radialSegments,
  props.closed
)

obj3d.geometry = geometry
obj3d.geometry.computeBoundingBox()
emit('load', { geometry, obj3d, scene })
provide(geometryInjectionKey, geometry)

onBeforeUnmount(() => {
  geometry.dispose()
  ;(scene as any) = null
  ;(obj3d as any) = null
  ;(geometry as any) = null
})
</script>
