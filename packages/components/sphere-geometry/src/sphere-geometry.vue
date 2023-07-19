<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { SphereGeometry } from 'three'
import { geometryInjectionKey } from '@farst-three/constants/injection'
import { useMesh, useScene } from '@farst-three/hooks'
import { sphereGeometryEmits, sphereGeometryProps } from './sphere-geometry'

defineOptions({
  name: 'FtSphereGeometry',
})

const props = defineProps(sphereGeometryProps)
const emit = defineEmits(sphereGeometryEmits)

let scene = useScene()
let mesh = useMesh()
let geometry = new SphereGeometry(
  props.radius,
  props.widthSegments,
  props.heightSegments,
  props.phiStart,
  props.phiLength,
  props.thetaStart,
  props.thetaLength
)
mesh.geometry = geometry
mesh.geometry.computeBoundingBox()
emit('load', { geometry, scene, mesh })
provide(geometryInjectionKey, geometry)

onBeforeUnmount(() => {
  geometry.dispose()
  ;(scene as any) = null
  ;(geometry as any) = null
  ;(mesh as any) = null
})
</script>
