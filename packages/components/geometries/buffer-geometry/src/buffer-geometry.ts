import type { BufferGeometry, Object3D, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type BufferGeometryComponent from './buffer-geometry.vue'

export const bufferGeometryProps = {
  options: {
    type: Object as PropType<ThreeOptions<BufferGeometry>>,
    default: () => ({}),
  },
}
export const bufferGeometryEmits = {
  load: (e: BufferGeometryLoadEvent) => e,
}

export type BufferGeometryLoadEvent = {
  scene: Scene
  geometry: BufferGeometry
  obj3d: Object3D
}
export type BufferGeometryEmits = typeof bufferGeometryEmits
export type BufferGeometryProps = ExtractPropTypes<typeof bufferGeometryProps>
export type BufferGeometryInstance = InstanceType<
  typeof BufferGeometryComponent
>
export type BufferGeometryOptions = ThreeOptions<BufferGeometry>
