import { onBeforeUnmount } from 'vue'
import { useEffectComposer, useStoreService } from '../use-inject'
import type { Camera, Scene, WebGLRenderer } from 'three'
import type { Pass } from 'three/examples/jsm/postprocessing/Pass'

export function useComposer(
  emit: any,
  fn: (scene: Scene, camera: Camera, renderer: WebGLRenderer) => Pass
) {
  const store = useStoreService()
  const scene = store.getScene()
  const camera = store.getRenderCamera()
  const renderer = store.getRenderer()
  const composer = useEffectComposer()

  if (!camera) throw new Error('<render-pass /> 没有找到主渲染相机!')
  if (!renderer) throw new Error('<render-pass /> 没有找到渲染器!')

  const pass = fn(scene, camera, renderer)

  composer.addPass(pass)
  emit('load', { scene, pass })
  onBeforeUnmount(() => {
    pass.dispose()
  })
}
