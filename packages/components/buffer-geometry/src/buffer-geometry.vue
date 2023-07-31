<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { BufferGeometry } from 'three'
import { useObj3d, useOptions, useScene } from '@farst-three/hooks'
import { geometryInjectionKey } from '@farst-three/constants'
import { bufferGeometryEmits, bufferGeometryProps } from './buffer-geometry'

defineOptions({
  name: 'FtBufferGeometry',
})

const props = defineProps(bufferGeometryProps)
const emit = defineEmits(bufferGeometryEmits)

// init here
let obj3d = useObj3d()
let scene = useScene()

let geometry = new BufferGeometry()

emit('load', { geometry, obj3d, scene })
provide(geometryInjectionKey, geometry)

useOptions(props.options, geometry, scene)
obj3d.geometry = geometry
obj3d.geometry.computeBoundingBox()
onBeforeUnmount(() => {
  geometry.dispose()
  ;(geometry as any) = null
  ;(obj3d as any) = null
  ;(scene as any) = null
})
</script>
