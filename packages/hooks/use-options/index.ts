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
  /**
   * 只允许最后一层是普通值或者函数，对象类型将被解析无法赋值
   * @param ops
   * @param lastKey
   */
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
    // ops上的属性是对象的时候会往后遍历
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
            // instance 本身是函数类型的情况
            if (isFunction(pre['instance'][cur])) {
              // options是数组的情况，展开传入
              if (isArray(pre['options'][cur])) {
                pre['instance'][cur](...pre['options'][cur])
                // options是函数的情况
              } else if (isFunction(pre['options'][cur])) {
                const res = pre['options'][cur](scene, instance)
                // 函数返回值是数组会展开传入，所以原本是数组的类型需要再套一层数组
                if (isArray(res)) pre['instance'][cur](...res)
                // 函数返回值是普通值
                else pre['instance'][cur](res)
                // options是对象或者普通值的情况
              } else {
                pre['instance'][cur](pre['options'][cur])
              }
            } else {
              // 当instance上的属性不是方法的时候，直接赋值，如果是函数，需要执行函数并赋值函数返回值
              // 对象类型可以使用函数返回值来赋值
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
      console.log(`setAllKeys ${lastKey.join('.')}`, instance)
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
