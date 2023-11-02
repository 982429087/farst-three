import { buildProps, definePropType } from '@farst-three/utils'
import type {
  BufferGeometry,
  Group,
  Material,
  NormalBufferAttributes,
  Points,
  Scene,
} from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type PointsComponent from './points.vue'

export const pointsProps = buildProps({
  options: {
    type: definePropType<PointsOptions>(Object),
    default: () => ({}),
  },
  geometry: {
    type: definePropType<BufferGeometry<NormalBufferAttributes> | undefined>(
      Object
    ),
  },
  material: {
    type: definePropType<Material>(Object),
  },
})
export const pointsEmits = {
  load: (e: PointsLoadEvent) => e,
}

export type PointsLoadEvent = {
  scene: Scene
  obj3d: Points
  group: Group | null
}
export type PointsEmits = typeof pointsEmits
export type PointsProps = ExtractPropTypes<typeof pointsProps>
export type PointsInstance = InstanceType<typeof PointsComponent>
export type PointsOptions = ThreeOptions<Points>
