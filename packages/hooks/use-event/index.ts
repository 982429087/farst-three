import { onBeforeUnmount } from 'vue'
import { definePropType } from '@farst-three/utils'
import { useEventService } from '@farst-three/hooks'
import { EventType } from '../services'
import type { FunsEvent } from '@farst-three/hooks'
import type { Object3D } from 'three'
import type { AnyFun } from '@farst-three/utils'
import type { EventService, Funs } from '../services'

export const eventProps = {
  onHover: {
    type: definePropType<FunsEvent>(Function),
  },
  onClick: {
    type: definePropType<FunsEvent>(Function),
  },
}
export const eventEmits = {
  hover: (e: FunsEvent) => e,
  click: (e: FunsEvent) => e,
}

export function uesEvent<T extends Object3D | Object3D[]>(
  props: any,
  emit: AnyFun,
  instance: T,
  eventService?: EventService
) {
  const hover: Funs = (e) => emit('hover', e)
  const click: Funs = (e) => emit('click', e)
  const es = eventService || useEventService()
  if (props.onHover) {
    es.on(EventType.HOVER, hover, instance, props.eventOptions)
  }

  if (props.onClick) {
    es.on(EventType.CLICK, click, instance, props.eventOptions)
  }

  onBeforeUnmount(() => {
    if (props.onHover) es.off(EventType.HOVER, hover)
    if (props.onClick) es.off(EventType.CLICK, click)
  })
}
