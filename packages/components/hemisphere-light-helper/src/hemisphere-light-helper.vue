<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { HemisphereLightHelper } from 'three'
import { useHemisphereLight, useOptions, useScene } from '@farst-three/hooks'
import {
  hemisphereLightHelperEmits,
  hemisphereLightHelperProps,
} from './hemisphere-light-helper'

defineOptions({
  name: 'FtHemisphereLightHelper',
})

const props = defineProps(hemisphereLightHelperProps)
const emit = defineEmits(hemisphereLightHelperEmits)

// init here
let scene = useScene()
let light = useHemisphereLight()
let helper = new HemisphereLightHelper(light, props.size, props.color)
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
