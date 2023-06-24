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
const perspectiveCamera = useInjection<PerspectiveCamera>(cameraInjectionKey)

const appendToElement = ref<HTMLDivElement>()
const ns = useNamespace('webgl-renderer')
const renderer = new WebGLRenderer()
onMounted(() => {
  if (appendToElement.value) {
    const container = appendToElement.value
    console.log(container.scrollWidth, container.scrollHeight)
    renderer.setSize(container.scrollWidth, container.scrollHeight)
    container.appendChild(renderer.domElement)
    renderer.render(scene, perspectiveCamera)
    emit('load', renderer)
  }
})
</script>
