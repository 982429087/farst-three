import { buildProps, definePropType } from '@farst-three/utils'
import type { ThreeOptions } from '@farst-three/utils'
import type { Reflector } from 'three/examples/jsm/objects/Reflector'
import type { ReflectorPlaneOptions } from './use-reflector-plane'
import type { Mesh, Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type ReflectorPlaneComponent from './reflector-plane.vue'

export const reflectorPlaneProps = buildProps({
  options: {
    type: definePropType<ReflectorPlaneOptions>(Object),
  },
  mirrorOptions: {
    type: definePropType<ThreeOptions<Reflector>>(Object),
    default: () => ({}),
  },
  circleMeshOptions: {
    type: definePropType<ThreeOptions<Mesh>>(Object),
    default: () => ({}),
  },
  floorMeshOptions: {
    type: definePropType<ThreeOptions<Mesh>>(Object),
    default: () => ({}),
  },
})
export const reflectorPlaneEmits = {
  load: (e: ReflectorPlaneLoadEvent) => e,
}

export type ReflectorPlaneLoadEvent = {
  scene: Scene
  mirror: Reflector
  circleMesh: Mesh
  floorMesh: Mesh
}
export type ReflectorPlaneEmits = typeof reflectorPlaneEmits
export type ReflectorPlaneProps = ExtractPropTypes<typeof reflectorPlaneProps>
export type ReflectorPlaneInstance = InstanceType<
  typeof ReflectorPlaneComponent
>
