<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { ShadowMaterial } from 'three'
import {
  useMaterialService,
  useMesh,
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

let mesh = useMesh()
let scene = useScene()
let materialService = useMaterialService()
let material = new ShadowMaterial(props.params)
materialService.addCount(material)
emit('load', { material, mesh, scene })
provide(materialInjectKey, material)

useOptions(props.options, material, scene)

onBeforeUnmount(() => {
  materialService.subCount(material)
  material.dispose()
  ;(scene as any) = null
  ;(material as any) = null
  ;(mesh as any) = null
  ;(materialService as any) = null
})
</script>
