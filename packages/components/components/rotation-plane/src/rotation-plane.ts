import type { RotationPlaneOptions } from './use-rotation-plane'
import type { Mesh, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type RotationPlaneComponent from './rotation-plane.vue'

export const rotationPlaneProps = {
  meshOptions: {
    type: Object as PropType<RotationPlaneMeshOptions>,
    default: () => ({}),
  },
  options: {
    type: Object as PropType<RotationPlaneOptions>,
    default: () => ({}),
  },
}
export const rotationPlaneEmits = {
  load: (e: RotationPlaneLoadEvent) => e,
}

export type RotationPlaneLoadEvent = {
  scene: Scene
  mesh: Mesh
}
export type RotationPlaneEmits = typeof rotationPlaneEmits
export type RotationPlaneProps = ExtractPropTypes<typeof rotationPlaneProps>
export type RotationPlaneInstance = InstanceType<typeof RotationPlaneComponent>
export type RotationPlaneMeshOptions = ThreeOptions<Mesh>
