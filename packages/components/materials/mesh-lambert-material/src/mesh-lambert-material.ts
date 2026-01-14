import type { ThreeOptions } from '@farst-three/utils'
import type {
  MeshLambertMaterial,
  MeshLambertMaterialParameters,
  Object3D,
  Scene,
} from 'three'

import type { ExtractPropTypes, PropType } from 'vue'
import type MeshLambertMaterialComponent from './mesh-lambert-material.vue'

export const meshLambertMaterialProps = {
  params: {
    type: Object as PropType<MeshLambertMaterialParameters>,
  },
  options: {
    type: Object as PropType<MeshLambertMaterialOptions>,
    default: () => ({}),
  },
}
export const meshLambertMaterialEmits = {
  load: (e: MeshLambertMaterialLoadEvent) => e,
}

export type MeshLambertMaterialLoadEvent = {
  obj3d: Object3D
  material: MeshLambertMaterial
  scene: Scene
}
export type MeshLambertMaterialEmits = typeof meshLambertMaterialEmits
export type MeshLambertMaterialProps = ExtractPropTypes<
  typeof meshLambertMaterialProps
>
export type MeshLambertMaterialInstance = InstanceType<
  typeof MeshLambertMaterialComponent
>
export type MeshLambertMaterialOptions = ThreeOptions<MeshLambertMaterial>
