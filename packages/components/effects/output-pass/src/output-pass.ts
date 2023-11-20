import type { Scene } from 'three'
import type OutputPassComponent from './output-pass.vue'
export const outputPassEmits = {
  load: (e: OutputPassLoadEvent) => e,
}

export type OutputPassLoadEvent = {
  scene: Scene
}
export type OutputPassEmits = typeof outputPassEmits
export type OutputPassInstance = InstanceType<typeof OutputPassComponent>
