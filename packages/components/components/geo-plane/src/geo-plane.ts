import { buildProps } from '@farst-three/utils'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type GeoPlaneComponent from './geo-plane.vue'

export const geoPlaneProps = buildProps({
  url: {
    type: String,
  },
})
export const geoPlaneEmits = {
  load: (e: GeoPlaneLoadEvent) => e,
}

export type GeoPlaneLoadEvent = {
  scene: Scene
}
export type GeoPlaneEmits = typeof geoPlaneEmits
export type GeoPlaneProps = ExtractPropTypes<typeof geoPlaneProps>
export type GeoPlaneInstance = InstanceType<typeof GeoPlaneComponent>
