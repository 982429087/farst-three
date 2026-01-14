import type { Scene } from 'three'
import type { ExtractPropTypes } from 'vue'
import type QuantumComponent from './quantum.vue'

export const quantumProps = {
  options: {
    type: Object,
    default: () => ({}),
  },
}
export const quantumEmits = {
  load: (e: QuantumLoadEvent) => e,
}

export type QuantumLoadEvent = {
  scene: Scene
}
export type QuantumEmits = typeof quantumEmits
export type QuantumProps = ExtractPropTypes<typeof quantumProps>
export type QuantumInstance = InstanceType<typeof QuantumComponent>
