<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide, watch } from 'vue'
import { WebGLRenderer } from 'three'
import { debounce } from 'lodash-es'
import { isClient } from '@vueuse/core'
import {
  useAnimationService,
  useEventService,
  useOptions,
  useScene,
  useSceneRef,
  useStoreService,
} from '@farst-three/hooks'
import { rendererInjectionKey } from '@farst-three/constants/injection'
import { webGLRendererProps, webglRendererEmits } from './webgl-renderer'
import type { Camera } from 'three'

defineOptions({
  name: 'FtWebglRenderer',
})

const props = defineProps(webGLRendererProps)
const emit = defineEmits(webglRendererEmits)

let scene = useScene()
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
if (!camera) throw new Error('<webgl-renderer /> 没有找到主渲染相机!')

// 事件处理函数
let eventService = useEventService()
let animationService = useAnimationService()
eventService.setCamera(camera)

const dpr = isClient ? window.devicePixelRatio || 1 : 1

let renderer = new WebGLRenderer(props.params)
storeService.setRenderer(renderer)
renderer.setSize(container.offsetWidth, container.offsetHeight)
container.appendChild(renderer.domElement)

if (props.animationFn) animationService.on('propsFn', props.animationFn)

function animate() {
  if (!camera) throw new Error('<webgl-renderer /> 没有找到主渲染相机!')
  // 裁剪逻辑
  if (props.scissor) {
    renderer.setScissorTest(true)
    renderer.setScissor(0, 0, container.offsetWidth, container.offsetHeight)
    renderer.setViewport(0, 0, container.offsetWidth, container.offsetHeight)
    renderer.setClearColor(
      props.scissorClearColor,
      props.scissorClearColorAlpha
    )
    renderer.setPixelRatio(dpr)
    renderer.setSize(container.offsetWidth, container.offsetHeight)
  }
  // 动画处理逻辑
  animationService?.emit({ renderer, scene, camera })
  // 执行事件逻辑
  // eventService.calculate()
  if (!animationService.hasComposer()) renderer?.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

const resize = () => {
  renderer.setSize(container.offsetWidth, container.offsetHeight)
}
const dOb = debounce(() => resize(), 0)
const observer = new ResizeObserver(dOb)
observer.observe(container)

emit('load', { renderer, scene, camera })

provide(rendererInjectionKey, renderer)

useOptions(props.options, renderer, scene)

onBeforeUnmount(() => {
  animationService.off('propsFn')
  observer.unobserve(container)
  container.removeChild(renderer.domElement)
  renderer.forceContextLoss()
  renderer.dispose()
  ;(scene as any) = null
  ;(renderer as any) = null
  ;(eventService as any) = null
  ;(animationService as any) = null
})

defineExpose({
  renderer,
})
</script>
