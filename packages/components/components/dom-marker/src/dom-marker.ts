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
    default: 0,
  },
  offsetX: {
    type: Number,
    default: 0,
  },
  offsetY: {
    type: Number,
    default: 0,
  },
  offsetZ: {
    type: Number,
    default: 0,
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
