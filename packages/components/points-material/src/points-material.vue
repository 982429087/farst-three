<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { PointsMaterial } from 'three'
import {
  useMaterialService,
  useObj3d,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import { pointsMaterialEmits, pointsMaterialProps } from './points-material'

defineOptions({
  name: 'FtPointsMaterial',
})

const props = defineProps(pointsMaterialProps)
const emit = defineEmits(pointsMaterialEmits)

// init here
let scene = useScene()
let obj3d = useObj3d()
let materialService = useMaterialService()
let material = new PointsMaterial(props.params)

materialService.addCount(material)
emit('load', { material, obj3d, scene })
provide(materialInjectKey, material)

useOptions(props.options, material, scene)

onBeforeUnmount(() => {
  material.dispose()
  ;(scene as any) = null
  ;(obj3d as any) = null
  ;(material as any) = null
  ;(materialService as any) = null
})
</script>
