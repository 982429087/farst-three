<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useOptions, useScene } from '@farst-three/hooks'
import { gLTFLoaderEmits, gLTFLoaderProps } from './g-l-t-f-loader'

defineOptions({
  name: 'FtGLTFLoader',
})

const props = defineProps(gLTFLoaderProps)
const emit = defineEmits(gLTFLoaderEmits)

// init here
let scene = useScene()
let fltfLoader = new GLTFLoader()
fltfLoader.load(
  props.url,
  (gltf) => {
    props.load(gltf)
    scene.add(gltf.scene)
  },
  props.progress,
  props.error
)
emit('load', { scene, fltfLoader })
useOptions(props.options, fltfLoader, scene)

onBeforeUnmount(() => {
  ;(scene as any) = null
  ;(fltfLoader as any) = null
})
</script>
