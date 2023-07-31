<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { SphereGeometry } from 'three'
import { geometryInjectionKey } from '@farst-three/constants/injection'
import { useObj3d, useScene } from '@farst-three/hooks'
import { sphereGeometryEmits, sphereGeometryProps } from './sphere-geometry'

defineOptions({
  name: 'FtSphereGeometry',
})

const props = defineProps(sphereGeometryProps)
const emit = defineEmits(sphereGeometryEmits)

let scene = useScene()
let obj3d = useObj3d()
let geometry = new SphereGeometry(
  props.radius,
  props.widthSegments,
  props.heightSegments,
  props.phiStart,
  props.phiLength,
  props.thetaStart,
  props.thetaLength
)
obj3d.geometry = geometry
obj3d.geometry.computeBoundingBox()
emit('load', { geometry, scene, obj3d })
provide(geometryInjectionKey, geometry)

onBeforeUnmount(() => {
  geometry.dispose()
  ;(scene as any) = null
  ;(geometry as any) = null
  ;(obj3d as any) = null
})
</script>
