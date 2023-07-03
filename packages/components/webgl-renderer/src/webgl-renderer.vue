<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide, watch } from 'vue'
import { WebGLRenderer } from 'three'
import { debounce } from 'lodash-es'
import { useScene, useSceneRef, useStoreService } from '@farst-three/hooks'
import { rendererInjectionKey } from '@farst-three/constants/injection'
import { webGLRendererProps, webglRendererEmits } from './webgl-renderer'
import type { Camera } from 'three'

defineOptions({
  name: 'FtWebglRenderer',
})

const props = defineProps(webGLRendererProps)
const emit = defineEmits(webglRendererEmits)

const scene = useScene()
const container = useSceneRef()
const storeService = useStoreService()
let camera: Camera | undefined = storeService.getRenderCamera()

watch(
  () => storeService.renderCamera.value,
  (v) => {
    if (v) camera = v
  },
  { immediate: true }
)
if (!camera) throw new Error('RenderCamera is not defined')

const renderer = new WebGLRenderer(props.params)
renderer.setSize(container.offsetWidth, container.offsetHeight)
container.appendChild(renderer.domElement)

function animate() {
  requestAnimationFrame(animate)
  if (!camera) throw new Error('RenderCamera is not defined')
  props.animationFn?.({ renderer, scene, camera })
  renderer.render(scene, camera)
}

animate()
const resize = () => {
  renderer.setSize(container.offsetWidth, container.offsetHeight)
}
const dOb = debounce(() => resize(), 10)
const observer = new ResizeObserver(dOb)
observer.observe(container)
onBeforeUnmount(() => {
  observer.unobserve(container)
  container.removeChild(renderer.domElement)
  renderer.dispose()
})
emit('load', { renderer, scene, camera })
provide(rendererInjectionKey, renderer)
</script>
