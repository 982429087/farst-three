import { ref, watch } from 'vue'
import { isArray, isFunction, isObject } from '@farst-three/utils'
import type { Scene } from 'three'
import type { AnyFun } from '@farst-three/utils'

export function useOptions<T extends Record<string, any>, R extends AnyFun>(
  options: T,
  instance: any,
  scene: Scene,
  callback?: R
) {
  function setAllKeys(ops: T, lastKey: (string | number)[] = []) {
    /**
     *     if (isArray(options)) {
      for (const [index, item] of ops.entries()) {
        const keys: (string | number)[] = [...lastKey]
        keys.push(index)
        setAllKeys(item, keys)
      }
    } else
     */
    if (isObject(ops) && !isArray(ops)) {
      for (const key of Object.keys(ops)) {
        const item = ops[key]
        const keys: (string | number)[] = [...lastKey]
        keys.push(key)
        setAllKeys(item, keys)
      }
    } else {
      lastKey.reduce(
        (pre, cur, index) => {
          if (index === lastKey.length - 1) {
            if (isFunction(pre['instance'][cur])) {
              if (isArray(pre['options'][cur])) {
                pre['instance'][cur](...pre['options'][cur])
              } else if (isFunction(pre['options'][cur])) {
                const res = pre['options'][cur](scene, instance)
                // 是数组会展开传入，所以原本是数组的类型需要再套一层数组
                if (isArray(res)) pre['instance'][cur](...res)
                else pre['instance'][cur](res)
              } else {
                pre['instance'][cur](pre['options'][cur])
              }
            } else {
              if (isFunction(pre['options'][cur])) {
                pre['instance'][cur] = pre['options'][cur](scene, instance)
              } else {
                pre['instance'][cur] = pre['options'][cur]
              }
            }
          }
          return {
            instance: pre['instance'][cur],
            options: pre['options'][cur],
          }
        },
        { instance, options }
      )
    }
  }

  watch(
    () => options,
    (v) => {
      setAllKeys(ref(v).value)
      if (callback) callback(instance)
    },
    { immediate: true, deep: true }
  )
}
