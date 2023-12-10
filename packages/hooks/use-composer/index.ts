import { onBeforeUnmount } from 'vue'
import {
  useEffectComposer,
  useRenderCamera,
  useRenderer,
  useScene,
} from '../use-inject'
import type { Camera, Scene, WebGLRenderer } from 'three'
import type { Pass } from 'three/examples/jsm/postprocessing/Pass'

export function useComposer(
  emit: any,
  fn: (scene: Scene, camera: Camera, renderer: WebGLRenderer) => Pass
) {
  const scene = useScene()
  const camera = useRenderCamera()
  const renderer = useRenderer()
  const composer = useEffectComposer()
  const pass = fn(scene, camera, renderer)
  composer.addPass(pass)
  emit('load', { scene, pass })
  onBeforeUnmount(() => {
    pass.dispose()
  })
}
