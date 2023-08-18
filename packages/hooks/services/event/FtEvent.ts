import { ref } from 'vue'
import { Raycaster, Vector2 } from 'three'
import Subscription from './Subscription'
import type { Camera, Event, Intersection, Object3D, Scene } from 'three'
import type { Funs, MiddleEvent } from './type'
import type { Ref } from 'vue'
export default class FtEvent {
  sub = new Subscription()
  global: boolean
  sceneRef: Ref<HTMLDivElement | undefined> = ref()
  scene: Scene
  pointer: Vector2 = new Vector2(10000, 10000)
  raycaster: Raycaster | undefined
  camera: Camera | undefined

  constructor(scene: Scene, global: boolean) {
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
  on<T>(callback: Funs<T>, name: string, instance: Object3D) {
    let hoverLastValueLength = 0
    if (this.sub.subscriber.length === 0) {
      this.addListeners()
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
          targets: targets as unknown as T[],
        })
        hoverLastValueLength = targets.length
      }
    }
    this.sub.on(middleFun)
  }

  emit(e: MiddleEvent) {
    this.sub.emit(e)
  }

  off(fun: Funs<any>) {
    this.sub.off(fun)
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

  addListeners() {
    const dom = this.sceneRef.value!
    dom.addEventListener('mousemove', this.hanlder.bind(this), false)
  }

  removeListeners() {
    const dom = this.sceneRef.value!
    dom.removeEventListener('mousemove', this.hanlder, false)
  }

  hanlder(e: MouseEvent) {
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
    this.removeListeners()
    this.sub.clear()
  }
}
