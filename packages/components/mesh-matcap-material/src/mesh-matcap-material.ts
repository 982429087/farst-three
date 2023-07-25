import { buildProps, definePropType } from '@farst-three/utils'
import type {
  Mesh,
  MeshMatcapMaterial,
  MeshMatcapMaterialParameters,
  Scene,
} from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type MeshMatcapMaterialComponent from './mesh-matcap-material.vue'

export const meshMatcapMaterialProps = buildProps({
  options: {
    type: definePropType<ThreeOptions<MeshMatcapMaterial>>(Object),
    default: () => ({}),
  },
  params: {
    type: definePropType<MeshMatcapMaterialParameters>(Object),
  },
})
export const meshMatcapMaterialEmits = {
  load: (e: MeshMatcapMaterialLoadEvent) => e,
}

export type MeshMatcapMaterialLoadEvent = {
  scene: Scene
  material: MeshMatcapMaterial
  mesh: Mesh
}
export type MeshMatcapMaterialEmits = typeof meshMatcapMaterialEmits
export type MeshMatcapMaterialProps = ExtractPropTypes<
  typeof meshMatcapMaterialProps
>
export type MeshMatcapMaterialInstance = InstanceType<
  typeof MeshMatcapMaterialComponent
>
export type MeshMatcapMaterialOptions = ThreeOptions<MeshMatcapMaterial>
