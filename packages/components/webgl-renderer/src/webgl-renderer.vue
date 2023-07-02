<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide, shallowRef } from 'vue'
import { WebGLRenderer } from 'three'
import { debounce } from 'lodash-es'
import { useCamera, useScene, useSceneRef } from '@farst-three/hooks'
import { rendererInjectionKey } from '@farst-three/constants/injection'
import { webGLRendererProps, webglRendererEmits } from './webgl-renderer'

defineOptions({
  name: 'FtWebglRenderer',
})

const props = defineProps(webGLRendererProps)
const emit = defineEmits(webglRendererEmits)

const scene = useScene()
const container = useSceneRef()
const camera = useCamera()
const renderer = new WebGLRenderer(props.params)
renderer.setSize(container.offsetWidth, container.offsetHeight)
container.appendChild(renderer.domElement)

function animate() {
  requestAnimationFrame(animate)
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
provide(rendererInjectionKey, shallowRef(renderer))
</script>
