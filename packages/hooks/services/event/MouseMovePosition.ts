import FtEvent from './FtEvent'
import type { Funs, FunsEvent } from './type'

export class MouseMovePosition extends FtEvent {
  genMiddleFn(callback: Funs) {
    return (event: FunsEvent) => {
      const raycaster = this.raycaster
      this.updatePosition(raycaster)
      callback({
        targets: [],
        camera: event.camera,
        scene: event.scene,
        position: this.position,
      })
    }
  }
}
