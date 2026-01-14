import { eventEmits, eventProps } from '@farst-three/hooks'
import type { GeoJsonPlane, GeoJsonPlaneOptions } from '@farst-three/hooks'
import type { FeatureCollection, Geometry } from '@turf/turf'
import type { Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type GeoJsonPlaneComponent from './geo-json-plane.vue'

export const geoJsonPlaneProps = {
  geoJson: {
    type: Object as PropType<FeatureCollection<Geometry>>,
  },
  options: {
    type: Object as PropType<GeoJsonPlaneOptions>,
  },
  ...eventProps,
}
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
