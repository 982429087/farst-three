import { ref } from 'vue'
import Hover from './Hover'
import { EventType } from './type'
import Click from './Click'
import type FtEvent from './FtEvent'
import type { Funs } from './type'
import type { Ref } from 'vue'
import type { Camera, Object3D, Scene } from 'three'

// 统一出口，将在<scene />上provide
export class EventService {
  sceneRef: Ref<HTMLDivElement | undefined> = ref()
  scene: Scene
  camera: Camera | undefined
  global: boolean
  instanceMap: Map<EventType, FtEvent> = new Map()

  constructor(scene: Scene, global = true) {
    this.scene = scene
    this.global = global
    // 注册事件, 每次有新的事件类型，就从这里注册
    this.instanceMap.set(EventType.HOVER, new Hover(scene, global))
    this.instanceMap.set(EventType.CLICK, new Click(scene, global))
  }

  setSceneRef(sceneRef: Ref<HTMLDivElement | undefined>) {
    this.instanceMap.forEach((instance) => {
      instance.setSceneRef(sceneRef)
    })
  }
  setCamera(camera: Camera) {
    this.instanceMap.forEach((instance) => {
      instance.setCamera(camera)
    })
  }

  on<T>(type: EventType, callback: Funs<T>, name: string, instance: Object3D) {
    this.instanceMap.get(type)?.on(callback, name, instance)
  }

  off(type: EventType, callback: Funs<any>) {
    this.instanceMap.get(type)?.off(callback)
  }

  destory() {
    this.instanceMap.forEach((instance) => {
      instance.destroy()
    })
  }
}
