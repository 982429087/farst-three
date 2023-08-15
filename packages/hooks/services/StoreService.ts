import { shallowRef } from 'vue'
import type { Ref, ShallowRef } from 'vue'
import type { Camera, Scene } from 'three'

// 公用部分内容都在这里
export class StoreService {
  // 主渲染相机
  renderCamera: ShallowRef<Camera | undefined> = shallowRef()
  // 初始化场景的dom元素
  sceneRef: Ref<HTMLDivElement | undefined>
  // 场景实例
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
