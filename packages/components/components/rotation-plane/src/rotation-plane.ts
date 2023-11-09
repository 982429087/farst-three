import { buildProps, definePropType } from '@farst-three/utils'
import type { RotationPlaneOptions } from './use-rotation-plane'
import type { Mesh, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type RotationPlaneComponent from './rotation-plane.vue'

export const rotationPlaneProps = buildProps({
  meshOptions: {
    type: definePropType<RotationPlaneMeshOptions>(Object),
    default: () => ({}),
  },
  options: {
    type: definePropType<RotationPlaneOptions>(Object),
    default: () => ({}),
  },
})
export const rotationPlaneEmits = {
  load: (e: RotationPlaneLoadEvent) => e,
}

export type RotationPlaneLoadEvent = {
  scene: Scene
}
export type RotationPlaneEmits = typeof rotationPlaneEmits
export type RotationPlaneProps = ExtractPropTypes<typeof rotationPlaneProps>
export type RotationPlaneInstance = InstanceType<typeof RotationPlaneComponent>
export type RotationPlaneMeshOptions = ThreeOptions<Mesh>
