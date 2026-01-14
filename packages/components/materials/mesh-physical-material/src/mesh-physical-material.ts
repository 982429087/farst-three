import type {
  MeshPhysicalMaterial,
  MeshPhysicalMaterialParameters,
  Object3D,
  Scene,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type MeshPhysicalMaterialComponent from './mesh-physical-material.vue'

export const meshPhysicalMaterialProps = {
  params: {
    type: Object as PropType<MeshPhysicalMaterialParameters>,
  },
  options: {
    type: Object as PropType<MeshPhysicalMaterialOptions>,
    default: () => ({}),
  },
}
export const meshPhysicalMaterialEmits = {
  load: (e: MeshPhysicalMaterialLoadEvent) => e,
}

export type MeshPhysicalMaterialLoadEvent = {
  obj3d: Object3D
  material: MeshPhysicalMaterial
  scene: Scene
}
export type MeshPhysicalMaterialEmits = typeof meshPhysicalMaterialEmits
export type MeshPhysicalMaterialProps = ExtractPropTypes<
  typeof meshPhysicalMaterialProps
>
export type MeshPhysicalMaterialInstance = InstanceType<
  typeof MeshPhysicalMaterialComponent
>
export type MeshPhysicalMaterialOptions = ThreeOptions<MeshPhysicalMaterial>
