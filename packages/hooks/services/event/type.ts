import type Hover from './Hover'
import type { Camera, Event, Intersection, Object3D, Scene } from 'three'

export type FunsEvent<T> = {
  scene: Scene
  camera: Camera
  targets: T[]
}
export type Funs = <T>(e: FunsEvent<T>) => void

export type MiddleEvent = {
  scene: Scene
  camera: Camera
  targets: Intersection<Object3D<Event>>[]
}

export enum EventType {
  HOVER = 'hover',
  CLICK = 'click',
}

export type EventInstance = Hover
