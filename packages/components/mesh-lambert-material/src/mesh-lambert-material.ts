import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type {
  Material,
  Mesh,
  MeshLambertMaterial,
  MeshLambertMaterialParameters,
  Scene,
} from 'three'

import type { ExtractPropTypes } from 'vue'
import type MeshLambertMaterialComponent from './mesh-lambert-material.vue'

export const meshLambertMaterialProps = buildProps({
  params: {
    type: definePropType<MeshLambertMaterialParameters>(Object),
  },
  options: {
    type: definePropType<ThreeOptions<MeshLambertMaterial>>(Object),
    default: () => ({}),
  },
})
export const meshLambertMaterialEmits = {
  load: (e: MeshLambertMaterialLoadEvent) => e,
}

export type MeshLambertMaterialLoadEvent = {
  mesh: Mesh
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
