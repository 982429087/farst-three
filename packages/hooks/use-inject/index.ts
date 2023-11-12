import { inject } from 'vue'
import type { ShallowRef } from 'vue'
export function useInjection<T>(key: symbol, defaultValue: any = undefined) {
  const injected = inject<T>(key, defaultValue)
  if (!injected && defaultValue !== null)
    console.warn(`injection ${String(key)} not found`)
  return injected as T
}
// TODO 应该是类型重载
export function useRefInjection<T>(key: symbol, defaultValue: any = undefined) {
  const injected = inject(key, defaultValue)
  if (!injected && defaultValue !== null)
    console.warn(`injection ${String(key)} not found`)
  return injected as ShallowRef<T>
}

export * from './api'
