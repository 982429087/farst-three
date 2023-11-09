import { buildProps, definePropType } from '@farst-three/utils'
import type { ReflectorPlaneOptions } from './use-reflector-plane'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type ReflectorPlaneComponent from './reflector-plane.vue'

export const reflectorPlaneProps = buildProps({
  options: {
    type: definePropType<ReflectorPlaneOptions>(Object),
  },
})
export const reflectorPlaneEmits = {
  load: (e: ReflectorPlaneLoadEvent) => e,
}

export type ReflectorPlaneLoadEvent = {
  scene: Scene
}
export type ReflectorPlaneEmits = typeof reflectorPlaneEmits
export type ReflectorPlaneProps = ExtractPropTypes<typeof reflectorPlaneProps>
export type ReflectorPlaneInstance = InstanceType<
  typeof ReflectorPlaneComponent
>
