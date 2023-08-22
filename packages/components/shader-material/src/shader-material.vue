<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { ShaderMaterial } from 'three'
import {
  useMaterialService,
  useObj3d,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import { shaderMaterialEmits, shaderMaterialProps } from './shader-material'

defineOptions({
  name: 'FtShaderMaterial',
})

const props = defineProps(shaderMaterialProps)
const emit = defineEmits(shaderMaterialEmits)

// init here
const obj3d = useObj3d()
let scene = useScene()
let materialService = useMaterialService()
let material = new ShaderMaterial(props.params)
materialService.addCount(material)
emit('load', { scene, material, obj3d })
useOptions(props.options, material, scene)
provide(materialInjectKey, material)

onBeforeUnmount(() => {
  materialService.subCount(material)
  material.dispose()
  ;(scene as any) = null
  ;(materialService as any) = null
  ;(material as any) = null
})
</script>
