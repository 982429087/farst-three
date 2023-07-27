import { buildProps, definePropType } from '@farst-three/utils'
import type {
  Mesh,
  MeshDepthMaterial,
  MeshDepthMaterialParameters,
  Scene,
} from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type MeshDepthMaterialComponent from './mesh-depth-material.vue'

export const meshDepthMaterialProps = buildProps({
  params: {
    type: definePropType<MeshDepthMaterialParameters>(Object),
  },
  options: {
    type: definePropType<MeshDepthMaterialOptions>(Object),
    default: () => ({}),
  },
})
export const meshDepthMaterialEmits = {
  load: (e: MeshDepthMaterialLoadEvent) => e,
}

export type MeshDepthMaterialLoadEvent = {
  scene: Scene
  material: MeshDepthMaterial
  mesh: Mesh
}
export type MeshDepthMaterialEmits = typeof meshDepthMaterialEmits
export type MeshDepthMaterialProps = ExtractPropTypes<
  typeof meshDepthMaterialProps
>
export type MeshDepthMaterialInstance = InstanceType<
  typeof MeshDepthMaterialComponent
>
export type MeshDepthMaterialOptions = ThreeOptions<MeshDepthMaterial>
