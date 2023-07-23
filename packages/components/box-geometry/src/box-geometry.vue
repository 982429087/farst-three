<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { BoxGeometry } from 'three'
import { useMesh, useOptions, useScene } from '@farst-three/hooks'
import { geometryInjectionKey } from '@farst-three/constants/injection'
import { boxGeometryEmits, boxGeometryProps } from './box-geometry'
defineOptions({
  name: 'FtBoxGeometry',
})

const props = defineProps(boxGeometryProps)
const emit = defineEmits(boxGeometryEmits)

// init here
let mesh = useMesh()
let scene = useScene()
let geometry = new BoxGeometry(
  props.width,
  props.height,
  props.depth,
  props.widthSegments,
  props.heightSegments,
  props.depthSegments
)

mesh.geometry = geometry
mesh.geometry.computeBoundingBox()
emit('load', { geometry, mesh, scene })
provide(geometryInjectionKey, geometry)

useOptions(props.options, geometry, scene)

onBeforeUnmount(() => {
  geometry.dispose()
  ;(geometry as any) = null
  ;(mesh as any) = null
  ;(scene as any) = null
})
</script>
