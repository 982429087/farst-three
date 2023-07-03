<template>
  <div ref="sceneRef" :class="[ns.b()]">
    <slot v-if="ready" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from 'vue'
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
const scene = new Scene()

onMounted(() => {
  ready.value = true
})
const storeService = new StoreService(scene, sceneRef)
provide(storeServiceInjectionKey, storeService)
</script>
