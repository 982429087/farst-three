<template>
  <div ref="sceneRef" :class="[ns.b()]">
    <slot v-if="ready" />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { Scene } from 'three'
import { storeServiceInjectionKey } from '@farst-three/constants/injection'
import { StoreService, useNamespace } from '@farst-three/hooks'

defineOptions({
  name: 'FtScene',
})

// defineProps(sceneProps)

// init here
const ready = ref(false)
const ns = useNamespace('scene')
const sceneRef = ref<HTMLDivElement>()
let scene = new Scene()

onMounted(() => {
  ready.value = true
})
let storeService = new StoreService(scene, sceneRef)
provide(storeServiceInjectionKey, storeService)

onBeforeUnmount(() => {
  sceneRef.value?.remove()
  scene.clear()
  ;(scene as any) = null
  ;(storeService as any) = null
})
</script>
