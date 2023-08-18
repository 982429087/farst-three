<template>
  <div ref="sceneRef" :class="[ns.b()]">
    <slot v-if="ready" />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { Scene } from 'three'
import {
  eventServiceInjectionKey,
  storeServiceInjectionKey,
} from '@farst-three/constants'
import {
  EventService,
  StoreService,
  useNamespace,
  useOptions,
} from '@farst-three/hooks'
import { sceneEmits, sceneProps } from './scene'

defineOptions({
  name: 'FtScene',
})

const props = defineProps(sceneProps)
const emit = defineEmits(sceneEmits)

const ready = ref(false)
const ns = useNamespace('scene')
const sceneRef = ref<HTMLDivElement>()
let scene = new Scene()

let storeService = new StoreService(scene, sceneRef)
// 处理事件函数
let eventService = new EventService(scene, props.eventOptions)
emit('load', { scene })
provide(storeServiceInjectionKey, storeService)
provide(eventServiceInjectionKey, eventService)
useOptions(props.options, scene, scene)

onMounted(() => {
  eventService.setSceneRef(sceneRef)
  ready.value = true
})

onBeforeUnmount(() => {
  sceneRef.value?.remove()
  scene.clear()
  eventService.destory()
  ;(scene as any) = null
  ;(eventService as any) = null
  ;(storeService as any) = null
})

// eslint-disable-next-line no-console
// console.log('当前threejs版本号:', REVISION)
</script>
