import { buildProps, definePropType } from '@farst-three/utils'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type DomMarkerComponent from './dom-marker.vue'

export const domMarkerProps = buildProps({
  point: {
    type: definePropType<[number, number]>(Array),
  },
  y: {
    type: Number,
    default: 5.01,
  },
  offset: {
    type: definePropType<[number, number, number]>(Array),
    default: () => [0, 0, -3],
  },
})
export const domMarkerEmits = {
  load: (e: DomMarkerLoadEvent) => e,
}

export type DomMarkerLoadEvent = {
  scene: Scene
}
export type DomMarkerEmits = typeof domMarkerEmits
export type DomMarkerProps = ExtractPropTypes<typeof domMarkerProps>
export type DomMarkerInstance = InstanceType<typeof DomMarkerComponent>
