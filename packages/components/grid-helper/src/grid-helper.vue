<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { GridHelper } from 'three'
import { useScene } from '@farst-three/hooks'
import { gridHelperProps } from './grid-helper'
import type { Scene } from 'three'

defineOptions({
  name: 'FtGridHelper',
})

const props = defineProps(gridHelperProps)

// init here
let scene: Scene | null = useScene()
let gridHelper: GridHelper | null = new GridHelper(
  props.size,
  props.divisions,
  props.color1,
  props.color2
)

scene.add(gridHelper)

onBeforeUnmount(() => {
  gridHelper?.dispose()
  gridHelper = null
  scene = null
})
</script>
