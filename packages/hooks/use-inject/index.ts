import { inject } from 'vue'
export function useInjection<T>(key: symbol) {
  const injected = inject<T>(key)
  if (!injected) throw new Error(`injection ${String(key)} not found`)
  return injected as T
}

export * from './api'
