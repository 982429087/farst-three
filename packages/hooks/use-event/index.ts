import { onBeforeUnmount } from 'vue'
import { compose, definePropType } from '@farst-three/utils'
import { useEventService } from '@farst-three/hooks'
import { EventType } from '../services'
import type { FunsEvent } from '@farst-three/hooks'
import type { Object3D } from 'three'
import type { AnyFun } from '@farst-three/utils'
import type { EventService, Funs, OnEventOptions } from '../services'

export const eventProps = {
  onMouseMove: {
    type: definePropType<FunsEvent>(Function),
  },
  onClick: {
    type: definePropType<FunsEvent>(Function),
  },
  onMouseMovePosition: {
    type: definePropType<FunsEvent>(Function),
  },
  clickOptions: {
    type: definePropType<OnEventOptions>(Object),
    default: () => ({}),
  },
  mouseMoveOptions: {
    type: definePropType<OnEventOptions>(Object),
    default: () => ({}),
  },
  onMouseMovePositionOptions: {
    type: definePropType<OnEventOptions>(Object),
    default: () => ({}),
  },
  cursor: {
    type: String,
  },
}
export const eventEmits = {
  hover: (e: FunsEvent) => e,
  click: (e: FunsEvent) => e,
  onMouseMovePosition: (e: FunsEvent) => e,
}

export function uesEvent<T extends Object3D | Object3D[]>(
  props: any,
  emit: AnyFun,
  instance: T,
  eventService?: EventService,
  hoverFn?: Funs,
  clickFn?: Funs,
  hoverPositionFn?: Funs,
  noDestroy?: boolean
) {
  const hoverEmit: Funs = (e) => emit('hover', e)
  const clickEmit: Funs = (e) => emit('click', e)
  const positionEmit: Funs = (e) => emit('hoverPosition', e)

  const hover: Funs = hoverFn ? compose(hoverEmit, hoverFn) : hoverEmit
  const click: Funs = clickFn ? compose(clickEmit, clickFn) : clickEmit
  const hoverPosition: Funs = hoverPositionFn
    ? compose(hoverPositionFn, positionEmit)
    : positionEmit

  const es = eventService || useEventService()

  if (props.onMouseMove || hoverFn)
    es.on(EventType.MOUSEMOVE, hover, instance, props.mouseMoveOptions)

  if (props.onClick || clickFn)
    es.on(EventType.CLICK, click, instance, props.clickOptions)

  if (props.onMouseMovePosition || hoverPositionFn)
    es.on(
      EventType.MOUSEMOVEPOSITION,
      hoverPosition,
      instance,
      props.onMouseMovePositionOptions
    )

  if (!noDestroy)
    onBeforeUnmount(() => {
      dispose()
    })

  function dispose() {
    if (props.onMouseMove) es.off(EventType.MOUSEMOVE, hover)
    if (props.onClick) es.off(EventType.CLICK, click)
    if (props.onMouseMovePosition)
      es.off(EventType.MOUSEMOVEPOSITION, hoverPosition)
  }

  return {
    dispose,
  }
}
