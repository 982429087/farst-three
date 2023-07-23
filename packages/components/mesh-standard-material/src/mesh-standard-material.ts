import { buildProps, definePropType } from '@farst-three/utils'
import type {
  Mesh,
  MeshStandardMaterial,
  MeshStandardMaterialParameters,
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
  mesh: Mesh
}
export type MeshStandardMaterialEmits = typeof meshStandardMaterialEmits
export type MeshStandardMaterialProps = ExtractPropTypes<
  typeof meshStandardMaterialProps
>
export type MeshStandardMaterialInstance = InstanceType<
  typeof MeshStandardMaterialComponent
>
export type MeshStandardMaterialOptions = ThreeOptions<MeshStandardMaterial>
