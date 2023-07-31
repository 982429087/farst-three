import { buildProps, definePropType } from '@farst-three/utils'
import type {
  MeshStandardMaterial,
  MeshStandardMaterialParameters,
  Object3D,
  Scene,
} from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type MeshStandardMaterialComponent from './mesh-standard-material.vue'

export const meshStandardMaterialProps = buildProps({
  options: {
    type: definePropType<ThreeOptions<MeshStandardMaterial>>(Object),
    default: () => ({}),
  },
  params: {
    type: definePropType<MeshStandardMaterialParameters>(Object),
  },
})
export const meshStandardMaterialEmits = {
  load: (e: MeshStandardMaterialLoadEvent) => e,
}

export type MeshStandardMaterialLoadEvent = {
  scene: Scene
  material: MeshStandardMaterial
  obj3d: Object3D
}
export type MeshStandardMaterialEmits = typeof meshStandardMaterialEmits
export type MeshStandardMaterialProps = ExtractPropTypes<
  typeof meshStandardMaterialProps
>
export type MeshStandardMaterialInstance = InstanceType<
  typeof MeshStandardMaterialComponent
>
export type MeshStandardMaterialOptions = ThreeOptions<MeshStandardMaterial>
