<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { SpotLightHelper } from 'three'
import { useOptions, useScene, useSpotLight } from '@farst-three/hooks'
import { spotLightHelperEmits, spotLightHelperProps } from './spot-light-helper'

defineOptions({
  name: 'FtSpotLightHelper',
})

const props = defineProps(spotLightHelperProps)
const emit = defineEmits(spotLightHelperEmits)

// init here
let scene = useScene()
let light = useSpotLight()
let helper = new SpotLightHelper(light, props.color)
emit('load', { scene, helper, light })
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
