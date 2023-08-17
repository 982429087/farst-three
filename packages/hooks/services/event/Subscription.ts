import type { AnyFun } from '@farst-three/utils'

// 发布订阅模式
export default class Subscription {
  private _subscriber: AnyFun[] = []

  on(fun: AnyFun) {
    this._subscriber.push(fun)
  }

  emit(...args: any[]) {
    this._subscriber.forEach((fun) => {
      fun(...args)
    })
  }

  off(fun: AnyFun) {
    const index = this._subscriber.indexOf(fun)
    if (index > -1) {
      this._subscriber.splice(index, 1)
    }
  }

  clear() {
    this._subscriber = []
  }

  get subscriber() {
    return this._subscriber
  }
}
