import { buildProps, definePropType } from '@farst-three/utils'
import type { GeoJsonPlaneLinesOptions } from './use-geo-json-plane-lines'
import type { FeatureCollection, Geometry } from '@turf/turf'
import type { Group, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type GeoJsonPlaneComponent from './geo-json-plane.vue'

export const geoJsonPlaneProps = buildProps({
  geoJson: {
    type: definePropType<FeatureCollection<Geometry>>(Object),
  },
  geoJsonOutline: {
    type: definePropType<FeatureCollection<Geometry>>(Object),
  },
  lineOptions: {
    type: definePropType<GeoJsonPlaneLinesOptions>(Object),
    default: () => ({}),
  },
  planeOptions: {
    type: definePropType<GeoJsonPlaneLinesOptions>(Object),
    default: () => ({}),
  },
})
export const geoJsonPlaneEmits = {
  load: (e: GeoJsonPlaneLoadEvent) => e,
}

export type GeoJsonPlaneLoadEvent = {
  scene: Scene
  group: Group
}
export type GeoJsonPlaneEmits = typeof geoJsonPlaneEmits
export type GeoJsonPlaneProps = ExtractPropTypes<typeof geoJsonPlaneProps>
export type GeoJsonPlaneInstance = InstanceType<typeof GeoJsonPlaneComponent>
