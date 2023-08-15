import { ref } from 'vue'
import { Raycaster, Vector2 } from 'three'
import { isEmpty } from '@farst-three/utils'
import type { Ref } from 'vue'
import type { Camera, Event, Intersection, Object3D, Scene } from 'three'
export type FunsEvent<T> = {
  scene: Scene
  camera: Camera
  targets: T[]
}
export type Funs = <T>(e: FunsEvent<T>) => void

type MiddleEvent = {
  scene: Scene
  camera: Camera
  targets: Intersection<Object3D<Event>>[]
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
  sceneRef: Ref<HTMLDivElement | undefined> = ref()
  scene: Scene
  pointer: Vector2 = new Vector2(10000, 10000)
  raycaster: Raycaster | undefined
  global: boolean

  constructor(scene: Scene, global = false) {
    this.scene = scene
    this.global = global
    if (global) {
      this.raycaster = new Raycaster()
    }
  }

  setSceneRef(sceneRef: Ref<HTMLDivElement | undefined>) {
    this.sceneRef = sceneRef
  }

  on(key: EventKey, callback: Funs, name: string, instance: Object3D) {
    const funs = this._FunMap.get(key)
    let hoverLastValueLength = 0
    if (funs) {
      if (funs.length === 0) {
        this.addHoverListeners()
      }
      this._FunMap.set(key, [
        ...funs,
        (e) => {
          let targets: Intersection<Object3D<Event>>[] = []
          if (this.global) {
            targets = e.targets.filter((item) => item.object.name === name)
          } else {
            const raycaster = new Raycaster()
            targets = this.genIntersects(raycaster, e.camera, [instance!])
          }
          if (key === EventKey.HOVER) {
            if (hoverLastValueLength !== targets.length) {
              callback({
                ...e,
                targets,
              })
            }
          }

          hoverLastValueLength = targets.length
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
      this.pointer.x = (e.offsetX / dom.offsetWidth) * 2 - 1
      this.pointer.y = -(e.offsetY / dom.offsetHeight) * 2 + 1
    }
  }

  addHoverListeners() {
    const dom = this.sceneRef.value
    if (dom) {
      dom.addEventListener('mousemove', this.mousemove.bind(this), false)
    }
  }

  removeHoverListeners() {
    const dom = this.sceneRef.value
    if (dom) {
      dom.removeEventListener('mousemove', this.mousemove, false)
    }
  }

  genIntersects(
    raycaster: Raycaster,
    camera: Camera,
    objects: Object3D<Event>[]
  ) {
    raycaster.setFromCamera(this.pointer, camera)
    return raycaster.intersectObjects(objects, true)
  }

  calculateIntersects(camera: Camera) {
    let intersect: Intersection<Object3D<Event>>[] = []
    if (this.raycaster) {
      intersect = this.genIntersects(
        this.raycaster,
        camera,
        this.scene.children
      )
    }

    this.emit(EventKey.HOVER, { scene: this.scene, camera, targets: intersect })
  }

  calculate(camera: Camera) {
    if (!this.isEmpty(EventKey.HOVER)) {
      this.calculateIntersects(camera)
    }
  }
}
