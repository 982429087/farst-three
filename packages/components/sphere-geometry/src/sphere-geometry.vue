<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { SphereGeometry } from 'three'
import { geometryInjectionKey } from '@farst-three/constants/injection'
import { useMesh, useScene } from '@farst-three/hooks'
import { sphereGeometryEmits, sphereGeometryProps } from './sphere-geometry'

defineOptions({
  name: 'FtSphereGeometry',
})

const props = defineProps(sphereGeometryProps)
const emit = defineEmits(sphereGeometryEmits)

// init here
const scene = useScene()
const mesh = useMesh()
const geometry = new SphereGeometry(
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
</script>
