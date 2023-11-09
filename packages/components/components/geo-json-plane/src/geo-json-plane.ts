import { buildProps, definePropType } from '@farst-three/utils'
import type { FeatureCollection, Geometry } from '@turf/turf'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type GeoJsonPlaneComponent from './geo-json-plane.vue'

export const geoJsonPlaneProps = buildProps({
  geoJson: {
    type: definePropType<FeatureCollection<Geometry>>(Object),
  },
  geoJsonOutline: {
    type: definePropType<FeatureCollection<Geometry>>(Object),
  },
})
export const geoJsonPlaneEmits = {
  load: (e: GeoJsonPlaneLoadEvent) => e,
}

export type GeoJsonPlaneLoadEvent = {
  scene: Scene
}
export type GeoJsonPlaneEmits = typeof geoJsonPlaneEmits
export type GeoJsonPlaneProps = ExtractPropTypes<typeof geoJsonPlaneProps>
export type GeoJsonPlaneInstance = InstanceType<typeof GeoJsonPlaneComponent>
