<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { TorusGeometry } from 'three'
import { useObj3d, useOptions, useScene } from '@farst-three/hooks'
import { geometryInjectionKey } from '@farst-three/constants'
import { torusGeometryEmits, torusGeometryProps } from './torus-geometry'

defineOptions({
  name: 'FtTorusGeometry',
})

const props = defineProps(torusGeometryProps)
const emit = defineEmits(torusGeometryEmits)

// init here
let scene = useScene()
let obj3d = useObj3d()
let geometry = new TorusGeometry(
  props.radius,
  props.tube,
  props.radialSegments,
  props.tubularSegments,
  props.arc
)
obj3d.geometry = geometry
emit('load', { geometry, scene, obj3d })
provide(geometryInjectionKey, geometry)
useOptions(props.options, geometry, scene)

onBeforeUnmount(() => {
  geometry.dispose()
  ;(scene as any) = null
  ;(obj3d as any) = null
  ;(geometry as any) = null
})
</script>
