import { buildProps, definePropType } from '@farst-three/utils'
import type {
  MeshPhysicalMaterial,
  MeshPhysicalMaterialParameters,
  Object3D,
  Scene,
} from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type MeshPhysicalMaterialComponent from './mesh-physical-material.vue'

export const meshPhysicalMaterialProps = buildProps({
  params: {
    type: definePropType<MeshPhysicalMaterialParameters>(Object),
  },
  options: {
    type: definePropType<ThreeOptions<MeshPhysicalMaterial>>(Object),
    default: () => ({}),
  },
})
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
