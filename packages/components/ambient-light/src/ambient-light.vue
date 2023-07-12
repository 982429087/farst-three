<template>
  <slot />
</template>

<script lang="ts" setup>
import { AmbientLight } from 'three'
import { useScene } from '@farst-three/hooks'
import { ambientLightEmits, ambientLightProps } from './ambient-light'

defineOptions({
  name: 'FtAmbientLight',
})

const props = defineProps(ambientLightProps)
const emit = defineEmits(ambientLightEmits)

// init here
const secne = useScene()
const ambientLight = new AmbientLight(props.color, props.intensity)
secne.add(ambientLight)
emit('load', { secne, light: ambientLight })
</script>
