import type { GeoProjection } from 'd3-geo'
import type { ExtractPropTypes, PropType } from 'vue'
import type ProjectionComponent from './projection.vue'

export const projectionProps = {
  center: {
    type: Array as PropType<number[]>,
    default: [0, 0],
    required: true as const,
  },
  scale: {
    type: Number as PropType<number>,
    default: 1,
    required: true as const,
  },
  translate: {
    type: Array as PropType<number[]>,
    default: [0, 0],
  },
}
export const projectionEmits = {
  load: (e: ProjectionLoadEvent) => e,
}

export type ProjectionLoadEvent = {
  projection: GeoProjection
}
export type ProjectionEmits = typeof projectionEmits
export type ProjectionProps = ExtractPropTypes<typeof projectionProps>
export type ProjectionInstance = InstanceType<typeof ProjectionComponent>
