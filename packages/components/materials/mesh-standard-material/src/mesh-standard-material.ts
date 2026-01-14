import type {
  MeshStandardMaterial,
  MeshStandardMaterialParameters,
  Object3D,
  Scene,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type MeshStandardMaterialComponent from './mesh-standard-material.vue'

export const meshStandardMaterialProps = {
  options: {
    type: Object as PropType<MeshStandardMaterialOptions>,
    default: () => ({}),
  },
  params: {
    type: Object as PropType<MeshStandardMaterialParameters>,
  },
}
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
