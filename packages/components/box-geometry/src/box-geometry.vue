<template>
  <slot />
</template>

<script lang="ts" setup>
import { BoxGeometry } from 'three'
import { useInjection } from '@farst-three/hooks'
import { meshInjectionKey } from '@farst-three/constants/injection'
import { boxGeometryProps } from './box-geometry'
import type { Mesh } from 'three'
defineOptions({
  name: 'FtBoxGeometry',
})

defineProps(boxGeometryProps)

// init here
const geometry = new BoxGeometry(1, 1, 1)
const mesh = useInjection<Mesh>(meshInjectionKey)
mesh.geometry = geometry
</script>
