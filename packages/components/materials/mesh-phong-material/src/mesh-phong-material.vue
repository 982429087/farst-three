<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { MeshPhongMaterial } from 'three'
import {
  useMaterialService,
  useObj3d,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import {
  meshPhongMaterialEmits,
  meshPhongMaterialProps,
} from './mesh-phong-material'

defineOptions({
  name: 'FtMeshPhongMaterial',
})

const props = defineProps(meshPhongMaterialProps)
const emit = defineEmits(meshPhongMaterialEmits)

// init here
let obj3d = useObj3d()
let scene = useScene()
let materialService = useMaterialService()
let material = new MeshPhongMaterial(props.params)
materialService.addCount(material)
emit('load', { material, obj3d, scene })
provide(materialInjectKey, material)

useOptions(props.options, material, scene)

onBeforeUnmount(() => {
  materialService.subCount(material)
  material.dispose()
  ;(scene as any) = null
  ;(material as any) = null
  ;(obj3d as any) = null
  ;(materialService as any) = null
})
</script>
