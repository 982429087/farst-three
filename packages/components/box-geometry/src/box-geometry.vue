<template>
  <slot />
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { BoxGeometry } from 'three'
import { useMesh } from '@farst-three/hooks'
import { geometryInjectionKey } from '@farst-three/constants/injection'
import { boxGeometryEmits, boxGeometryProps } from './box-geometry'
defineOptions({
  name: 'FtBoxGeometry',
})

const props = defineProps(boxGeometryProps)
const emit = defineEmits(boxGeometryEmits)

// init here
const geometry = new BoxGeometry(
  props.width,
  props.height,
  props.depth,
  props.widthSegments,
  props.heightSegments,
  props.depthSegments
)

const mesh = useMesh()
mesh.geometry = geometry
mesh.geometry.computeBoundingBox()
emit('load', geometry)
provide(geometryInjectionKey, geometry)
</script>
