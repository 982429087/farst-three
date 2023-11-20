<template>
  <slot />
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { Audio, AudioListener, AudioLoader } from 'three'
import { useOptions, useScene, useStoreService } from '@farst-three/hooks'
import { audioEmits, audioProps } from './audio'

defineOptions({
  name: 'FtAudio',
})

const props = defineProps(audioProps)
const emit = defineEmits(audioEmits)

// init here
const scene = useScene()
const storeService = useStoreService()

const listener = new AudioListener()
const sound = new Audio(listener)
const audioLoadr = new AudioLoader()

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
</script>
