import type {
  LineBasicMaterial,
  LineBasicMaterialParameters,
  Object3D,
  Scene,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type LineBasicMaterialComponent from './line-basic-material.vue'

export const lineBasicMaterialProps = {
  params: {
    type: Object as PropType<LineBasicMaterialParameters>,
  },
  options: {
    type: Object as PropType<ThreeOptions<LineBasicMaterial>>,
    default: () => ({}),
  },
}
export const lineBasicMaterialEmits = {
  load: (e: LineBasicMaterialLoadEvent) => e,
}

export type LineBasicMaterialLoadEvent = {
  obj3d: Object3D
  material: LineBasicMaterial
  scene: Scene
}
export type LineBasicMaterialEmits = typeof lineBasicMaterialEmits
export type LineBasicMaterialProps = ExtractPropTypes<
  typeof lineBasicMaterialProps
>
export type LineBasicMaterialInstance = InstanceType<
  typeof LineBasicMaterialComponent
>
export type LineBasicMaterialOptions = ThreeOptions<LineBasicMaterial>
