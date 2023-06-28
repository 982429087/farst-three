<template>
  <div ref="sceneRef" :class="[ns.b()]">
    <slot v-if="ready" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref, shallowRef } from 'vue'
import { Scene } from 'three'
import {
  sceneInjectionKey,
  sceneRefInjectionKey,
} from '@farst-three/constants/injection'
import { useNamespace } from '@farst-three/hooks'
// import { sceneProps } from './scene'

defineOptions({
  name: 'FtScene',
})

// defineProps(sceneProps)

// init here
const ready = ref(false)
const ns = useNamespace('scene')
const sceneRef = ref<HTMLDivElement>()
const scene = new Scene()
provide(sceneInjectionKey, shallowRef(scene))
provide(sceneRefInjectionKey, sceneRef)

onMounted(() => {
  ready.value = true
})
</script>
