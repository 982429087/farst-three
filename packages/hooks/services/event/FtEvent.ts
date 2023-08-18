import { ref } from 'vue'
import { Raycaster, Vector2 } from 'three'
import Subscription from './Subscription'
import type { Camera, Event, Intersection, Object3D, Scene } from 'three'
import type { EventOptions, Funs, FunsEvent, OnEventOptions } from './type'
import type { Ref } from 'vue'
export default class FtEvent {
  sub = new Subscription()
  options: EventOptions
  sceneRef: Ref<HTMLDivElement | undefined> = ref()
  scene: Scene
  pointer: Vector2 = new Vector2(10000, 10000)
  raycaster: Raycaster | undefined
  camera: Camera | undefined

  constructor(scene: Scene, options: EventOptions) {
    this.options = options
    this.scene = scene
    if (options.global) {
      this.raycaster = new Raycaster(
        options.origin,
        options.direction,
        options.near,
        options.far
      )
    }
  }

  setSceneRef(sceneRef: Ref<HTMLDivElement | undefined>) {
    this.sceneRef = sceneRef
  }
  setCamera(camera: Camera) {
    this.camera = camera
  }
  on(callback: Funs, name: string, instance: Object3D, opts?: OnEventOptions) {
    let hoverLastValueLength = 0
    if (this.sub.subscriber.length === 0) {
      this.addListeners()
    }
    const middleFun = (event: FunsEvent) => {
      let targets: Intersection<Object3D<Event>>[] = []
      if (this.options.global) {
        targets = event.targets.filter((item) => item.object.name === name)
      } else {
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
        targets = this.genIntersects(
          raycaster,
          event.camera,
          [instance!],
          this.pointer,
          onOpts
        )
      }
      if (hoverLastValueLength !== targets.length) {
        callback({
          ...event,
          targets,
        })
        hoverLastValueLength = targets.length
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

    this.calculateIntersects()
  }

  calculateIntersects() {
    let mouseIntersect: Intersection<Object3D<Event>>[] = []
    if (this.raycaster) {
      const objects = this.options.objects || this.scene.children
      mouseIntersect = this.genIntersects(
        this.raycaster,
        this.camera!,
        objects,
        this.pointer,
        this.options
      )
    }

    this.emit({
      scene: this.scene,
      camera: this.camera!,
      targets: mouseIntersect,
    })
  }

  destroy() {
    this.removeListeners()
    this.sub.clear()
  }
}
