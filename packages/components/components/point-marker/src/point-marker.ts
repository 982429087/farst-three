import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { PointMarkerOptions } from './use-point-marker'
import type { Group, Mesh, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type PointMarkerComponent from './point-marker.vue'

export const pointMarkerProps = buildProps({
  options: {
    type: definePropType<PointMarkerOptions>(Object),
    default: () => ({}),
  },
  groupOptions: {
    type: definePropType<ThreeOptions<Group>>(Object),
    default: () => ({}),
  },
})
export const pointMarkerEmits = {
  load: (e: PointMarkerLoadEvent) => e,
}

export type PointMarkerLoadEvent = {
  scene: Scene
  group: Group
  waveMesh: Mesh
  haloMesh: Mesh
}
export type PointMarkerEmits = typeof pointMarkerEmits
export type PointMarkerProps = ExtractPropTypes<typeof pointMarkerProps>
export type PointMarkerInstance = InstanceType<typeof PointMarkerComponent>
