import type {
  MeshDepthMaterial,
  MeshDepthMaterialParameters,
  Object3D,
  Scene,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type MeshDepthMaterialComponent from './mesh-depth-material.vue'

export const meshDepthMaterialProps = {
  params: {
    type: Object as PropType<MeshDepthMaterialParameters>,
  },
  options: {
    type: Object as PropType<MeshDepthMaterialOptions>,
    default: () => ({}),
  },
}
export const meshDepthMaterialEmits = {
  load: (e: MeshDepthMaterialLoadEvent) => e,
}

export type MeshDepthMaterialLoadEvent = {
  scene: Scene
  material: MeshDepthMaterial
  obj3d: Object3D
}
export type MeshDepthMaterialEmits = typeof meshDepthMaterialEmits
export type MeshDepthMaterialProps = ExtractPropTypes<
  typeof meshDepthMaterialProps
>
export type MeshDepthMaterialInstance = InstanceType<
  typeof MeshDepthMaterialComponent
>
export type MeshDepthMaterialOptions = ThreeOptions<MeshDepthMaterial>
