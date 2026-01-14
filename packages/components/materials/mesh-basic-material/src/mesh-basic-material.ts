import type { ThreeOptions } from '@farst-three/utils'
import type {
  MeshBasicMaterial,
  MeshBasicMaterialParameters,
  Object3D,
  Scene,
} from 'three'

import type { ExtractPropTypes, PropType } from 'vue'
import type MeshBasicMaterialComponent from './mesh-basic-material.vue'

export const meshBasicMaterialProps = {
  params: {
    type: Object as PropType<MeshBasicMaterialParameters>,
  },
  options: {
    type: Object as PropType<MeshBasicMaterialOptions>,
    default: () => ({}),
  },
}
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
