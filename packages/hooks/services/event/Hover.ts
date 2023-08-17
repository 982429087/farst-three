import { ref } from 'vue'
import { Raycaster, Vector2 } from 'three'
import Subscription from './Subscription'
import type { Camera, Event, Intersection, Object3D, Scene } from 'three'
import type { Funs, MiddleEvent } from './type'
import type { Ref } from 'vue'

// 这种写法是为了 全局计算的时候，不用每次都生成一个新的raycaster
export default class Hover {
  hoversSub = new Subscription()
  global: boolean
  sceneRef: Ref<HTMLDivElement | undefined> = ref()
  scene: Scene
  pointer: Vector2 = new Vector2(10000, 10000)
  raycaster: Raycaster | undefined
  camera: Camera | undefined

  constructor(scene: Scene, global = false) {
    this.global = global
    this.scene = scene
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
  on(callback: Funs, name: string, instance: Object3D) {
    let hoverLastValueLength = 0
    if (this.hoversSub.subscriber.length === 0) {
      this.addHoverListeners()
    }
    const middleFun = (event: MiddleEvent) => {
      let targets: Intersection<Object3D<Event>>[] = []
      if (this.global) {
        targets = event.targets.filter((item) => item.object.name === name)
      } else {
        const raycaster = new Raycaster()
        targets = this.genIntersects(
          raycaster,
          event.camera,
          [instance!],
          this.pointer
        )
      }
      if (hoverLastValueLength !== targets.length) {
        callback({
          ...event,
          targets,
        })
        hoverLastValueLength = targets.length
      }
    }
    this.hoversSub.on(middleFun)
  }

  emit(e: MiddleEvent) {
    this.hoversSub.emit(e)
  }

  off(fun: Funs) {
    this.hoversSub.off(fun)
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

  addHoverListeners() {
    const dom = this.sceneRef.value!
    dom.addEventListener('mousemove', this.mouseMove.bind(this), false)
  }

  removeHoverListeners() {
    const dom = this.sceneRef.value!
    dom.removeEventListener('mousemove', this.mouseMove, false)
  }

  mouseMove(e: MouseEvent) {
    const dom = this.sceneRef.value!
    this.pointer.x = (e.offsetX / dom.offsetWidth) * 2 - 1
    this.pointer.y = -(e.offsetY / dom.offsetHeight) * 2 + 1

    this.calculateIntersects()
  }

  calculateIntersects() {
    let mouseIntersect: Intersection<Object3D<Event>>[] = []
    if (this.raycaster) {
      mouseIntersect = this.genIntersects(
        this.raycaster,
        this.camera!,
        this.scene.children,
        this.pointer
      )
    }

    this.emit({
      scene: this.scene,
      camera: this.camera!,
      targets: mouseIntersect,
    })
  }

  destroy() {
    this.removeHoverListeners()
    this.hoversSub.clear()
  }
}
