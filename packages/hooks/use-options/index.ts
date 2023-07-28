import { ref, toRaw, unref, watch } from 'vue'
import { cloneDeep, isEqual, isFunction, isObject, transform } from 'lodash-es'
import { isArray } from '@farst-three/utils'
import type { Scene } from 'three'
import type { AnyFun } from '@farst-three/utils'

export function useOptions<T extends Record<string, any>, R extends AnyFun>(
  options: T,
  instance: any,
  scene: Scene,
  callback?: R
) {
  let lastValue: any
  /**
   * 只允许最后一层是普通值或者函数，对象类型将被解析无法赋值
   * @param ops
   * @param lastKey
   */
  function setAllKeys(ops: T, lastKey: (string | number)[] = []) {
    // ops上的属性是对象的时候会往后遍历
    if (isObject(ops) && !isArray(ops) && !isFunction(ops)) {
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
      console.log(`setAllKeys ${instance.type} ${lastKey.join('.')}`, options)
    }
  }

  watch(
    () => options,
    (v) => {
      const raw = toRaw(v)
      let diff = raw
      if (lastValue) diff = difference(diff, lastValue)
      setAllKeys(diff)
      if (callback) callback(instance)
      lastValue = cloneDeep(raw)
    },
    { immediate: true, deep: true }
  )
}

/**
 * https://gist.github.com/Yimiprod/7ee176597fef230d1451
 * This code is licensed under the terms of the MIT license
 *
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference<
  T extends Record<string, any>,
  K extends Record<string, any>
>(object: T, base: K) {
  function changes(object: any, base: any) {
    return transform(object, (result: any, value: any, key: any) => {
      if (!isEqual(value, base[key])) {
        result[key] =
          isObject(value) &&
          !isFunction(value) &&
          isObject(base[key]) &&
          !isFunction(value)
            ? changes(value, base[key])
            : value
      }
    })
  }
  return changes(object, base)
}
