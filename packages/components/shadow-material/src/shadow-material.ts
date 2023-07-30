import { buildProps, definePropType } from '@farst-three/utils'
import type {
  Mesh,
  Scene,
  ShadowMaterial,
  ShadowMaterialParameters,
} from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type ShadowMaterialComponent from './shadow-material.vue'

export const shadowMaterialProps = buildProps({
  options: {
    type: definePropType<ThreeOptions<ShadowMaterial>>(Object),
    default: () => ({}),
  },
  params: {
    type: definePropType<ShadowMaterialParameters>(Object),
  },
})
export const shadowMaterialEmits = {
  load: (e: ShadowMaterialLoadEvent) => e,
}

export type ShadowMaterialLoadEvent = {
  scene: Scene
  material: ShadowMaterial
  mesh: Mesh
}
export type ShadowMaterialEmits = typeof shadowMaterialEmits
export type ShadowMaterialProps = ExtractPropTypes<typeof shadowMaterialProps>
export type ShadowMaterialInstance = InstanceType<
  typeof ShadowMaterialComponent
>
export type ShadowMaterialOptions = ThreeOptions<ShadowMaterial>
