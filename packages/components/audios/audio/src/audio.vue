<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, watch } from 'vue'
import { Audio, AudioListener, AudioLoader } from 'three'
import { useOptions, useScene, useStoreService } from '@farst-three/hooks'
import { audioEmits, audioProps } from './audio'

defineOptions({
  name: 'FtAudio',
})

const props = defineProps(audioProps)
const emit = defineEmits(audioEmits)

// init here
let scene = useScene()
let storeService = useStoreService()

let listener = new AudioListener()
let sound = new Audio(listener)
let audioLoadr = new AudioLoader()

audioLoadr.load(props.url, (buffer) => {
  props.bufferOnload(sound, buffer)
})
watch(
  () => storeService.renderCamera.value,
  (v) => {
    if (v) v.add(listener)
  },
  { immediate: true }
)
emit('load', { scene })
useOptions(props.options, sound, scene)

onBeforeUnmount(() => {
  ;(scene as any) = null
  ;(storeService as any) = null
  ;(listener as any) = null
  ;(sound as any) = null
  ;(audioLoadr as any) = null
})
</script>
