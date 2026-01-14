import type {
  Object3D,
  Scene,
  ShaderMaterial,
  ShaderMaterialParameters,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type ShaderMaterialComponent from './shader-material.vue'

export const shaderMaterialProps = {
  params: {
    type: Object as PropType<ShaderMaterialParameters>,
  },
  options: {
    type: Object as PropType<ShaderMaterialOptions>,
    default: () => ({}),
  },
}
export const shaderMaterialEmits = {
  load: (e: ShaderMaterialLoadEvent) => e,
}

export type ShaderMaterialLoadEvent = {
  scene: Scene
  material: ShaderMaterial
  obj3d: Object3D
}
export type ShaderMaterialEmits = typeof shaderMaterialEmits
export type ShaderMaterialProps = ExtractPropTypes<typeof shaderMaterialProps>
export type ShaderMaterialInstance = InstanceType<
  typeof ShaderMaterialComponent
>
export type ShaderMaterialOptions = ThreeOptions<ShaderMaterial>
