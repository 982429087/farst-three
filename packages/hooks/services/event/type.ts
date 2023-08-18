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
}
export type Funs = (e: FunsEvent) => void

export enum EventType {
  HOVER = 'hover',
  CLICK = 'click',
}

export type EventInstance = FtEvent

export type EventOptions = {
  global?: boolean
  origin?: Vector3
  direction?: Vector3
  near?: number
  far?: number
  recursive?: boolean
  optionalTarget?: Intersection<Object3D<Event>>[]
  objects?: Object3D<Event>[]
}

export type OnEventOptions = Omit<EventOptions, 'global'>
