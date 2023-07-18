<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, provide } from 'vue'
import { MeshLambertMaterial } from 'three'
import {
  useMaterialService,
  useMesh,
  useOptions,
  useScene,
} from '@farst-three/hooks'
import { materialInjectKey } from '@farst-three/constants'
import {
  meshLambertMaterialEmits,
  meshLambertMaterialProps,
} from './mesh-lambert-material'

defineOptions({
  name: 'FtMeshLambertMaterial',
})

const props = defineProps(meshLambertMaterialProps)
const emit = defineEmits(meshLambertMaterialEmits)

// init here 必须添加光源才有效果
const mesh = useMesh()
const scene = useScene()
const materialService = useMaterialService()

const material = new MeshLambertMaterial(props.params)
materialService.addCount(material)

emit('load', { mesh, material, scene })
provide(materialInjectKey, material)
useOptions(props.options, material, scene)

onBeforeUnmount(() => {
  materialService.subCount(material)
  material.dispose()
})
</script>
