<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { LoadingManager, TextureLoader } from 'three'
import { useMaterial, useOptions, useScene } from '@farst-three/hooks'
import { textureLoaderEmits, textureLoaderProps } from './texture-loader'

defineOptions({
  name: 'FtTextureLoader',
})

const props = defineProps(textureLoaderProps)
const emit = defineEmits(textureLoaderEmits)

let material = useMaterial()
let scene = useScene()
let loadingManager = new LoadingManager()
let textureLoader = new TextureLoader(loadingManager)

textureLoader.setCrossOrigin('Anonymous')

if (!props.url) {
  console.error('component `<texture-loader />` props `url` is required')
}

let texture = textureLoader.load(
  props.url,
  props.load,
  props.progress,
  props.error
)
emit('load', { textureLoader, material, scene, texture })

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
if (material) {
  ;(material as any)[props.type] = texture
}

useOptions(props.options, texture, scene)
onBeforeUnmount(() => {
  ;(material as any)[props.type] = null
  texture.dispose()
  ;(material as any) = null
  ;(scene as any) = null
  ;(loadingManager as any) = null
  ;(texture as any) = null
  ;(textureLoader as any) = null
})
</script>
