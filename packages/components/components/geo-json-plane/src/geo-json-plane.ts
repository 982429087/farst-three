import { buildProps, definePropType } from '@farst-three/utils'
import { eventEmits, eventProps } from '@farst-three/hooks'
import type { GeoJsonPlane, GeoJsonPlaneOptions } from './GeoJsonPlane'
import type { FeatureCollection, Geometry } from '@turf/turf'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type GeoJsonPlaneComponent from './geo-json-plane.vue'

export const geoJsonPlaneProps = buildProps({
  geoJson: {
    type: definePropType<FeatureCollection<Geometry>>(Object),
  },
  options: {
    type: definePropType<GeoJsonPlaneOptions>(Object),
  },
  ...eventProps,
})
export const geoJsonPlaneEmits = {
  load: (e: GeoJsonPlaneLoadEvent) => e,
  ...eventEmits,
}

export type GeoJsonPlaneLoadEvent = {
  scene: Scene
  geoJsonPlane: GeoJsonPlane
}
export type GeoJsonPlaneEmits = typeof geoJsonPlaneEmits
export type GeoJsonPlaneProps = ExtractPropTypes<typeof geoJsonPlaneProps>
export type GeoJsonPlaneInstance = InstanceType<typeof GeoJsonPlaneComponent>
