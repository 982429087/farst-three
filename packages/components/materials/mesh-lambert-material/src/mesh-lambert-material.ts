import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type {
  MeshLambertMaterial,
  MeshLambertMaterialParameters,
  Object3D,
  Scene,
} from 'three'

import type { ExtractPropTypes } from 'vue'
import type MeshLambertMaterialComponent from './mesh-lambert-material.vue'

export const meshLambertMaterialProps = buildProps({
  params: {
    type: definePropType<MeshLambertMaterialParameters>(Object),
  },
  options: {
    type: definePropType<MeshLambertMaterialOptions>(Object),
    default: () => ({}),
  },
})
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
