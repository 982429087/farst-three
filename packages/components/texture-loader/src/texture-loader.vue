<template>
  <slot />
</template>

<script lang="ts" setup>
import { LoadingManager, TextureLoader } from 'three'
import { useMaterial } from '@farst-three/hooks'
import { textureLoaderEmits, textureLoaderProps } from './texture-loader'

defineOptions({
  name: 'FtTextureLoader',
})

const props = defineProps(textureLoaderProps)
const emit = defineEmits(textureLoaderEmits)

const material = useMaterial()
const loadingManager = new LoadingManager()
const textureLoader = new TextureLoader(loadingManager)
textureLoader.setCrossOrigin('Anonymous')
textureLoader.load(props.url, props.onLoad, props.onProgress, props.onError)

loadingManager.onStart = (url: string, loaded: number, total: number) => {
  emit('start', url, loaded, total)
}
loadingManager.onLoad = () => {
  emit('load')
}
loadingManager.onProgress = (url: string, loaded: number, total: number) => {
  emit('progress', url, loaded, total)
}
loadingManager.onError = (url: string) => {
  emit('error', url)
}
if ((material as any)[props.type]) {
  ;(material as any)[props.type] = textureLoader
}
</script>
