import type {
  MeshPhongMaterial,
  MeshPhongMaterialParameters,
  Object3D,
  Scene,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type MeshPhongMaterialComponent from './mesh-phong-material.vue'

export const meshPhongMaterialProps = {
  options: {
    type: Object as PropType<MeshPhongMaterialOptions>,
    default: () => ({}),
  },
  params: {
    type: Object as PropType<MeshPhongMaterialParameters>,
  },
}
export const meshPhongMaterialEmits = {
  load: (e: MeshPhongMaterialLoadEvent) => e,
}

export type MeshPhongMaterialLoadEvent = {
  scene: Scene
  material: MeshPhongMaterial
  obj3d: Object3D
}
export type MeshPhongMaterialEmits = typeof meshPhongMaterialEmits
export type MeshPhongMaterialProps = ExtractPropTypes<
  typeof meshPhongMaterialProps
>
export type MeshPhongMaterialInstance = InstanceType<
  typeof MeshPhongMaterialComponent
>
export type MeshPhongMaterialOptions = ThreeOptions<MeshPhongMaterial>
