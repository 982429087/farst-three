<template>
  <slot />
</template>

<script lang="ts" setup>
import { provide, shallowRef } from 'vue'
import { BoxGeometry } from 'three'
import { useMesh } from '@farst-three/hooks'
import { boxGeometryInjectionKey } from '@farst-three/constants/injection'
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
emit('load', geometry)
provide(boxGeometryInjectionKey, shallowRef(geometry))
</script>
