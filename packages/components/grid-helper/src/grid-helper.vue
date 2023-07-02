<template>
  <slot />
</template>

<script lang="ts" setup>
import { GridHelper } from 'three'
import { useScene } from '@farst-three/hooks'
import { gridHelperProps } from './grid-helper'

defineOptions({
  name: 'FtGridHelper',
})

const props = defineProps(gridHelperProps)

// init here
const gridHelper = new GridHelper(
  props.size,
  props.divisions,
  props.color1,
  props.color2
)
const scene = useScene()
scene.add(gridHelper)
</script>
