<template>
  <div ref="sceneRef" :class="[ns.b()]">
    <slot v-if="ready" />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { REVISION, Scene } from 'three'
import {
  animationServiceInjectionKey,
  dragServiceInjectionKey,
  eventServiceInjectionKey,
  storeServiceInjectionKey,
} from '@farst-three/constants'
import {
  AnimationService,
  CountService,
  EventService,
  StoreService,
  uesEvent,
  useNamespace,
  useOptions,
} from '@farst-three/hooks'
import { sceneEmits, sceneProps } from './scene'
import type { Object3D } from 'three'

defineOptions({
  name: 'FtScene',
})

const props = defineProps(sceneProps)
const emit = defineEmits(sceneEmits)

const ready = ref(false)
const ns = useNamespace('scene')
const sceneRef = ref<HTMLDivElement>()
const scene = new Scene()
// 拖拽函数
const dragService = new CountService<Object3D>()
// 放入相机和dom和实例
const storeService = new StoreService(scene, sceneRef)
// 处理事件函数
const eventService = new EventService(scene, props.eventOptions)
const animationService = new AnimationService()

emit('load', { scene })

provide(dragServiceInjectionKey, dragService)
provide(storeServiceInjectionKey, storeService)
provide(eventServiceInjectionKey, eventService)
provide(animationServiceInjectionKey, animationService)

useOptions(props.options, scene, scene)

onMounted(() => {
  eventService.setSceneRef(sceneRef)
  uesEvent(props, emit, scene.children, eventService)
  ready.value = true
})

onBeforeUnmount(() => {
  sceneRef.value?.remove()
  scene.clear()
  eventService.destory()
  dragService.clearCount()
})

defineExpose({
  scene,
})

// eslint-disable-next-line no-console
console.log('当前threejs版本号:', REVISION)
</script>
