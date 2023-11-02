<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { SpriteMaterial } from 'three'
import {
  useMaterialService,
  useObj3d,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import { spriteMaterialEmits, spriteMaterialProps } from './sprite-material'

defineOptions({
  name: 'FtSpriteMaterial',
})

const props = defineProps(spriteMaterialProps)
const emit = defineEmits(spriteMaterialEmits)

// init here
let scene = useScene()
let obj3d = useObj3d()
let materialService = useMaterialService()
let material = new SpriteMaterial(props.params)
materialService.addCount(material)
emit('load', { scene, obj3d, material })
provide(materialInjectKey, material)
useOptions(props.options, material, scene)

onBeforeUnmount(() => {
  materialService.subCount(material)
  material.dispose()
  ;(scene as any) = null
  ;(obj3d as any) = null
  ;(materialService as any) = null
  ;(material as any) = null
})
</script>
