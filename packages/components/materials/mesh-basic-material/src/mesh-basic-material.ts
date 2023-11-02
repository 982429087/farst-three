import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type {
  MeshBasicMaterial,
  MeshBasicMaterialParameters,
  Object3D,
  Scene,
} from 'three'

import type { ExtractPropTypes } from 'vue'
import type MeshBasicMaterialComponent from './mesh-basic-material.vue'

export const meshBasicMaterialProps = buildProps({
  params: {
    type: definePropType<MeshBasicMaterialParameters>(Object),
  },
  options: {
    type: definePropType<MeshBasicMaterialOptions>(Object),
    default: () => ({}),
  },
})
export const meshBasicMaterialEmits = {
  load: (e: MeshBasicMaterialLoadEvent) => e,
}

export type MeshBasicMaterialLoadEvent = {
  obj3d: Object3D
  material: MeshBasicMaterial
  scene: Scene
}

export type MeshBasicMaterialProps = ExtractPropTypes<
  typeof meshBasicMaterialProps
>
export type MeshBasicMaterialInstance = InstanceType<
  typeof MeshBasicMaterialComponent
>
export type MeshBasicMaterialEmits = typeof meshBasicMaterialEmits
export type MeshBasicMaterialOptions = ThreeOptions<MeshBasicMaterial>
