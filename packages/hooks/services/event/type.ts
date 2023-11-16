import type FtEvent from './FtEvent'
import type {
  Camera,
  Event,
  Intersection,
  Object3D,
  Scene,
  Vector3,
} from 'three'
export type FunsEvent = {
  scene: Scene
  camera: Camera
  targets: Intersection<Object3D<Event>>[]
  position?: Vector3
}
export type Funs = (e: FunsEvent) => FunsEvent | void

export enum EventType {
  MOUSEMOVE = 'MOUSEMOVE',
  CLICK = 'CLICK',
  MOUSEMOVEPOSITION = 'MOUSEMOVEPOSITION',
}

export type EventInstance = FtEvent

export type EventOptions = {
  origin?: Vector3
  direction?: Vector3
  near?: number
  far?: number
  recursive?: boolean
  optionalTarget?: Intersection<Object3D<Event>>[]
  objects?: Object3D<Event>[]
  allTheTime?: boolean
  wait?: number
}

export type OnEventOptions = Omit<EventOptions, 'global'>
