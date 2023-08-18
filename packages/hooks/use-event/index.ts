import { onBeforeUnmount } from 'vue'
import { EventType } from '../services'
import type { Object3D } from 'three'
import type { AnyFun } from '@farst-three/utils'
import type { EventService, Funs } from '../services'

export function uesEvent<T extends Object3D>(
  props: any,
  emit: AnyFun,
  name: string,
  instance: T,
  eventService: EventService
) {
  const hover: Funs<T> = (e) => emit('hover', e)
  const click: Funs<T> = (e) => emit('click', e)

  if (props.onHover) {
    eventService.on<T>(EventType.HOVER, hover, name, instance)
  }

  if (props.onClick) {
    eventService.on<T>(EventType.CLICK, click, name, instance)
  }

  onBeforeUnmount(() => {
    eventService.off(EventType.HOVER, hover)
    eventService.off(EventType.CLICK, click)
  })
}
