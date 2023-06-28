<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { WebGLRenderer } from 'three'
import { debounce } from 'lodash-es'
import { useInjection } from '@farst-three/hooks'
import {
  perspectiveCameraInjectionKey,
  sceneInjectionKey,
  sceneRefInjectionKey,
} from '@farst-three/constants/injection'
import { webGLRendererProps, webglRendererEmits } from './webgl-renderer'
import type { Scene } from 'three'

defineOptions({
  name: 'FtWebglRenderer',
})

const props = defineProps(webGLRendererProps)
const emit = defineEmits(webglRendererEmits)

const scene = useInjection<Scene>(sceneInjectionKey)
const container = useInjection<HTMLDivElement>(sceneRefInjectionKey)
// 任何camera都可以
const camera = useInjection<any>(perspectiveCameraInjectionKey)
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
