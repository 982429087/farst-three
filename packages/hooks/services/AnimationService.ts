import type { Camera, Scene, WebGLRenderer } from 'three'

export type AnimationFunsParams = {
  scene: Scene
  renderer: WebGLRenderer
  camera: Camera
}

export type AnimationFuns = (e: AnimationFunsParams) => void
export class AnimationService {
  private _animationFunMap: Map<string, AnimationFuns> = new Map()
  private _noRender = false

  get noRender() {
    return this._noRender
  }

  set noRender(val: boolean) {
    this._noRender = val
  }

  on(key: string, callback: AnimationFuns) {
    this._animationFunMap.set(key, callback)
  }

  off(key: string) {
    if (this._animationFunMap.has(key)) {
      this._animationFunMap.delete(key)
    } else {
      // eslint-disable-next-line no-console
      console.warn(`AnimationService off(): ${key} not found`)
    }
  }

  emit(e: AnimationFunsParams) {
    this._animationFunMap.forEach((callback) => {
      callback(e)
    })
  }

  destory() {
    this._animationFunMap.clear()
  }

  getAnimationFunMap() {
    return this._animationFunMap
  }
}
