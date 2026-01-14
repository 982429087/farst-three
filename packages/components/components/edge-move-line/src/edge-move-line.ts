import type { EdgeMoveLine, EdgeMoveLineOptions } from './EdgeMoveLine'
import type { FeatureCollection, Geometry } from '@turf/turf'
import type { Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type EdgeMoveLineComponent from './edge-move-line.vue'

export const edgeMoveLineProps = {
  options: {
    type: Object as PropType<EdgeMoveLineOptions>,
    default: () => ({}),
  },
  geojson: {
    type: Object as PropType<FeatureCollection<Geometry>>,
  },
}
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
