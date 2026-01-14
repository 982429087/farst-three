import type { ThreeOptions } from '@farst-three/utils'
import type { Reflector } from 'three/examples/jsm/objects/Reflector'
import type { ReflectorPlaneOptions } from './use-reflector-plane'
import type { Mesh, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type ReflectorPlaneComponent from './reflector-plane.vue'

export const reflectorPlaneProps = {
  options: {
    type: Object as PropType<ReflectorPlaneOptions>,
  },
  mirrorOptions: {
    type: Object as PropType<ThreeOptions<Reflector>>,
    default: () => ({}),
  },
  circleMeshOptions: {
    type: Object as PropType<ThreeOptions<Mesh>>,
    default: () => ({}),
  },
  floorMeshOptions: {
    type: Object as PropType<ThreeOptions<Mesh>>,
    default: () => ({}),
  },
}
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
