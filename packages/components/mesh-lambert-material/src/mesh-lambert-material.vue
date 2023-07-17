<template>
  <slot />
</template>

<script lang="ts" setup>
import { MeshLambertMaterial } from 'three'
import { useMesh, useOptions, useScene } from '@farst-three/hooks'
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
useOptions(props.options, meshLambertMaterial, scene)
</script>
