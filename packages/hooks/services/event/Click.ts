import { Raycaster } from 'three'
import FtEvent from './FtEvent'
import type { Event, Intersection, Object3D } from 'three'
import type { Funs, FunsEvent, OnEventOptions } from './type'

export default class Click extends FtEvent {
  addListeners() {
    const dom = this.sceneRef.value!
    dom.addEventListener('pointerdown', this.hanlder.bind(this), false)
  }

  removeListeners() {
    const dom = this.sceneRef.value!
    dom.removeEventListener('pointerdown', this.hanlder, false)
  }

  on(callback: Funs, name: string, instance: Object3D, opts?: OnEventOptions) {
    if (this.sub.subscriber.length === 0) {
      this.addListeners()
    }
    const middleFun = (event: FunsEvent) => {
      let targets: Intersection<Object3D<Event>>[] = []
      if (this.options.global) {
        targets = event.targets.filter((item) => item.object.name === name)
      } else {
        const globalOpts = this.options ? this.options : {}
        const hereOpts = opts ? opts : {}
        const onOpts = {
          ...globalOpts,
          ...hereOpts,
        }
        const raycaster = new Raycaster(
          onOpts.origin,
          onOpts.direction,
          onOpts.near,
          onOpts.far
        )
        targets = this.genIntersects(
          raycaster,
          event.camera,
          [instance!],
          this.pointer,
          onOpts
        )
      }
      if (targets.length) {
        callback({
          ...event,
          targets,
        })
      }
    }
    this.sub.on(middleFun)
  }
}
