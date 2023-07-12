import { buildProps, definePropType } from '@farst-three/utils'
import type { Material, Mesh, MeshBasicMaterialParameters } from 'three'

import type { ExtractPropTypes } from 'vue'
import type MeshBasicMaterialComponent from './mesh-basic-material.vue'

export const meshBasicMaterialProps = buildProps({
  params: {
    type: [
      definePropType<MeshBasicMaterialParameters>(Object),
      definePropType<(i?: number) => MeshBasicMaterialParameters>(Function),
    ],
  },
  initCount: {
    type: Number,
    default: 1,
  },
})
export const meshBasicMaterialEmits = {
  load: (e: MeshBasicMateriaLoadEvent) => e,
}

export type MeshBasicMateriaLoadEvent = {
  materials?: Material[]
  mesh: Mesh
  material?: Material
}

export type MeshBasicMaterialProps = ExtractPropTypes<
  typeof meshBasicMaterialProps
>
export type MeshBasicMaterialInstance = InstanceType<
  typeof MeshBasicMaterialComponent
>
export type MeshBasicMaterialEmits = typeof meshBasicMaterialEmits
