import { ref } from 'vue'
import { Raycaster, Vector2 } from 'three'
import Subscription from './Subscription'
import type { Camera, Event, Intersection, Object3D, Scene } from 'three'
import type { Funs, MiddleEvent } from './type'
import type { Ref } from 'vue'

export default class Hover {
  hoversSub = new Subscription()
  global: boolean
  sceneRef: Ref<HTMLDivElement | undefined> = ref()
  scene: Scene
  pointer: Vector2 = new Vector2(10000, 10000)

  constructor(scene: Scene, global = false) {
    this.global = global
    this.scene = scene
  }

  on(callback: Funs, name: string, instance: Object3D) {
    let hoverLastValueLength = 0

    const middleFun = (e: MiddleEvent) => {
      let targets: Intersection<Object3D<Event>>[] = []
      if (this.global) {
        targets = e.targets.filter((item) => item.object.name === name)
      } else {
        const raycaster = new Raycaster()
        targets = this.genIntersects(
          raycaster,
          e.camera,
          [instance!],
          this.pointer
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
    this.hoversSub.on(middleFun)
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
    const dom = this.sceneRef.value
    if (dom) {
      this.pointer.x = (e.offsetX / dom.offsetWidth) * 2 - 1
      this.pointer.y = -(e.offsetY / dom.offsetHeight) * 2 + 1
    }
  }
}
