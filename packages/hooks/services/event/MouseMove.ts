import FtEvent from './FtEvent'
import type { Intersection, Object3D } from 'three'
import type { Funs, FunsEvent } from './type'

// 这种写法是为了 全局计算的时候，不用每次都生成一个新的raycaster
export default class MouseMove extends FtEvent {
  executeCallback(
    callback: Funs,
    event: FunsEvent,
    targets: Intersection<Object3D<Event>>[]
  ) {
    callback({
      ...event,
      targets,
    })
  }
}
