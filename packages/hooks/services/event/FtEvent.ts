import { ref } from 'vue'
import { Plane, Raycaster, Vector2, Vector3 } from 'three'
import Subscription from './Subscription'
import type { Camera, Event, Object3D, Scene } from 'three'
import type { EventOptions, Funs, FunsEvent, OnEventOptions } from './type'
import type { Ref } from 'vue'
export default class FtEvent {
  sub = new Subscription()
  options: EventOptions
  sceneRef: Ref<HTMLDivElement | undefined> = ref()
  scene: Scene
  pointer: Vector2 = new Vector2(10000000, 10000000)
  raycaster: Raycaster
  camera: Camera | undefined
  position = new Vector3(0, 0, 0)
  plane = new Plane(new Vector3(0, 0, 1), 0)

  constructor(scene: Scene, options: EventOptions) {
    this.options = options
    this.scene = scene
    this.raycaster = new Raycaster(
      options.origin,
      options.direction,
      options.near,
      options.far
    )
  }

  setSceneRef(sceneRef: Ref<HTMLDivElement | undefined>) {
    this.sceneRef = sceneRef
  }

  setCamera(camera: Camera) {
    this.camera = camera
  }

  setRaycasterOptions(opts?: OnEventOptions) {
    const onOpts = opts ? opts : {}
    const raycaster = this.raycaster
    if (onOpts.origin && onOpts.direction)
      raycaster.set(onOpts.origin, onOpts.direction)

    if (onOpts.near) raycaster.near = onOpts.near
    if (onOpts.far) raycaster.far = onOpts.far
  }

  genMiddleFn(
    callback: Funs,
    instance: Object3D | Object3D[],
    opts?: OnEventOptions
  ) {
    return (event: FunsEvent) => {
      const raycaster = this.raycaster
      // 这个步骤会阻塞shader的执行
      const targets = this.genIntersects(
        raycaster,
        event.camera,
        Array.isArray(instance) ? instance : [instance],
        this.pointer,
        opts
      )
      // 只有在有交集的时候才触发
      if (targets.length || opts?.allTheTime) {
        callback({
          ...event,
          targets,
          position: this.position,
        })
      }
    }
  }

  on(callback: Funs, instance: Object3D | Object3D[], opts?: OnEventOptions) {
    if (this.sub.subscriber.length === 0) this.addListeners() // 设置事件监听
    this.setRaycasterOptions(opts) // 设置射线参数
    const middleFun = this.genMiddleFn(callback, instance, opts) // 生成中间函数
    this.sub.on(middleFun) // 订阅事件
  }

  emit(e: FunsEvent) {
    this.sub.emit(e)
  }

  off(fun: Funs) {
    this.sub.off(fun)
  }

  // 更新射线位置
  updatePosition(raycaster: Raycaster) {
    if (!raycaster || !this.camera) return
    const coords = new Vector2(this.pointer.x, this.pointer.y)

    raycaster.setFromCamera(coords, this.camera)
    this.camera.getWorldDirection(this.plane.normal)
    raycaster.ray.intersectPlane(this.plane, this.position)
  }
  // 生成交集
  genIntersects(
    raycaster: Raycaster,
    camera: Camera,
    objects: Object3D<Event>[],
    pointer: Vector2,
    options?: EventOptions
  ) {
    raycaster.setFromCamera(pointer, camera)
    const recursive = options?.recursive ?? false
    return raycaster.intersectObjects(
      objects,
      recursive,
      options?.optionalTarget
    )
  }

  addListeners() {
    const dom = this.sceneRef.value!
    dom.addEventListener('mousemove', this.hanlder.bind(this), false)
  }

  removeListeners() {
    const dom = this.sceneRef.value!
    dom.removeEventListener('mousemove', this.hanlder, false)
  }

  hanlder(e: MouseEvent) {
    const dom = this.sceneRef.value!
    this.pointer.x = (e.offsetX / dom.offsetWidth) * 2 - 1
    this.pointer.y = -(e.offsetY / dom.offsetHeight) * 2 + 1

    this.emit({
      scene: this.scene,
      camera: this.camera!,
      targets: [],
      position: this.position,
    })
  }

  destroy() {
    this.removeListeners()
    this.sub.clear()
  }
}
