<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { MeshStandardMaterial } from 'three'
import {
  useMaterialService,
  useObj3d,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import {
  meshStandardMaterialEmits,
  meshStandardMaterialProps,
} from './mesh-standard-material'

defineOptions({
  name: 'FtMeshStandardMaterial',
})

const props = defineProps(meshStandardMaterialProps)
const emit = defineEmits(meshStandardMaterialEmits)

// init here
let scene = useScene()
let materialService = useMaterialService()
let material = new MeshStandardMaterial(props.params)
let obj3d = useObj3d()
materialService.addCount(material)

emit('load', { scene, material, obj3d })
provide(materialInjectKey, material)

useOptions(props.options, material, scene)

onBeforeUnmount(() => {
  materialService.subCount(material)
  material.dispose()
  ;(scene as any) = null
  ;(material as any) = null
  ;(materialService as any) = null
  ;(obj3d as any) = null
})
</script>
