<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { CubeTextureLoader, LoadingManager } from 'three'
import { useMaterial, useOptions, useScene } from '@farst-three/hooks'
import { isEmpty } from '@farst-three/utils'
import {
  cubeTextureLoaderEmits,
  cubeTextureLoaderProps,
} from './cube-texture-loader'

defineOptions({
  name: 'FtTextureLoader',
})

const props = defineProps(cubeTextureLoaderProps)
const emit = defineEmits(cubeTextureLoaderEmits)

let material = useMaterial()
let scene = useScene()
let loadingManager = new LoadingManager()
let cubeTextureLoader = new CubeTextureLoader(loadingManager)

cubeTextureLoader.setCrossOrigin('Anonymous')

if (isEmpty(props.urls)) {
  console.error('component `<cube-texture-loader />` props `url` is required')
}

let texture = cubeTextureLoader.load(
  props.urls,
  props.load,
  props.progress,
  props.error
)
emit('load', { cubeTextureLoader, material, scene, texture })

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
  ;(cubeTextureLoader as any) = null
})
</script>
./cube-texture-loader
