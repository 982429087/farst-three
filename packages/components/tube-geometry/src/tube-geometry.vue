<template>
  <slot />
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { TubeGeometry } from 'three'
import { useMesh, useScene } from '@farst-three/hooks'
import { geometryInjectionKey } from '@farst-three/constants/injection'
import { tubeGeometryEmits, tubeGeometryProps } from './tube-geometry'

defineOptions({
  name: 'FtTubeGeometry',
})

const props = defineProps(tubeGeometryProps)
const emit = defineEmits(tubeGeometryEmits)

// init here
const geometry = new TubeGeometry(
  props.path,
  props.tubularSegments,
  props.radius,
  props.radialSegments,
  props.closed
)
const mesh = useMesh()
const scene = useScene()
mesh.geometry = geometry
mesh.geometry.computeBoundingBox()
emit('load', { geometry, mesh, scene })
provide(geometryInjectionKey, geometry)
</script>
