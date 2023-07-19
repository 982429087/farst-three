<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { MeshBasicMaterial } from 'three'
import { materialInjectKey } from '@farst-three/constants'
import {
  useMaterialService,
  useMesh,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import {
  meshBasicMaterialEmits,
  meshBasicMaterialProps,
} from './mesh-basic-material'

defineOptions({
  name: 'FtMeshBasicMaterial',
})

const props = defineProps(meshBasicMaterialProps)
const emit = defineEmits(meshBasicMaterialEmits)
let mesh = useMesh()
let scene = useScene()
let materialService = useMaterialService()
let material = new MeshBasicMaterial(props.params)
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
