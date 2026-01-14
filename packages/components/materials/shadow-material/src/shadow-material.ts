import type {
  Object3D,
  Scene,
  ShadowMaterial,
  ShadowMaterialParameters,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type ShadowMaterialComponent from './shadow-material.vue'

export const shadowMaterialProps = {
  options: {
    type: Object as PropType<ThreeOptions<ShadowMaterial>>,
    default: () => ({}),
  },
  params: {
    type: Object as PropType<ShadowMaterialParameters>,
  },
}
export const shadowMaterialEmits = {
  load: (e: ShadowMaterialLoadEvent) => e,
}

export type ShadowMaterialLoadEvent = {
  scene: Scene
  material: ShadowMaterial
  obj3d: Object3D
}
export type ShadowMaterialEmits = typeof shadowMaterialEmits
export type ShadowMaterialProps = ExtractPropTypes<typeof shadowMaterialProps>
export type ShadowMaterialInstance = InstanceType<
  typeof ShadowMaterialComponent
>
export type ShadowMaterialOptions = ThreeOptions<ShadowMaterial>
