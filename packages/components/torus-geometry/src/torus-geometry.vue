<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { TorusGeometry } from 'three'
import { useMesh, useOptions, useScene } from '@farst-three/hooks'
import { geometryInjectionKey } from '@farst-three/constants'
import { torusGeometryEmits, torusGeometryProps } from './torus-geometry'

defineOptions({
  name: 'FtTorusGeometry',
})

const props = defineProps(torusGeometryProps)
const emit = defineEmits(torusGeometryEmits)

// init here
let scene = useScene()
let mesh = useMesh()
let geometry = new TorusGeometry(
  props.radius,
  props.tube,
  props.radialSegments,
  props.tubularSegments,
  props.arc
)
mesh.geometry = geometry
emit('load', { geometry, scene, mesh })
provide(geometryInjectionKey, geometry)
useOptions(props.options, geometry, scene)

onBeforeUnmount(() => {
  geometry.dispose()
  ;(scene as any) = null
  ;(mesh as any) = null
  ;(geometry as any) = null
})
</script>
