<template>
  <slot />
</template>

<script lang="ts" setup>
import { MeshBasicMaterial } from 'three'
import { isFunction } from 'lodash-es'
import { useMesh } from '@farst-three/hooks'
import {
  meshBasicMaterialEmits,
  meshBasicMaterialProps,
} from './mesh-basic-material'

defineOptions({
  name: 'FtMeshBasicMaterial',
})

const props = defineProps(meshBasicMaterialProps)
const emit = defineEmits(meshBasicMaterialEmits)

// init here
const mesh = useMesh()
const materials: MeshBasicMaterial[] = []
let material: MeshBasicMaterial
if (props.initCount > 1) {
  for (let i = 0; i < props.initCount; i++) {
    const params = isFunction(props.params) ? props.params(i) : props.params
    const material = new MeshBasicMaterial(params)
    materials.push(material)
  }
  mesh.material = materials
  emit('load', { materials, mesh })
} else {
  const params = isFunction(props.params) ? props.params() : props.params
  material = new MeshBasicMaterial(params)
  mesh.material = material
  emit('load', { material, mesh })
}
</script>
