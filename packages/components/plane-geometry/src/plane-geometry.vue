<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { PlaneGeometry } from 'three'
import { useMesh, useScene } from '@farst-three/hooks'
import { geometryInjectionKey } from '@farst-three/constants/injection'
import { planeGeometryEmits, planeGeometryProps } from './plane-geometry'

defineOptions({
  name: 'FtPlaneGeometry',
})

const props = defineProps(planeGeometryProps)
const emit = defineEmits(planeGeometryEmits)

// init here
let scene = useScene()
let mesh = useMesh()

let planeGeometry = new PlaneGeometry(
  props.width,
  props.height,
  props.widthSegments,
  props.heightSegments
)
mesh.geometry = planeGeometry
emit('load', { geometry: planeGeometry, scene, mesh })
provide(geometryInjectionKey, planeGeometry)

onBeforeUnmount(() => {
  planeGeometry.dispose()
  ;(scene as any) = null
  ;(planeGeometry as any) = null
  ;(mesh as any) = null
})
</script>
