<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { WebGLRenderer } from 'three'
import { debounce } from 'lodash-es'
import { useCamera, useScene, useSceneRef } from '@farst-three/hooks'
import { webGLRendererProps, webglRendererEmits } from './webgl-renderer'

defineOptions({
  name: 'FtWebglRenderer',
})

const props = defineProps(webGLRendererProps)
const emit = defineEmits(webglRendererEmits)

const scene = useScene()
const container = useSceneRef()
// 任何camera都可以
const camera = useCamera()
const renderer = new WebGLRenderer()
renderer.setSize(container.offsetWidth, container.offsetHeight)
container.appendChild(renderer.domElement)

function animate() {
  requestAnimationFrame(animate)
  props.animationFn?.()
  renderer.render(scene, camera)
}

emit('load', renderer)
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
</script>
