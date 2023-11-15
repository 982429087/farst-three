import { buildProps, definePropType } from '@farst-three/utils'
import type { FeatureCollection, Geometry } from '@turf/turf'
import type { EdgeMoveLine, EdgeMoveLineOptions } from './use-edge-move-line'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type EdgeMoveLineComponent from './edge-move-line.vue'

export const edgeMoveLineProps = buildProps({
  options: {
    type: definePropType<EdgeMoveLineOptions>(Object),
    default: () => ({}),
  },
  geojson: {
    type: definePropType<FeatureCollection<Geometry>>(Object),
  },
})
export const edgeMoveLineEmits = {
  load: (e: EdgeMoveLineLoadEvent) => e,
}

export type EdgeMoveLineLoadEvent = {
  scene: Scene
  edgeMoveLine: EdgeMoveLine
}
export type EdgeMoveLineEmits = typeof edgeMoveLineEmits
export type EdgeMoveLineProps = ExtractPropTypes<typeof edgeMoveLineProps>
export type EdgeMoveLineInstance = InstanceType<typeof EdgeMoveLineComponent>
