import { buildProps, definePropType } from '@farst-three/utils'
import type { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type { ThreeOptions } from '@farst-three/utils'
import type UnrealBloomPassComponent from './unreal-bloom-pass.vue'

export const unrealBloomPassProps = buildProps({
  options: {
    type: definePropType<UnrealBloomPassOptions>(Object),
    default: () => ({}),
  },
  strength: { type: Number, default: 1.5 },
  radius: { type: Number, default: 0 },
  threshold: { type: Number, default: 0 },
})
export const unrealBloomPassEmits = {
  load: (e: UnrealBloomPassLoadEvent) => e,
}

export type UnrealBloomPassLoadEvent = {
  scene: Scene
  pass: UnrealBloomPass
}
export type UnrealBloomPassEmits = typeof unrealBloomPassEmits
export type UnrealBloomPassProps = ExtractPropTypes<typeof unrealBloomPassProps>
export type UnrealBloomPassInstance = InstanceType<
  typeof UnrealBloomPassComponent
>
export type UnrealBloomPassOptions = ThreeOptions<UnrealBloomPass>
