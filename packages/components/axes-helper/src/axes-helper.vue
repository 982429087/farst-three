<template>
  <slot />
</template>

<script lang="ts" setup>
import { AxesHelper } from 'three'
import { useScene } from '@farst-three/hooks'
import { axesHelperProps } from './axes-helper'

defineOptions({
  name: 'FtAxesHelper',
})

const props = defineProps(axesHelperProps)

// init here
const scene = useScene()
const axesHelper = new AxesHelper(props.size)
scene.add(axesHelper)
</script>
