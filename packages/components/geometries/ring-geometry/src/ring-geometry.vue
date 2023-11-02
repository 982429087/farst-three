<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { RingGeometry } from 'three'
import { useObj3d, useOptions, useScene } from '@farst-three/hooks'
import { geometryInjectionKey } from '@farst-three/constants'
import { ringGeometryEmits, ringGeometryProps } from './ring-geometry'

defineOptions({
  name: 'FtRingGeometry',
})

const props = defineProps(ringGeometryProps)
const emit = defineEmits(ringGeometryEmits)

// init here
let scene = useScene()
let obj3d = useObj3d()
let geometry = new RingGeometry(
  props.innerRadius,
  props.outerRadius,
  props.thetaSegments,
  props.phiSegments,
  props.thetaStart,
  props.thetaLength
)
emit('load', { scene, geometry, obj3d })
useOptions(props.options, geometry, scene)
obj3d.geometry = geometry
obj3d.geometry.computeBoundingBox()
provide(geometryInjectionKey, geometry)
onBeforeUnmount(() => {
  geometry.dispose()
  ;(scene as any) = null
  ;(geometry as any) = null
  ;(obj3d as any) = null
})
</script>
