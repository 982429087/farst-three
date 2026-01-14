import type {
  MeshMatcapMaterial,
  MeshMatcapMaterialParameters,
  Object3D,
  Scene,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type MeshMatcapMaterialComponent from './mesh-matcap-material.vue'

export const meshMatcapMaterialProps = {
  options: {
    type: Object as PropType<MeshMatcapMaterialOptions>,
    default: () => ({}),
  },
  params: {
    type: Object as PropType<MeshMatcapMaterialParameters>,
  },
}
export const meshMatcapMaterialEmits = {
  load: (e: MeshMatcapMaterialLoadEvent) => e,
}

export type MeshMatcapMaterialLoadEvent = {
  scene: Scene
  material: MeshMatcapMaterial
  obj3d: Object3D
}
export type MeshMatcapMaterialEmits = typeof meshMatcapMaterialEmits
export type MeshMatcapMaterialProps = ExtractPropTypes<
  typeof meshMatcapMaterialProps
>
export type MeshMatcapMaterialInstance = InstanceType<
  typeof MeshMatcapMaterialComponent
>
export type MeshMatcapMaterialOptions = ThreeOptions<MeshMatcapMaterial>
