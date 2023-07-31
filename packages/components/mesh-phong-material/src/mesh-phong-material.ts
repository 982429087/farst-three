import { buildProps, definePropType } from '@farst-three/utils'
import type {
  MeshPhongMaterial,
  MeshPhongMaterialParameters,
  Object3D,
  Scene,
} from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type MeshPhongMaterialComponent from './mesh-phong-material.vue'

export const meshPhongMaterialProps = buildProps({
  options: {
    type: definePropType<ThreeOptions<MeshPhongMaterial>>(Object),
    default: () => ({}),
  },
  params: {
    type: definePropType<MeshPhongMaterialParameters>(Object),
  },
})
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
