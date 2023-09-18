<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { useOptions, useScene } from '@farst-three/hooks'
import { gLTFLoaderEmits, gLTFLoaderProps } from './g-l-t-f-loader'

defineOptions({
  name: 'FtGLTFLoader',
})

const props = defineProps(gLTFLoaderProps)
const emit = defineEmits(gLTFLoaderEmits)

// init here
let scene = useScene()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath(props.decoderPath)
let gltfLoader = new GLTFLoader()

gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load(
  props.url,
  (gltf) => {
    props.load(gltf)
    scene.add(gltf.scene)
  },
  props.progress,
  props.error
)
emit('load', { scene, gltfLoader })
useOptions(props.options, gltfLoader, scene)

onBeforeUnmount(() => {
  ;(scene as any) = null
  ;(gltfLoader as any) = null
})
</script>
