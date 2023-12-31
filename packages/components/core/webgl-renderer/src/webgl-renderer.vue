<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { WebGLRenderer } from 'three'
import {
  useAnimationService,
  useContainer,
  useEventService,
  useOptions,
  useScene,
  useStoreService,
} from '@farst-three/hooks'
import { webGLRendererProps, webglRendererEmits } from './webgl-renderer'
import type { Camera } from 'three'

defineOptions({
  name: 'FtWebglRenderer',
})

const props = defineProps(webGLRendererProps)
const emit = defineEmits(webglRendererEmits)

let scene = useScene()
let container = useContainer()
let storeService = useStoreService()
let eventService = useEventService()
let animationService = useAnimationService()
let camera: Camera | undefined = storeService.getRenderCamera()

watch(
  () => storeService.renderCamera.value,
  (v) => {
    if (v) {
      camera = v
      eventService.setCamera(camera)
    }
  },
  { immediate: true }
)
if (!camera) throw new Error('<webgl-renderer /> 没有找到主渲染相机!')

const renderer = new WebGLRenderer(props.params)

storeService.setRenderer(renderer)
renderer.setSize(container.offsetWidth, container.offsetHeight)
container.appendChild(renderer.domElement)

if (props.animationFn) animationService.on('propsFn', props.animationFn)

function animate() {
  if (camera) {
    animationService.emit({ renderer, scene, camera })
    if (!animationService.noRender) renderer.render(scene, camera)
  }
  requestAnimationFrame(animate)
}

animate()

const resize = () => {
  renderer.setSize(container.offsetWidth, container.offsetHeight)
}
const observer = new ResizeObserver(resize)
observer.observe(container)

emit('load', { renderer, scene, camera })
useOptions(props.options, renderer, scene)

onBeforeUnmount(() => {
  if (props.animationFn) animationService.off('propsFn')
  observer.unobserve(container)
  observer.disconnect()
  container.removeChild(renderer.domElement)
  renderer.forceContextLoss()
  renderer.dispose()
  ;(scene as any) = null
  ;(container as any) = null
  ;(storeService as any) = null
  ;(eventService as any) = null
  ;(animationService as any) = null
  ;(camera as any) = null
})

defineExpose({
  renderer,
})
</script>
