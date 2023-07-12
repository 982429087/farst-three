<template>
  <slot />
</template>

<script lang="ts" setup>
import { PointLight } from 'three'
import { useScene } from '@farst-three/hooks'
import { pointLightEmits, pointLightProps } from './point-light'

defineOptions({
  name: 'FtPointLight',
})

const props = defineProps(pointLightProps)
const emit = defineEmits(pointLightEmits)

// init here
const scene = useScene()
const pointLight = new PointLight(
  props.color,
  props.intensity,
  props.distance,
  props.decay
)
scene.add(pointLight)
emit('load', { scene, light: pointLight })
</script>
