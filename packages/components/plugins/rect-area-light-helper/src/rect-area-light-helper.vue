<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { useOptions, useRectAreaLight, useScene } from '@farst-three/hooks'
import {
  rectAreaLightHelperEmits,
  rectAreaLightHelperProps,
} from './rect-area-light-helper'
defineOptions({
  name: 'FtRectAreaLightHelper',
})

const props = defineProps(rectAreaLightHelperProps)
const emit = defineEmits(rectAreaLightHelperEmits)

// init here
let scene = useScene()
let light = useRectAreaLight()
let helper = new RectAreaLightHelper(light, props.color)
emit('load', { scene })
useOptions(props.options, helper, scene)
scene.add(helper)
onBeforeUnmount(() => {
  light.remove(helper)
  scene.remove(helper)
  helper.dispose()
  ;(scene as any) = null
  ;(light as any) = null
  ;(helper as any) = null
})
</script>
