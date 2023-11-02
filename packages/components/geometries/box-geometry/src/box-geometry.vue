<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { BoxGeometry } from 'three'
import { useObj3d, useOptions, useScene } from '@farst-three/hooks'
import { geometryInjectionKey } from '@farst-three/constants/injection'
import { boxGeometryEmits, boxGeometryProps } from './box-geometry'
defineOptions({
  name: 'FtBoxGeometry',
})

const props = defineProps(boxGeometryProps)
const emit = defineEmits(boxGeometryEmits)

// init here
let obj3d = useObj3d()
let scene = useScene()
let geometry = new BoxGeometry(
  props.width,
  props.height,
  props.depth,
  props.widthSegments,
  props.heightSegments,
  props.depthSegments
)

obj3d.geometry = geometry
obj3d.geometry.computeBoundingBox()
emit('load', { geometry, obj3d, scene })
provide(geometryInjectionKey, geometry)

useOptions(props.options, geometry, scene)

onBeforeUnmount(() => {
  geometry.dispose()
  ;(geometry as any) = null
  ;(obj3d as any) = null
  ;(scene as any) = null
})
</script>
