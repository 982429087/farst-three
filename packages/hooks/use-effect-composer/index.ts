import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import type { Camera, Scene, WebGLRenderer } from 'three'
export function useEffectComposer(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera
) {
  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)
  const afterimagePass = new AfterimagePass()
  composer.addPass(afterimagePass)
  const outputPass = new OutputPass()
  composer.addPass(outputPass)

  return {
    composer,
  }
}
