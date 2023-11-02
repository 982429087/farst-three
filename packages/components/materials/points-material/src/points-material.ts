import { buildProps, definePropType } from '@farst-three/utils'
import type {
  Object3D,
  PointsMaterial,
  PointsMaterialParameters,
  Scene,
} from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type PointsMaterialComponent from './points-material.vue'

export const pointsMaterialProps = buildProps({
  options: {
    type: definePropType<PointsMaterialOptions>(Object),
    default: () => ({}),
  },
  params: {
    type: definePropType<PointsMaterialParameters>(Object),
  },
})
export const pointsMaterialEmits = {
  load: (e: PointsMaterialLoadEvent) => e,
}

export type PointsMaterialLoadEvent = {
  scene: Scene
  material: PointsMaterial
  obj3d: Object3D
}
export type PointsMaterialEmits = typeof pointsMaterialEmits
export type PointsMaterialProps = ExtractPropTypes<typeof pointsMaterialProps>
export type PointsMaterialInstance = InstanceType<
  typeof PointsMaterialComponent
>
export type PointsMaterialOptions = ThreeOptions<PointsMaterial>
