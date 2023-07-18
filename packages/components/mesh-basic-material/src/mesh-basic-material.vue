<template>
  <slot />
</template>

<script lang="ts" setup>
import { MeshBasicMaterial } from 'three'
import { useMaterialProvide, useOptions } from '@farst-three/hooks'
// import { materialInjectKey } from '@farst-three/constants'
import {
  meshBasicMaterialEmits,
  meshBasicMaterialProps,
} from './mesh-basic-material'

defineOptions({
  name: 'FtMeshBasicMaterial',
})

const props = defineProps(meshBasicMaterialProps)
const emit = defineEmits(meshBasicMaterialEmits)
// const mesh = useMesh()
// init here

const { materials, scene } = useMaterialProvide(props, emit, MeshBasicMaterial)
useOptions(props.options, materials[0], scene)

// const materials: MeshBasicMaterial[] = []

// for (let i = 0; i < props.initCount; i++) {
//   const params = isFunction(props.params) ? props.params(i) : props.params
//   const material = new MeshBasicMaterial(params)
//   materials.push(material)
// }

// if (props.initCount === 1) {
//   mesh.material = materials[0]
//   provide(materialInjectKey, materials[0])
//   emit('load', { material: materials[0], mesh })
// } else {
//   mesh.material = materials
//   provide(materialInjectKey, materials)
//   emit('load', { materials, mesh })
// }
</script>
