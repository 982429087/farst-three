import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type {
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshBasicMaterialParameters,
  Scene,
} from 'three'

import type { ExtractPropTypes } from 'vue'
import type MeshBasicMaterialComponent from './mesh-basic-material.vue'

export const meshBasicMaterialProps = buildProps({
  params: {
    type: definePropType<MeshBasicMaterialParameters>(Object),
  },
  options: {
    type: definePropType<ThreeOptions<MeshBasicMaterial>>(Object),
    default: () => ({}),
  },
})
export const meshBasicMaterialEmits = {
  load: (e: MeshBasicMateriaLoadEvent) => e,
}

export type MeshBasicMateriaLoadEvent = {
  mesh: Mesh
  material: Material
  scene: Scene
}

export type MeshBasicMaterialProps = ExtractPropTypes<
  typeof meshBasicMaterialProps
>
export type MeshBasicMaterialInstance = InstanceType<
  typeof MeshBasicMaterialComponent
>
export type MeshBasicMaterialEmits = typeof meshBasicMaterialEmits
