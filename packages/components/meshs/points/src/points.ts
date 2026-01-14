import type {
  BufferGeometry,
  Group,
  Material,
  NormalBufferAttributes,
  Points,
  Scene,
} from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type PointsComponent from './points.vue'

export const pointsProps = {
  options: {
    type: Object as PropType<PointsOptions>,
    default: () => ({}),
  },
  geometry: {
    type: Object as PropType<BufferGeometry<NormalBufferAttributes> | undefined>,
  },
  material: {
    type: Object as PropType<Material>,
  },
}
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
