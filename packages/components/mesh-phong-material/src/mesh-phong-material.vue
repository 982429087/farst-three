<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { MeshPhongMaterial } from 'three'
import {
  useMaterialService,
  useMesh,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import {
  meshPhongMaterialEmits,
  meshPhongMaterialProps,
} from './mesh-phong-material'

defineOptions({
  name: 'FtMeshPhong-material',
})

const props = defineProps(meshPhongMaterialProps)
const emit = defineEmits(meshPhongMaterialEmits)

// init here
let mesh = useMesh()
let scene = useScene()
let materialService = useMaterialService()
let material = new MeshPhongMaterial(props.params)
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
