<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { MeshStandardMaterial } from 'three'
import {
  useMaterialService,
  useMesh,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import {
  meshStandardMaterialEmits,
  meshStandardMaterialProps,
} from './mesh-standard-material'

defineOptions({
  name: 'FtMeshStandard-material',
})

const props = defineProps(meshStandardMaterialProps)
const emit = defineEmits(meshStandardMaterialEmits)

// init here
let scene = useScene()
let materialService = useMaterialService()
let material = new MeshStandardMaterial(props.params)
let mesh = useMesh()
materialService.addCount(material)

emit('load', { scene, material, mesh })
provide(materialInjectKey, material)

useOptions(props.options, material, scene)

onBeforeUnmount(() => {
  materialService.subCount(material)
  material.dispose()
  ;(scene as any) = null
  ;(material as any) = null
  ;(materialService as any) = null
  ;(mesh as any) = null
})
</script>
