<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { DirectionalLightHelper } from 'three'
import { useDirectionalLight, useOptions, useScene } from '@farst-three/hooks'
import {
  directionalLightHelperEmits,
  directionalLightHelperProps,
} from './directional-light-helper'

defineOptions({
  name: 'FtDirectionalLightHelper',
})

const props = defineProps(directionalLightHelperProps)
const emit = defineEmits(directionalLightHelperEmits)

// init here
let scene = useScene()
let light = useDirectionalLight()
let helper = new DirectionalLightHelper(light, props.size, props.color)
emit('load', { scene, helper })
useOptions(props.options, helper, scene)
scene.add(helper)
onBeforeUnmount(() => {
  helper.dispose()
  ;(scene as any) = null
  ;(light as any) = null
  ;(helper as any) = null
})
</script>
