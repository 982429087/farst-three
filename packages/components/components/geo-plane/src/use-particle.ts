import { cloneDeep, isObject } from 'lodash'
import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  TextureLoader,
} from 'three'
import type { Scene } from 'three'

export function usePatricle(scene: Scene) {
  const particleArr: Mesh[] = []
  function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  function deepMerge(target: any, source: any) {
    target = cloneDeep(target)
    for (const key in source) {
      if (key in target) {
        // 对象的处理
        if (isObject(source[key])) {
          if (!isObject(target[key])) {
            target[key] = source[key]
          } else {
            target[key] = deepMerge(target[key], source[key])
          }
        } else {
          target[key] = source[key]
        }
      } else {
        target[key] = source[key]
      }
    }
    return target
  }

  function createSequenceFrame(opt: any) {
    // 默认参数
    const options = deepMerge(
      {
        image: '',
        width: 200, // 显示的宽度
        height: 200, // 显示的高度
        frame: 60, //总共的帧数
        column: 10, // 序列图的列
        row: 6, // 序列图的行
        speed: 0.5, // 速度
      },
      opt
    )
    const geometry = new PlaneGeometry(options.width, options.height) //矩形平面
    const texture = new TextureLoader().load(options.image) // 加载图片
    texture.repeat.set(1 / options.column, 1 / options.row) // 从图像上截图第一帧
    const material = new MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 1,
      side: DoubleSide,
      depthWrite: false, // 是否对深度缓冲区有任何的影响
    })
    const mesh = new Mesh(geometry, material)

    let r = 0 // 当前行
    let c = 0 // 当前列
    let t = 0 // 时间
    ;(mesh as any).updateSequenceFrame = (time: number) => {
      t += options.speed
      if (t > options.frame) t = 0
      c = options.column - Math.floor(t % options.column) - 1
      r = Math.floor((t / options.column) % options.row)
      texture.offset.x = c / options.column // 动态更新纹理偏移 播放关键帧动画
      texture.offset.y = r / options.row // 动态更新纹理偏移 播放关键帧动画
    }

    return mesh
  }

  function initParticle() {
    //设置范围
    const minX = -60
    const maxX = 60
    const minY = -10
    const maxY = 30
    const minZ = -60
    const maxZ = 60

    for (let i = 0; i < 20; i++) {
      const particle = createSequenceFrame({
        image: '/geo/上升粒子1.png',
        width: 180,
        height: 189,
        frame: 9,
        column: 9,
        row: 1,
        speed: 0.5,
      })
      const particleScale = random(5, 10) / 100
      particle.scale.set(particleScale, particleScale, particleScale)
      const x = random(minX, maxX)
      const y = random(minY, maxY)
      const z = random(minZ, maxZ)
      particle.position.set(x, y, z)
      particleArr.push(particle)
    }
    scene.add(...particleArr)
    return particleArr
  }

  function render() {
    if (particleArr.length) {
      for (const element of particleArr) {
        ;(element as any).updateSequenceFrame()
        element.position.y += 0.15
        if (element.position.y >= 30) {
          element.position.y = -10
        }
      }
    }
  }
  initParticle()
  return {
    render,
  }
}
