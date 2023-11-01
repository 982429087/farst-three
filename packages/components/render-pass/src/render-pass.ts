import type { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import type { Scene } from 'three'
import type { ThreeOptions } from '@farst-three/utils'
import type RenderPassComponent from './render-pass.vue'

export const renderPassEmits = {
  load: (e: RenderPassLoadEvent) => e,
}

export type RenderPassLoadEvent = {
  scene: Scene
  pass: RenderPass
}
export type RenderPassEmits = typeof renderPassEmits
export type RenderPassInstance = InstanceType<typeof RenderPassComponent>
export type RenderPassOptions = ThreeOptions<RenderPass>
