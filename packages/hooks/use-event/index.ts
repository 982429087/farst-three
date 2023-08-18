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
  const hover: Funs = (e) => emit('hover', e)
  const click: Funs = (e) => emit('click', e)

  if (props.onHover) {
    eventService.on(EventType.HOVER, hover, name, instance, props.eventOptions)
  }

  if (props.onClick) {
    eventService.on(EventType.CLICK, click, name, instance, props.eventOptions)
  }

  onBeforeUnmount(() => {
    if (props.onHover) eventService.off(EventType.HOVER, hover)
    if (props.onClick) eventService.off(EventType.CLICK, click)
  })
}
