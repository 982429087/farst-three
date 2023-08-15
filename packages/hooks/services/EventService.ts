import { Raycaster, Vector2 } from 'three'
import { isEmpty } from '@farst-three/utils'
import type { Camera, Event, Intersection, Object3D, Scene } from 'three'
import type { Ref } from 'vue'
export type FunsEvent<T> = {
  scene: Scene
  camera: Camera
  target: T
}
export type Funs = <T>(e: FunsEvent<T>) => void
type MiddleEvent = {
  scene: Scene
  camera: Camera
  target: Intersection<Object3D<Event>>[]
}
type MiddleFuns = (e: MiddleEvent) => void

export enum EventKey {
  CLICK = 'click',
  HOVER = 'hover',
}

export class EventService {
  private _FunMap: Map<EventKey, MiddleFuns[]> = new Map([
    [EventKey.CLICK, []],
    [EventKey.HOVER, []],
  ])
  sceneRef: Ref<HTMLDivElement | undefined>
  scene: Scene
  pointer = new Vector2(10000, 10000)
  raycaster = new Raycaster()

  constructor(scene: Scene, sceneRef: Ref<HTMLDivElement | undefined>) {
    this.scene = scene
    this.sceneRef = sceneRef
  }

  on(key: EventKey, callback: Funs, name: string) {
    const funs = this._FunMap.get(key)
    if (funs) {
      if (funs.length === 0) {
        this.addHoverListeners()
      }
      this._FunMap.set(key, [
        ...funs,
        (e: MiddleEvent) => {
          callback({
            ...e,
            target: e.target.filter((item) => item.object.name === name),
          })
        },
      ])
    } else {
      // eslint-disable-next-line no-console
      console.warn(` can't set ${key}, current funs ${funs}`)
    }
  }

  off(key: EventKey, fn: Funs) {
    if (this._FunMap.has(key)) {
      const funs = this._FunMap.get(key)!
      const index = funs.indexOf(fn)
      if (index !== -1) {
        funs.splice(index, 1)
      }
      if (funs.length === 0) {
        this.removeHoverListeners()
      }
      this._FunMap.set(key, funs)
    } else {
      // eslint-disable-next-line no-console
      console.warn(`EventService off(): ${key} not found`)
    }
  }

  emit(key: EventKey, e: MiddleEvent) {
    const funs = this._FunMap.get(key)
    if (funs) {
      funs.forEach((item) => {
        item(e)
      })
    } else {
      // eslint-disable-next-line no-console
      console.warn(`current funs ${funs}`)
    }
  }

  destory() {
    this._FunMap.clear()
    this.removeHoverListeners()
  }

  getAnimationFunMap() {
    return this._FunMap
  }

  isEmpty(key: EventKey) {
    return isEmpty(this._FunMap.has(key))
  }

  mousemove(e: MouseEvent) {
    const dom = this.sceneRef.value
    if (dom) {
      this.pointer.x = (e.clientX / dom.offsetWidth) * 2 - 1
      this.pointer.y = -(e.clientY / dom.offsetHeight) * 2 + 1
    }
  }

  addHoverListeners() {
    const dom = this.sceneRef.value
    if (dom) {
      dom.addEventListener('mousemove', this.mousemove, false)
    }
  }

  removeHoverListeners() {
    const dom = this.sceneRef.value
    if (dom) {
      dom.removeEventListener('mousemove', this.mousemove, false)
    }
  }
  calculateIntersects(camera: Camera) {
    this.raycaster.setFromCamera(this.pointer, camera)
    const intersect = this.raycaster.intersectObjects(this.scene.children, true)
    this.emit(EventKey.HOVER, { scene: this.scene, camera, target: intersect })
  }

  calculate() {
    if (!this.isEmpty(EventKey.HOVER)) {
      this.calculateIntersects(this.scene.children[0] as Camera)
    }
  }
}
