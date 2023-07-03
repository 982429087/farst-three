import { shallowRef } from 'vue'
import type { Ref, ShallowRef } from 'vue'
import type { Camera, Scene } from 'three'

export class StoreService {
  renderCamera: ShallowRef<Camera | undefined> = shallowRef()
  sceneRef: Ref<HTMLDivElement | undefined>
  scene: Scene
  constructor(scene: Scene, sceneRef: Ref<HTMLDivElement | undefined>) {
    this.scene = scene
    this.sceneRef = sceneRef
  }

  setRenderCamera(renderCamera: Camera) {
    this.renderCamera.value = renderCamera
  }
  setSceneRef(sceneRef: HTMLDivElement) {
    this.sceneRef.value = sceneRef
  }

  getRenderCamera() {
    return this.renderCamera.value
  }
  getSceneRef() {
    return this.sceneRef.value
  }
  getScene() {
    return this.scene
  }
}
