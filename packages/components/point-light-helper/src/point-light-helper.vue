<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { PointLightHelper } from 'three'
import { useOptions, usePointLight, useScene } from '@farst-three/hooks'
import {
  pointLightHelperEmits,
  pointLightHelperProps,
} from './point-light-helper'

defineOptions({
  name: 'FtPointLightHelper',
})

const props = defineProps(pointLightHelperProps)
const emit = defineEmits(pointLightHelperEmits)

let scene = useScene()
let pointLight = usePointLight()
let helper = new PointLightHelper(pointLight, props.sphereSize, props.color)
emit('load', { scene, helper })
useOptions(props.options, helper, scene)
scene.add(helper)
onBeforeUnmount(() => {
  helper.dispose()
  ;(scene as any) = null
  ;(pointLight as any) = null
  ;(helper as any) = null
})
</script>
