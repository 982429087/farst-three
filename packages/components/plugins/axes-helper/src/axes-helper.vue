<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { AxesHelper } from 'three'
import { useScene } from '@farst-three/hooks'
import { axesHelperProps } from './axes-helper'
import type { Scene } from 'three'

defineOptions({
  name: 'FtAxesHelper',
})

const props = defineProps(axesHelperProps)

// init here
let scene: Scene | null = useScene()
let axesHelper: AxesHelper | null = new AxesHelper(props.size)
scene.add(axesHelper)

onBeforeUnmount(() => {
  axesHelper?.dispose()
  axesHelper = null
  scene = null
})
</script>
