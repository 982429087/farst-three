<template>
  <slot />
</template>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount } from 'vue'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { LoadingManager } from 'three'
import { useMaterial, useOptions, useScene } from '@farst-three/hooks'
import { rgbeLoaderEmits, rgbeLoaderProps } from './rgbe-loader'

defineOptions({
  name: 'FtRgbeLoader',
})

const props = defineProps(rgbeLoaderProps)
const emit = defineEmits(rgbeLoaderEmits)

// init here
let scene = useScene()
let material = useMaterial()
let loadingManager = new LoadingManager()
let rgbeLoader = new RGBELoader(loadingManager)
rgbeLoader.setCrossOrigin('Anonymous')

if (!props.url) {
  console.error('component `<texture-loader />` props `url` is required')
}

let texture = rgbeLoader.load(
  props.url,
  props.load,
  props.progress,
  props.error
)

emit('load', { rgbeLoader, material, scene, texture })
loadingManager.onStart = (url: string, loaded: number, total: number) => {
  emit('managerStart', url, loaded, total)
}
loadingManager.onLoad = () => {
  emit('managerLoad')
}
loadingManager.onProgress = (url: string, loaded: number, total: number) => {
  emit('managerProgress', url, loaded, total)
}
loadingManager.onError = (url: string) => {
  emit('managerError', url)
}
useOptions(props.options, texture, scene)
nextTick(() => {
  if (material) {
    ;(material as any)[props.type] = texture
  }
})
onBeforeUnmount(() => {
  texture.dispose()
  ;(material as any)[props.type] = null
  ;(material as any) = null
  ;(scene as any) = null
  ;(loadingManager as any) = null
  ;(texture as any) = null
  ;(rgbeLoader as any) = null
})
</script>
