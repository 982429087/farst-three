import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import type { Camera, Scene, WebGLRenderer } from 'three'
export function useEffectComposer(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera
) {
  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)
}
