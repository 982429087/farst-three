import { Raycaster } from 'three'
import FtEvent from './FtEvent'
import type { Event, Intersection, Object3D } from 'three'
import type { Funs, MiddleEvent } from './type'

export default class Click extends FtEvent {
  addListeners() {
    const dom = this.sceneRef.value!
    dom.addEventListener('pointerdown', this.hanlder.bind(this), false)
  }

  removeListeners() {
    const dom = this.sceneRef.value!
    dom.removeEventListener('pointerdown', this.hanlder, false)
  }

  on<T>(callback: Funs<T>, name: string, instance: Object3D) {
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
      if (targets.length) {
        callback({
          ...event,
          targets: targets as unknown as T[],
        })
      }
    }
    this.sub.on(middleFun)
  }
}
