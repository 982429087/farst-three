<template>
  <slot />
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { MeshLambertMaterial } from 'three'
import { useMesh, useOptions, useScene } from '@farst-three/hooks'
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
const meshLambertMaterial = new MeshLambertMaterial(props.params)
mesh.material = meshLambertMaterial

emit('load', { mesh, material: meshLambertMaterial })
provide(materialInjectKey, meshLambertMaterial)
useOptions(props.options, meshLambertMaterial, scene)
</script>
