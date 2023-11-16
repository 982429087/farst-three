import type { AnyFn } from '@vueuse/core'
export { NOOP } from '@vue/shared'

export function compose(...funcs: AnyFn[]) {
  const length = funcs.length
  if (length === 0) return (...args: any) => args
  if (length === 1) return funcs[0]
  // 从右往左执行
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}
