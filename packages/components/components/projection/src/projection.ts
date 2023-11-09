import { buildProps, definePropType } from '@farst-three/utils'
import type { GeoProjection } from 'd3'
import type { ExtractPropTypes } from 'vue'
import type ProjectionComponent from './projection.vue'

export const projectionProps = buildProps({
  center: {
    type: definePropType<[number, number]>(Array),
    default: [0, 0],
    required: true as const,
  },
  scale: {
    type: definePropType<number>(Number),
    default: 1,
    required: true as const,
  },
  translate: {
    type: definePropType<[number, number]>(Array),
    default: [0, 0],
  },
})
export const projectionEmits = {
  load: (e: ProjectionLoadEvent) => e,
}

export type ProjectionLoadEvent = {
  projection: GeoProjection
}
export type ProjectionEmits = typeof projectionEmits
export type ProjectionProps = ExtractPropTypes<typeof projectionProps>
export type ProjectionInstance = InstanceType<typeof ProjectionComponent>
