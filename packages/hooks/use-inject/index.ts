import { inject } from 'vue'
import type { ShallowRef } from 'vue'
export function useInjection<T>(key: symbol) {
  const injected = inject<ShallowRef<T>>(key)
  if (!injected) throw new Error(`injection ${String(key)} not found`)
  return injected.value as T
}
