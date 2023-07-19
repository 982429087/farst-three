<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { CylinderGeometry } from 'three'
import { useMesh, useOptions, useScene } from '@farst-three/hooks'
import { geometryInjectionKey } from '@farst-three/constants'
import {
  cylinderGeometryEmits,
  cylinderGeometryProps,
} from './cylinder-geometry'

defineOptions({
  name: 'FtCylinderGeometry',
})

const props = defineProps(cylinderGeometryProps)
const emit = defineEmits(cylinderGeometryEmits)

// init here
let scene = useScene()
let mesh = useMesh()
let geometry = new CylinderGeometry(
  props.radiusTop,
  props.radiusBottom,
  props.height,
  props.radialSegments,
  props.heightSegments,
  props.openEnded,
  props.thetaStart,
  props.thetaLength
)
mesh.geometry = geometry
mesh.geometry.computeBoundingBox()
emit('load', { geometry, mesh, scene })
provide(geometryInjectionKey, geometry)

useOptions(props.options, geometry, scene)

onBeforeUnmount(() => {
  geometry.dispose()
  ;(scene as any) = null
  ;(mesh as any) = null
  ;(geometry as any) = null
})
</script>
