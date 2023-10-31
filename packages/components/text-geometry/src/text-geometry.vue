<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { useObj3d, useOptions, useScene } from '@farst-three/hooks'
import { textGeometryEmits, textGeometryProps } from './text-geometry'

defineOptions({
  name: 'FtTextGeometry',
})

const props = defineProps(textGeometryProps)
const emit = defineEmits(textGeometryEmits)

// init here
let scene = useScene()
let obj3d = useObj3d()
const loader = new FontLoader()
let geometry: TextGeometry

loader.load(props.url, (font) => {
  const params = props.params ? { ...props.params, font } : { font }
  geometry = new TextGeometry(props.text, params)
  obj3d.geometry = geometry
  if (props.center) {
    geometry.center()
  }
  emit('load', { scene, geometry, obj3d })
  useOptions(props.options, geometry, scene)
})

onBeforeUnmount(() => {
  geometry?.dispose()
  ;(scene as any) = null
  ;(obj3d as any) = null
  ;(geometry as any) = null
})
</script>
