import { merge } from 'lodash'
import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  TextureLoader,
} from 'three'
import { random } from '@farst-three/utils'
import type { MeshBasicMaterialParameters, Scene } from 'three'

export type UpParticleOptions = {
  count?: number
  minX?: number
  maxX?: number
  minY?: number
  maxY?: number
  minZ?: number
  maxZ?: number
  texture?: string
  width?: number
  height?: number
  column?: number
  row?: number
  textureSpeed?: number
  speed?: number
  materialOptions?: MeshBasicMaterialParameters
  geometryOptions?: ConstructorParameters<typeof PlaneGeometry>
}

export function useUpPatricle(scene: Scene, opts?: UpParticleOptions) {
  const particles: Mesh[] = []
  const defaultOptions: UpParticleOptions = {
    texture: '/geo/up-particle.png',
    count: 20,
    maxX: 60,
    minX: -60,
    maxY: 30,
    minY: -10,
    maxZ: 60,
    minZ: -60,
    column: 9,
    row: 1,
    speed: 0.5,
    textureSpeed: 0.15,
    geometryOptions: [180, 189],
  }
  const options = merge(defaultOptions, opts)
  const minX = options.minX!
  const maxX = options.maxX!
  const minY = options.minY!
  const maxY = options.maxY!
  const minZ = options.minZ!
  const maxZ = options.maxZ!
  function createSequenceFrame() {
    // 默认参数
    const geometry = new PlaneGeometry(...(options.geometryOptions as any[]))
    const texture = new TextureLoader().load(options.texture!)
    texture.repeat.set(1 / options.column!, 1 / options.row!) // 使用纹理的 1/9 来平铺
    const material = new MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 1,
      side: DoubleSide,
      depthWrite: false, // 是否对深度缓冲区有任何的影响
      ...options.materialOptions,
    })
    const mesh = new Mesh(geometry, material)

    let r = 0
    let c = 0
    let t = 0
    ;(mesh as any).updateSequenceFrame = () => {
      t += options.textureSpeed!
      if (t > options.column!) t = 0
      c = options.column! - Math.floor(t % options.column!) - 1
      r = Math.floor((t / options.column!) % options.row!)

      texture.offset.x = c / options.column! // 贴图坐标归一化，所以这里要除以总列数
      texture.offset.y = r / options.row!
    }

    return mesh
  }

  function initParticle() {
    //设置范围

    for (let i = 0; i < options.count!; i++) {
      const particle = createSequenceFrame()
      const particleScale = random(5, 10) / 100
      particle.scale.set(particleScale, particleScale, particleScale)
      const x = random(minX, maxX)
      const y = random(minY, maxY)
      const z = random(minZ, maxZ)
      particle.position.set(x, y, z)
      particles.push(particle)
    }
    scene.add(...particles)
    return particles
  }

  function render() {
    if (particles.length) {
      for (const element of particles) {
        ;(element as any).updateSequenceFrame()
        element.position.y += options.speed!
        if (element.position.y >= maxY) {
          element.position.y = minY
        }
      }
    }
  }

  function dispose() {
    scene.remove(...particles)
    particles.forEach((item) => {
      item.geometry.dispose()
      ;(item.material as MeshBasicMaterial).dispose()
    })
    particles.length = 0
  }
  initParticle()
  return {
    render,
    dispose,
    particles,
  }
}
