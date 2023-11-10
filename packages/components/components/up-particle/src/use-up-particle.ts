import { merge } from 'lodash'
import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  TextureLoader,
} from 'three'
import { random } from '@farst-three/utils'
import type { Scene } from 'three'

export type UpParticleOptions = {
  count: number
  range: [[number, number], [number, number], [number, number]]
  image?: string
  width?: number
  height?: number
  frame?: number
  column?: number
  row?: number
  speed?: number
}

const defaultOptions: UpParticleOptions = {
  count: 20,
  range: [
    [-60, 60],
    [-10, 30],
    [-60, 60],
  ],
  image: '/geo/up-particle.png',
  width: 180, // 显示的宽度
  height: 189, // 显示的高度
  frame: 9, //总共的帧数
  column: 9, // 序列图的列
  row: 1, // 序列图的行
  speed: 0.5, // 速度
}

export function useUpPatricle(scene: Scene, opts: UpParticleOptions) {
  const particleArr: Mesh[] = []
  const options = merge(defaultOptions, opts)

  function createSequenceFrame() {
    // 默认参数
    const geometry = new PlaneGeometry(options.width, options.height) //矩形平面
    const texture = new TextureLoader().load(options.image!) // 加载图片
    texture.repeat.set(1 / options.column!, 1 / options.row!) // 从图像上截图第一帧
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
    ;(mesh as any).updateSequenceFrame = () => {
      t += options.speed!
      if (t > options.frame!) t = 0
      c = options.column! - Math.floor(t % options.column!) - 1
      r = Math.floor((t / options.column!) % options.row!)
      texture.offset.x = c / options.column! // 动态更新纹理偏移 播放关键帧动画
      texture.offset.y = r / options.row! // 动态更新纹理偏移 播放关键帧动画
    }

    return mesh
  }

  function initParticle() {
    //设置范围
    const minX = options.range[0][0]
    const maxX = options.range[0][1]
    const minY = options.range[1][0]
    const maxY = options.range[1][1]
    const minZ = options.range[2][0]
    const maxZ = options.range[2][1]

    for (let i = 0; i < options.count; i++) {
      const particle = createSequenceFrame()
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

  function dispose() {
    scene.remove(...particleArr)
    particleArr.forEach((item) => {
      item.geometry.dispose()
      ;(item.material as MeshBasicMaterial).dispose()
    })
    particleArr.length = 0
  }
  initParticle()
  return {
    render,
    dispose,
  }
}
