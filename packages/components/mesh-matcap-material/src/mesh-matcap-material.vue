<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { MeshMatcapMaterial } from 'three'
import {
  useMaterialService,
  useObj3d,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import {
  meshMatcapMaterialEmits,
  meshMatcapMaterialProps,
} from './mesh-matcap-material'

defineOptions({
  name: 'FtMeshMatcapMaterial',
})

const props = defineProps(meshMatcapMaterialProps)
const emit = defineEmits(meshMatcapMaterialEmits)

// init here
let scene = useScene()
let obj3d = useObj3d()
let materialService = useMaterialService()
let material = new MeshMatcapMaterial(props.params)
materialService.addCount(material)
emit('load', { material, obj3d, scene })
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
