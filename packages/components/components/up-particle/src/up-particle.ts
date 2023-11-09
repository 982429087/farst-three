import { buildProps, definePropType } from '@farst-three/utils'
import type { UpParticleOptions } from './use-up-particle'
import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type UpParticleComponent from './up-particle.vue'

export const upParticleProps = buildProps({
  options: {
    type: definePropType<UpParticleOptions>(Object),
    default: () => ({}),
  },
})
export const upParticleEmits = {
  load: (e: UpParticleLoadEvent) => e,
}

export type UpParticleLoadEvent = {
  scene: Scene
}
export type UpParticleEmits = typeof upParticleEmits
export type UpParticleProps = ExtractPropTypes<typeof upParticleProps>
export type UpParticleInstance = InstanceType<typeof UpParticleComponent>
