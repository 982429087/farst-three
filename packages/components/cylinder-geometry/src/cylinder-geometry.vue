<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { CylinderGeometry } from 'three'
import { useObj3d, useOptions, useScene } from '@farst-three/hooks'
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
let obj3d = useObj3d()
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
obj3d.geometry = geometry
obj3d.geometry.computeBoundingBox()
emit('load', { geometry, obj3d, scene })
provide(geometryInjectionKey, geometry)

useOptions(props.options, geometry, scene)

onBeforeUnmount(() => {
  geometry.dispose()
  ;(scene as any) = null
  ;(obj3d as any) = null
  ;(geometry as any) = null
})
</script>
