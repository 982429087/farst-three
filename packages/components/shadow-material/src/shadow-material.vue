<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { ShadowMaterial } from 'three'
import {
  useMaterialService,
  useObj3d,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import { shadowMaterialEmits, shadowMaterialProps } from './shadow-material'

defineOptions({
  name: 'FtShadowMaterial',
})

const props = defineProps(shadowMaterialProps)
const emit = defineEmits(shadowMaterialEmits)

let obj3d = useObj3d()
let scene = useScene()
let materialService = useMaterialService()
let material = new ShadowMaterial(props.params)
materialService.addCount(material)
emit('load', { material, obj3d, scene })
provide(materialInjectKey, material)

useOptions(props.options, material, scene)

onBeforeUnmount(() => {
  materialService.subCount(material)
  material.dispose()
  ;(scene as any) = null
  ;(material as any) = null
  ;(obj3d as any) = null
  ;(materialService as any) = null
})
</script>
