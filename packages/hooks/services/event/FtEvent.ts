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
  raycaster: Raycaster | undefined
  camera: Camera | undefined
  position = new Vector3(0, 0, 0)
  plane = new Plane(new Vector3(0, 0, 1), 0)

  constructor(scene: Scene, options: EventOptions) {
    this.options = options
    this.scene = scene
  }

  setSceneRef(sceneRef: Ref<HTMLDivElement | undefined>) {
    this.sceneRef = sceneRef
  }

  setCamera(camera: Camera) {
    this.camera = camera
  }

  on(callback: Funs, instance: Object3D | Object3D[], opts?: OnEventOptions) {
    if (this.sub.subscriber.length === 0) {
      this.addListeners()
    }
    const middleFun = (event: FunsEvent) => {
      const globalOpts = this.options ? this.options : {}
      const hereOpts = opts ? opts : {}
      const onOpts = {
        ...globalOpts,
        ...hereOpts,
      }
      const raycaster = new Raycaster(
        onOpts.origin,
        onOpts.direction,
        onOpts.near,
        onOpts.far
      )
      this.updatePosition(raycaster)
      const targets = this.genIntersects(
        raycaster,
        event.camera,
        Array.isArray(instance) ? instance : [instance],
        this.pointer,
        onOpts
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
    this.sub.on(middleFun)
  }

  emit(e: FunsEvent) {
    this.sub.emit(e)
  }

  off(fun: Funs) {
    this.sub.off(fun)
  }

  updatePosition(raycaster: Raycaster) {
    if (!raycaster || !this.camera) return
    const coords = new Vector2(this.pointer.x, this.pointer.y)

    raycaster.setFromCamera(coords, this.camera)
    this.camera.getWorldDirection(this.plane.normal)
    raycaster.ray.intersectPlane(this.plane, this.position)
  }

  genIntersects(
    raycaster: Raycaster,
    camera: Camera,
    objects: Object3D<Event>[],
    pointer: Vector2,
    options: EventOptions
  ) {
    raycaster.setFromCamera(pointer, camera)
    const recursive = options.recursive ?? true
    return raycaster.intersectObjects(
      objects,
      recursive,
      options.optionalTarget
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
