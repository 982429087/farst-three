<template>
  <div ref="appendToElement" :class="[ns.b()]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { WebGLRenderer } from 'three'
import { useInjection, useNamespace } from '@farst-three/hooks'
import {
  cameraInjectionKey,
  sceneInjectionKey,
} from '@farst-three/constants/injection'
import { webGLRendererProps, webglRendererEmits } from './webgl-renderer'
import type { PerspectiveCamera, Scene } from 'three'

defineOptions({
  name: 'FtWebglRenderer',
})

defineProps(webGLRendererProps)
const emit = defineEmits(webglRendererEmits)

const scene = useInjection<Scene>(sceneInjectionKey)
// 任何camera都可以
const camera = useInjection<any>(cameraInjectionKey)
const perspectiveCamera = useInjection<PerspectiveCamera>(cameraInjectionKey)

const appendToElement = ref<HTMLDivElement>()
const ns = useNamespace('webgl-renderer')
const renderer = new WebGLRenderer()

onMounted(() => {
  if (appendToElement.value) {
    const container = appendToElement.value

    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)
    renderer.render(scene, perspectiveCamera)
    emit('load', renderer)
    window.addEventListener('resize', () => {
      if (camera.type === 'PerspectiveCamera') {
        camera.aspect = container.clientWidth / container.clientHeight
        renderer.setSize(container.clientWidth, container.clientHeight)
        camera.updateProjectionMatrix()
      }
    })
  }
})
</script>
