import type { UpParticleOptions } from './use-up-particle'
import type { Mesh, Scene } from 'three'
import type { ExtractPropTypes, PropType } from 'vue'
import type UpParticleComponent from './up-particle.vue'

export const upParticleProps = {
  options: {
    type: Object as PropType<UpParticleOptions>,
  },
}
export const upParticleEmits = {
  load: (e: UpParticleLoadEvent) => e,
}

export type UpParticleLoadEvent = {
  scene: Scene
  particles: Mesh[]
}
export type UpParticleEmits = typeof upParticleEmits
export type UpParticleProps = ExtractPropTypes<typeof upParticleProps>
export type UpParticleInstance = InstanceType<typeof UpParticleComponent>
