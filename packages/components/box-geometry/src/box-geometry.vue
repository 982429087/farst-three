<template>
  <slot />
</template>

<script lang="ts" setup>
import { BoxGeometry } from 'three'
import { useInjection } from '@farst-three/hooks'
import { meshInjectionKey } from '@farst-three/constants/injection'
import { boxGeometryEmits, boxGeometryProps } from './box-geometry'
import type { Mesh } from 'three'
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
emit('load', geometry)
const mesh = useInjection<Mesh>(meshInjectionKey)
mesh.geometry = geometry
</script>
