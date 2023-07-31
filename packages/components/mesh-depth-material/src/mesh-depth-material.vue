<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { MeshDepthMaterial } from 'three'
import {
  useMaterialService,
  useObj3d,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import {
  meshDepthMaterialEmits,
  meshDepthMaterialProps,
} from './mesh-depth-material'

defineOptions({
  name: 'FtMeshDepthMaterial',
})

const props = defineProps(meshDepthMaterialProps)
const emit = defineEmits(meshDepthMaterialEmits)

let scene = useScene()
let obj3d = useObj3d()
let materialService = useMaterialService()
let material = new MeshDepthMaterial(props.params)
materialService.addCount(material)

emit('load', { scene, material, obj3d })
provide(materialInjectKey, material)
useOptions(props.options, material, scene)

onBeforeUnmount(() => {
  materialService.subCount(material)
  material.dispose()
  ;(scene as any) = null
  ;(obj3d as any) = null
  ;(material as any) = null
  ;(materialService as any) = null
})
</script>
