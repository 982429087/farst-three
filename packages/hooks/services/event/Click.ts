import FtEvent from './FtEvent'
export default class Click extends FtEvent {
  addListeners() {
    const dom = this.sceneRef.value!
    dom.addEventListener('pointerup', this.hanlder.bind(this), false)
  }

  removeListeners() {
    const dom = this.sceneRef.value!
    dom.removeEventListener('pointerup', this.hanlder, false)
  }

  // on(callback: Funs, instance: Object3D | Object3D[], opts?: OnEventOptions) {
  //   if (this.sub.subscriber.length === 0) {
  //     this.addListeners()
  //   }
  //   const middleFun = (event: FunsEvent) => {
  //     let targets: Intersection<Object3D<Event>>[] = []
  //     const globalOpts = this.options ? this.options : {}
  //     const hereOpts = opts ? opts : {}
  //     const onOpts = {
  //       ...globalOpts,
  //       ...hereOpts,
  //     }
  //     const raycaster = new Raycaster(
  //       onOpts.origin,
  //       onOpts.direction,
  //       onOpts.near,
  //       onOpts.far
  //     )
  //     targets = this.genIntersects(
  //       raycaster,
  //       event.camera,
  //       Array.isArray(instance) ? instance : [instance],
  //       this.pointer,
  //       onOpts
  //     )
  //     if (targets.length || opts?.allTheTime) {
  //       callback({
  //         ...event,
  //         targets,
  //       })
  //     }
  //   }
  //   this.sub.on(middleFun)
  // }
}
