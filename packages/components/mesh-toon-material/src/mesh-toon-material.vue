<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { MeshToonMaterial } from 'three'
import {
  useMaterialService,
  useMesh,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import {
  meshToonMaterialEmits,
  meshToonMaterialProps,
} from './mesh-toon-material'

defineOptions({
  name: 'FtMeshToonMaterial',
})

const props = defineProps(meshToonMaterialProps)
const emit = defineEmits(meshToonMaterialEmits)

let scene = useScene()
let mesh = useMesh()
let materialService = useMaterialService()
let material = new MeshToonMaterial(props.params)
materialService.addCount(material)

emit('load', { scene, material, mesh })
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
