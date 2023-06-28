<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { MeshBasicMaterial } from 'three'
import { useInjection } from '@farst-three/hooks'
import { meshInjectionKey } from '@farst-three/constants/injection'
import { meshBasicMaterialProps } from './mesh-basic-material'
import type { Mesh } from 'three'

defineOptions({
  name: 'FtMeshBasicMaterial',
})

const props = defineProps(meshBasicMaterialProps)

// init here

const material = new MeshBasicMaterial(props.params)
const mesh = useInjection<Mesh>(meshInjectionKey)
mesh.material = material
</script>
