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
  mouseMovePointer: Vector2 = new Vector2(10000, 10000)
  clickPointer: Vector2 = new Vector2(10000, 10000)
  clicked = false
  raycaster: Raycaster | undefined
  global: boolean
  camera: Camera | undefined

  constructor(scene: Scene, global = true) {
    this.scene = scene
    this.global = global
    if (global) {
      this.raycaster = new Raycaster()
    }
  }

  setSceneRef(sceneRef: Ref<HTMLDivElement | undefined>) {
    this.sceneRef = sceneRef
  }
  setCamera(camera: Camera) {
    this.camera = camera
  }

  on(key: EventKey, callback: Funs, name: string, instance: Object3D) {
    const funs = this._FunMap.get(key)
    // 利用闭包来保存变量
    let hoverLastValueLength = 0
    if (funs) {
      // 开始监听的条件是
      if (funs.length === 0 && key === EventKey.HOVER) {
        this.addHoverListeners()
      }
      if (funs.length === 0 && key === EventKey.CLICK) {
        this.addClickListeners()
      }
      this._FunMap.set(key, [
        ...funs,
        (e) => {
          let targets: Intersection<Object3D<Event>>[] = []

          if (key === EventKey.CLICK) {
            if (this.global) {
              targets = e.targets.filter((item) => item.object.name === name)
            } else {
              const raycaster = new Raycaster()
              targets = this.genIntersects(
                raycaster,
                e.camera,
                [instance!],
                this.clickPointer
              )
            }
            if (targets.length > 0) {
              callback({
                ...e,
                targets,
              })
            }
          }

          if (key === EventKey.HOVER) {
            if (this.global) {
              targets = e.targets.filter((item) => item.object.name === name)
            } else {
              const raycaster = new Raycaster()
              targets = this.genIntersects(
                raycaster,
                e.camera,
                [instance!],
                this.mouseMovePointer
              )
            }
            if (hoverLastValueLength !== targets.length) {
              callback({
                ...e,
                targets,
              })
              hoverLastValueLength = targets.length
            }
          }
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
      if (funs.length === 0 && key === EventKey.HOVER) {
        this.removeHoverListeners()
      }
      if (funs.length === 0 && key === EventKey.CLICK) {
        this.removeClickListeners()
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

  getAnimationFunMap() {
    return this._FunMap
  }

  isEmpty(key: EventKey) {
    return isEmpty(this._FunMap.has(key))
  }

  handlerPointer(pointer: Vector2, e: MouseEvent) {
    const dom = this.sceneRef.value
    if (dom) {
      pointer.x = (e.offsetX / dom.offsetWidth) * 2 - 1
      pointer.y = -(e.offsetY / dom.offsetHeight) * 2 + 1
    }
  }

  mouseMove(e: MouseEvent) {
    this.handlerPointer(this.mouseMovePointer, e)
  }
  click(e: MouseEvent) {
    this.handlerPointer(this.clickPointer, e)
    let clickIntersect: Intersection<Object3D<Event>>[] = []
    if (this.raycaster) {
      clickIntersect = this.genIntersects(
        this.raycaster,
        this.camera!,
        this.scene.children,
        this.clickPointer
      )
    }
    this.emit(EventKey.CLICK, {
      scene: this.scene,
      camera: this.camera!,
      targets: clickIntersect,
    })
  }

  addHoverListeners() {
    const dom = this.sceneRef.value!
    dom.addEventListener('mousemove', this.mouseMove.bind(this), false)
  }

  addClickListeners() {
    const dom = this.sceneRef.value!
    dom.addEventListener('pointerdown', this.click.bind(this), false)
  }

  removeHoverListeners() {
    const dom = this.sceneRef.value!
    dom.removeEventListener('mousemove', this.mouseMove, false)
  }

  removeClickListeners() {
    const dom = this.sceneRef.value!
    dom.removeEventListener('pointerdown', this.click, false)
  }

  genIntersects(
    raycaster: Raycaster,
    camera: Camera,
    objects: Object3D<Event>[],
    pointer: Vector2
  ) {
    raycaster.setFromCamera(pointer, camera)
    return raycaster.intersectObjects(objects, true)
  }

  calculateIntersects() {
    let mouseIntersect: Intersection<Object3D<Event>>[] = []
    if (this.raycaster) {
      mouseIntersect = this.genIntersects(
        this.raycaster,
        this.camera!,
        this.scene.children,
        this.mouseMovePointer
      )
    }

    this.emit(EventKey.HOVER, {
      scene: this.scene,
      camera: this.camera!,
      targets: mouseIntersect,
    })
  }

  calculate() {
    if (!this.isEmpty(EventKey.HOVER)) {
      this.calculateIntersects()
    }
  }

  destory() {
    this._FunMap.clear()
    this.removeHoverListeners()
    this.removeClickListeners()
  }
}
