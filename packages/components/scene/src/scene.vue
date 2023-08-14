<template>
  <div ref="sceneRef" :class="[ns.b()]">
    <slot v-if="ready" />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { REVISION, Scene } from 'three'
import { storeServiceInjectionKey } from '@farst-three/constants/injection'
import { StoreService, useNamespace, useOptions } from '@farst-three/hooks'
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

onMounted(() => {
  ready.value = true
})
let storeService = new StoreService(scene, sceneRef)
emit('load', { scene })
provide(storeServiceInjectionKey, storeService)
useOptions(props.options, scene, scene)
// eslint-disable-next-line no-console
console.log('当前threejs版本号:', REVISION)
onBeforeUnmount(() => {
  sceneRef.value?.remove()
  scene.clear()
  ;(scene as any) = null
  ;(storeService as any) = null
})
</script>
