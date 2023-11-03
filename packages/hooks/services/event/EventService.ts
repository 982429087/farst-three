import { ref } from 'vue'
import Hover from './Hover'
import { EventType } from './type'
import Click from './Click'
import { HoverPosition } from './HoverPosition'
import type FtEvent from './FtEvent'
import type { EventOptions, Funs, OnEventOptions } from './type'
import type { Ref } from 'vue'
import type { Camera, Object3D, Scene } from 'three'

// 统一出口，将在<scene />上provide
export class EventService {
  sceneRef: Ref<HTMLDivElement | undefined> = ref()
  scene: Scene
  camera: Camera | undefined
  options: EventOptions
  instanceMap: Map<EventType, FtEvent> = new Map()

  constructor(scene: Scene, options: EventOptions) {
    this.scene = scene
    this.options = options
    // 注册事件, 每次有新的事件类型，就从这里注册
    this.instanceMap.set(EventType.HOVER, new Hover(scene, options))
    this.instanceMap.set(EventType.CLICK, new Click(scene, options))
    this.instanceMap.set(
      EventType.HOVERPOSITION,
      new HoverPosition(scene, options)
    )
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

  on(
    type: EventType,
    callback: Funs,
    instance: Object3D | Object3D[],
    opts?: OnEventOptions
  ) {
    this.instanceMap.get(type)?.on(callback, instance, opts)
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
