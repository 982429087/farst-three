<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { PlaneGeometry } from 'three'
import { useObj3d, useOptions, useScene } from '@farst-three/hooks'
import { geometryInjectionKey } from '@farst-three/constants/injection'
import { planeGeometryEmits, planeGeometryProps } from './plane-geometry'

defineOptions({
  name: 'FtPlaneGeometry',
})

const props = defineProps(planeGeometryProps)
const emit = defineEmits(planeGeometryEmits)

// init here
let scene = useScene()
let obj3d = useObj3d()

let geometry = new PlaneGeometry(
  props.width,
  props.height,
  props.widthSegments,
  props.heightSegments
)
obj3d.geometry = geometry
emit('load', { geometry, scene, obj3d })
provide(geometryInjectionKey, geometry)
useOptions(props.options, geometry, scene)
onBeforeUnmount(() => {
  geometry.dispose()
  ;(scene as any) = null
  ;(geometry as any) = null
  ;(obj3d as any) = null
})
</script>
