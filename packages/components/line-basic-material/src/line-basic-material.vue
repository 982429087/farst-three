<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { LineBasicMaterial } from 'three'
import {
  useMaterialService,
  useMesh,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import {
  lineBasicMaterialEmits,
  lineBasicMaterialProps,
} from './line-basic-material'

defineOptions({
  name: 'FtLineBasicMaterial',
})

const props = defineProps(lineBasicMaterialProps)
const emit = defineEmits(lineBasicMaterialEmits)

// init here
let mesh = useMesh()
let scene = useScene()
let materialService = useMaterialService()
let material = new LineBasicMaterial(props.params)
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
