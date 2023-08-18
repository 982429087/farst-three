import { ref } from 'vue'
import Hover from './Hover'
import { EventType } from './type'
import type { EventInstance, Funs } from './type'
import type { Ref } from 'vue'
import type { Camera, Object3D, Scene } from 'three'

export class EventService {
  sceneRef: Ref<HTMLDivElement | undefined> = ref()
  scene: Scene
  camera: Camera | undefined
  global: boolean
  instanceMap: Map<EventType, EventInstance> = new Map()

  constructor(scene: Scene, global = true) {
    this.scene = scene
    this.global = global
    this.instanceMap.set(EventType.HOVER, new Hover(scene, global))
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

  on(type: EventType, callback: Funs, name: string, instance: Object3D) {
    this.instanceMap.get(type)?.on(callback, name, instance)
  }

  off(type: EventType, callback: Funs) {
    this.instanceMap.get(type)?.off(callback)
  }

  destory() {
    this.instanceMap.forEach((instance) => {
      instance.destroy()
    })
  }
}
