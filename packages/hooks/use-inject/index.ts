import { inject } from 'vue'
export function useInjection<T>(key: symbol, defaultValue: any = undefined) {
  const injected = inject<T>(key, defaultValue)
  if (!injected && defaultValue !== null)
    throw new Error(`injection ${String(key)} not found`)
  return injected as T
}

export * from './api'
