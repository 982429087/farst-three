import { buildProps, definePropType } from '@farst-three/utils'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type DomMarkerRendererComponent from './dom-marker-renderer.vue'

export const domMarkerRendererProps = buildProps({
  value: undefined,
})
export const domMarkerRendererEmits = {
  load: (e: DomMarkerRendererLoadEvent) => e,
}

export type DomMarkerRendererLoadEvent = {
  scene: Scene
}
export type DomMarkerRendererEmits = typeof domMarkerRendererEmits
export type DomMarkerRendererProps = ExtractPropTypes<
  typeof domMarkerRendererProps
>
export type DomMarkerRendererInstance = InstanceType<
  typeof DomMarkerRendererComponent
>
