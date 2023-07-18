<template>
  <slot />
</template>

<script lang="ts" setup>
import { LoadingManager, TextureLoader } from 'three'
import { useMaterial, useScene } from '@farst-three/hooks'
import { isArray, isString } from '@farst-three/utils'
import { textureLoaderEmits, textureLoaderProps } from './texture-loader'
import type { Texture } from 'three'

defineOptions({
  name: 'FtTextureLoader',
})

const props = defineProps(textureLoaderProps)
const emit = defineEmits(textureLoaderEmits)

const material = useMaterial()
const scene = useScene()
const loadingManager = new LoadingManager()
const textureLoader = new TextureLoader(loadingManager)
const url = []
const textures: Texture[] = []
textureLoader.setCrossOrigin('Anonymous')

emit('load', { textureLoader, material, scene })

if (!props.url) {
  console.error('component `<texture-loader />` props `url` is required')
}

if (isString(props.url)) {
  url.push(props.url)
}

for (const [i, item] of url.entries()) {
  const texture = textureLoader.load(
    item,
    (e) => props.onLoad(e, i),
    (e) => props.onProgress(e, i),
    (e) => props.onError(e, i)
  )
  textures.push(texture, texture)
}

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
if (isArray(material)) {
  material.forEach((item, index) => {
    item[props.type] = textures[index]
  })
} else {
  ;(material as any)[props.type] = textures[0]
}
</script>
