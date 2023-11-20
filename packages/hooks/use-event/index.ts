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
  mouseMove: (e: FunsEvent) => e,
  click: (e: FunsEvent) => e,
  onMouseMovePosition: (e: FunsEvent) => e,
}

export function uesEvent<T extends Object3D | Object3D[]>(
  props: any,
  emit: AnyFun,
  instance: T,
  eventService?: EventService,
  mouseMoveFn?: Funs,
  clickFn?: Funs,
  mouseMovePositionFn?: Funs,
  noDestroy?: boolean
) {
  const mouseMoveEmit: Funs = (e) => emit('mouseMove', e)
  const clickEmit: Funs = (e) => emit('click', e)
  const positionEmit: Funs = (e) => emit('mouseMovePosition', e)

  const mouseMove: Funs = mouseMoveFn
    ? compose(mouseMoveEmit, mouseMoveFn)
    : mouseMoveEmit
  const click: Funs = clickFn ? compose(clickEmit, clickFn) : clickEmit
  const mouseMovePosition: Funs = mouseMovePositionFn
    ? compose(mouseMovePositionFn, positionEmit)
    : positionEmit

  const es = eventService || useEventService()

  if (props.onMouseMove || mouseMoveFn)
    es.on(EventType.MOUSEMOVE, mouseMove, instance, props.mouseMoveOptions)

  if (props.onClick || clickFn)
    es.on(EventType.CLICK, click, instance, props.clickOptions)

  if (props.onMouseMovePosition || mouseMovePositionFn)
    es.on(
      EventType.MOUSEMOVEPOSITION,
      mouseMovePosition,
      instance,
      props.onMouseMovePositionOptions
    )

  if (!noDestroy)
    onBeforeUnmount(() => {
      dispose()
    })

  function dispose() {
    if (props.onMouseMove) es.off(EventType.MOUSEMOVE, mouseMove)
    if (props.onClick) es.off(EventType.CLICK, click)
    if (props.onMouseMovePosition)
      es.off(EventType.MOUSEMOVEPOSITION, mouseMovePosition)
  }

  return {
    dispose,
  }
}
