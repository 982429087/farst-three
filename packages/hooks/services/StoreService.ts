import { shallowRef } from 'vue'
import type { Ref, ShallowRef } from 'vue'
import type { Camera, Scene, WebGLRenderer } from 'three'

// 公用部分内容都在这里
export class StoreService {
  // 主渲染相机
  renderCamera: ShallowRef<Camera | undefined> = shallowRef()
  // 初始化场景的dom元素
  sceneRef: Ref<HTMLDivElement | undefined>
  // 场景实例
  scene: Scene
  // 渲染器
  renderer: ShallowRef<WebGLRenderer | undefined> = shallowRef()

  constructor(scene: Scene, sceneRef: Ref<HTMLDivElement | undefined>) {
    this.scene = scene
    this.sceneRef = sceneRef
  }

  setRenderer(renderer: WebGLRenderer) {
    this.renderer.value = renderer
  }

  getRenderer() {
    return this.renderer.value
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
