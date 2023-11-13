import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type DomMarkerComponent from './dom-marker.vue'

export const domMarkerProps = buildProps({
  options: {
    type: definePropType<CSS2DObjectOptions>(Object),
    default: () => ({}),
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  z: {
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
  xKey: {
    type: String,
    default: 'x',
  },
  yKey: {
    type: String,
    default: 'y',
  },
  zKey: {
    type: String,
    default: 'z',
  },
})
export const domMarkerEmits = {
  load: (e: DomMarkerLoadEvent) => e,
}

export type DomMarkerLoadEvent = {
  scene: Scene
  css2DObject: CSS2DObject
}
export type DomMarkerEmits = typeof domMarkerEmits
export type DomMarkerProps = ExtractPropTypes<typeof domMarkerProps>
export type DomMarkerInstance = InstanceType<typeof DomMarkerComponent>
export type CSS2DObjectOptions = ThreeOptions<CSS2DObject>
