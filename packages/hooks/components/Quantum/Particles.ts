import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'
import { fragShader, vertShader } from './shader'
import type { WinInfo } from './WindowManager'
import type { Material, PerspectiveCamera, Points, Scene } from 'three'

export type ConstructorParams = {
  camera: PerspectiveCamera
  scene: Scene
  wins: WinInfo[]
  win: WinInfo
}

export type Offset = {
  x: number
  y: number
}

const noise3D = createNoise3D()

export class Particles {
  camera: PerspectiveCamera
  scene: Scene
  wins: WinInfo[] = []
  win = {} as WinInfo
  outerR = 200 // 粒子系统外部半径
  innerR = 80 // 粒子系统内部半径
  outerNum = 4000 // 外部粒子数量
  innerNum = 2000 // 内部粒子数量
  beamNum = 2000 // 粒子光束数量
  _colors = [0x00ffff, 0x00ff00, 0x00ffff, 0xffc0cb, 0xff00ff]
  outerParticles: Points | null = null
  hillParticles: Points | null = null
  innerParticles: Points | null = null
  particleBeams: Record<string, any> = {}

  constructor({ camera, scene, wins, win }: ConstructorParams) {
    this.camera = camera
    this.scene = scene
    this.wins = wins
    this.win = win
    this.init()
  }

  init() {
    const num = this.win.id % 2
    const outerSphere = this.createSphere(
      this.outerR,
      'outer',
      this._colors[num],
      0
    )
    const hillSphere = this.createSphere(
      this.outerR,
      'hill',
      this._colors[num],
      this.outerNum * 2
    )
    const innerSphere = this.createSphere(
      this.innerR,
      'inner',
      this._colors[num === 0 ? 1 : 0],
      this.innerNum / 2
    )

    // 内部粒子系统是否显示
    // innerSphere.visible = this.wins.length > 1;
    // innerSphere.visible = false;
    // outerSphere.visible = false;
    // hillSphere.visible = false;

    hillSphere.userData._id = this.win.id
    outerSphere.userData._id = this.win.id
    innerSphere.userData._id = this.win.id
    this.outerParticles = outerSphere
    this.hillParticles = hillSphere
    this.innerParticles = innerSphere
    this.particleBeams = {} // 存储所有粒子光束
    // 默认世界坐标 (0,0,0)
    this.scene.add(hillSphere)
    this.scene.add(outerSphere)
    this.scene.add(innerSphere)

    // 除了当前窗口, 有几个窗口, 就创建几个粒子光束
    this.wins.forEach(($win) => {
      if ($win.id === this.win.id) return
      this.createBeam(num, $win)
    })
  }

  createBeam(num: number, win: WinInfo) {
    if (this.particleBeams[`${win.id}`]) return

    const particleBeams = this.createSphere(
      this.outerR,
      'beam',
      this._colors[num],
      this.beamNum
    )

    particleBeams.userData._id = win.id
    particleBeams.userData._pos = [
      ...particleBeams.geometry.attributes.position.array,
    ] // 记录原始坐标
    particleBeams.userData._progress = Array.from({
      length: particleBeams.userData._pos.length,
    }).fill(0) // 当前粒子运动进度
    particleBeams.userData._delay = particleBeams.userData._pos.map(
      (_: any, i: number) => {
        const delay = (i / particleBeams.userData._pos.length) * 8 // 调整延迟时间

        return delay
      }
    ) // 粒子延迟
    this.particleBeams[`${win.id}`] = particleBeams
    this.scene.add(particleBeams)
  }

  createSphere(r: number, name: string, color: string | number, num: number) {
    const geo =
      name === 'hill'
        ? this.hillPointsOnSphere(r, color, num)
        : this.distributePointsOnSphere(r, color, name, num)
    const material = new THREE.ShaderMaterial({
      // color: 0xE74C3C,
      // size: 4,
      // opacity: 0.8,
      blending: THREE.AdditiveBlending,
      // 禁用深度测试，使点可以叠加
      depthTest: false,
      depthWrite: false, // 避免粒子排序错误导致的闪烁
      transparent: true,
      vertexColors: true,
      vertexShader: vertShader,
      fragmentShader: fragShader,
    })

    const points = new THREE.Points(geo, material)

    points.frustumCulled = false // 防止被剔除
    points.name = `${name}-particles`
    return points
  }

  distributePointsOnSphere(
    r: number,
    colour: number | string,
    name: string,
    num?: number
  ) {
    const n = num || this.outerNum
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(n * 3) // 粒子坐标
    const colors = new Float32Array(n * 3)
    const opacity = new Float32Array(n)
    const sizes = new Float32Array(n)
    const color = new THREE.Color(colour || 0xffffff)
    const position = new THREE.Vector3()
    const noise = name === 'outer' ? 15 : 5

    // 计算每个点在球体表面上的坐标
    for (let i = 0; i < n; i++) {
      position
        .randomDirection()
        .multiplyScalar(
          r + Math.random() * noise * (Math.random() > 0.5 ? 1 : -1) * 2
        )

      // 添加点的坐标到数组中
      const index = i * 3
      const alpha = Math.random()
      const size = +Math.random().toFixed(4) + 0.05

      opacity[i] = alpha > 0.85 ? 0.5 : alpha
      sizes[i] = (size > 0.4 ? 0.4 : size) / 2

      if (name === 'beam') {
        opacity[i] = 0
        sizes[i] = sizes[i] * 1.25
      }

      if (name === 'inner') {
        opacity[i] = 0
      }

      positions[index] = position.x
      positions[index + 1] = position.y
      positions[index + 2] = position.z
      colors[index] = color.r
      colors[index + 1] = color.g
      colors[index + 2] = color.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('alpha', new THREE.BufferAttribute(opacity, 1))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geometry.computeBoundingSphere()

    return geometry
  }

  hillPointsOnSphere(r: number, colour: string | number, n: number) {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(n * 3) // 粒子坐标
    const colors = new Float32Array(n * 3)
    const opacity = new Float32Array(n)
    const sizes = new Float32Array(n)
    const color = new THREE.Color(colour || 0xffffff)
    const scale = 0.01 // 更小的值将扩大噪声图案，将产生较宽的山脊和较少的山脊数量
    const ridgeSharpness = 50 // 控制山脊的锐利度，较高的值会让山脊更尖锐
    const minRidgeValleyThreshold = 0.2 // 表示粒子需要聚集成为山脊的最小高度

    // 计算每个点在球体表面上的坐标
    for (let i = 0; i < n; i++) {
      // 添加点的坐标到数组中
      const index = i * 3
      const alpha = Math.random()
      const size = Math.random()

      opacity[i] = alpha < 0.85 ? 0.85 : alpha
      sizes[i] = (size < 0.4 ? 0.4 : size) / 3

      const phi = Math.random() * Math.PI
      const theta = 2 * Math.PI * Math.random()

      // 将球形坐标转换为笛卡尔坐标系
      let x = Math.sin(phi) * Math.cos(theta) * r
      let y = Math.sin(phi) * Math.sin(theta) * r
      let z = Math.cos(phi) * r

      let noise = noise3D(x * scale, y * scale, z * scale)

      // 应用锐化函数增强噪声亮暗对比，创建清晰的山脊
      if (noise > minRidgeValleyThreshold) {
        noise = 1.0 - (1.0 - noise) ** (ridgeSharpness / 2)

        // 如果噪声值高于阈值，粒子将被放置在这，否则粒子就会被拉回到阈值处
        const elevation =
          noise > minRidgeValleyThreshold ? noise : minRidgeValleyThreshold

        // 将噪声的影响乘以球的半径来调整其位置
        x *= 2 - elevation
        y *= 2 - elevation
        z *= 2 - elevation

        positions[index] = x
        positions[index + 1] = y
        positions[index + 2] = z
      } else {
        // noise = Math.pow(noise, ridgeSharpness);
        opacity[i] = 0
      }

      colors[index] = color.r
      colors[index + 1] = color.g
      colors[index + 2] = color.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('alpha', new THREE.BufferAttribute(opacity, 1))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geometry.computeBoundingSphere()

    return geometry
  }

  // 更新坐标
  position(offset: Offset) {
    if (!this.outerParticles || !this.innerParticles || !this.hillParticles)
      return
    // 当前粒子系统需要根据窗口位置进行偏移
    this.outerParticles.position.x =
      this.innerParticles.position.x =
      this.hillParticles.position.x =
        offset.x
    this.outerParticles.position.y =
      this.innerParticles.position.y =
      this.hillParticles.position.y =
        offset.y
  }

  beamPosition(offset: Offset, win: WinInfo) {
    const beam = this.particleBeams[`${win.id}`]

    if (beam) {
      // 有对应窗口
      beam.position.x = offset.x
      beam.position.y = offset.y
    } else {
      // 可能是新创建的窗口, 需要重新生成相应beam粒子系统
      const num = this.win.id % (this.wins.length + 1)

      this.createBeam(num, win)
    }
  }

  // 根据粒子系统坐标创建平滑曲线
  createCurve(offset: Offset, sourceWin: WinInfo) {
    // source就是每个粒子坐标, end就是对面的粒子系统中心, 也就是offset
    const beam = this.particleBeams[sourceWin.id]
    const { _pos } = beam.userData // 每个光束的原始坐标

    if (!beam.userData._curve) {
      beam.userData._curve = {}
    }

    const curves = beam.userData._curve[`${sourceWin.id}`]
    const control = new THREE.Vector3(
      -offset.x / 2,
      -offset.y / 2,
      Math.random() * this.innerR
    )

    if (!curves) {
      // 没生成过就要初始化贝塞尔曲线数组
      beam.userData._curve[`${sourceWin.id}`] = []

      for (let i = 0; i < _pos.length; i += 3) {
        const source = new THREE.Vector3(
          _pos[i],
          _pos[i + 1] * 0.7,
          _pos[i + 2]
        )
        const offsetY = Math.random() * (Math.random() > 0.5 ? 1 : -1) // targetY 随机偏移量
        const target = new THREE.Vector3(
          -offset.x + _pos[i],
          -offset.y + this.innerR * offsetY,
          _pos[i + 2] / 2
        )

        // 根据开始结束坐标计算控制点坐标
        const curve = new THREE.QuadraticBezierCurve3(source, control, target)
        // TODO 用户自定义的属性 是否合理需要思考
        // @ts-ignore
        curve._offsetY = offsetY // 留给更新时使用, 否则会导致targetY变化太大

        /* for (let i = 0; i < 10; i++) {
          const element = curve.getPoint(i / 100);
          const box = new THREE.BoxGeometry(1, 1, 1);
          const mesh = new THREE.Mesh(box, new THREE.MeshBasicMaterial({ color: 0x00ff00 }));

          mesh.position.set(element.x, element.y, element.z);
          this.scene.add(mesh);
        } */
        // console.log(source, control, target);
        // 将曲线添加到光束数组中
        beam.userData._curve[`${sourceWin.id}`].push(curve)
      }
    } else {
      // 如果已经生成过曲线就只要更新曲线的端点就好了
      for (let i = 0; i < _pos.length; i += 3) {
        const _curve = curves[i / 3]
        const source = new THREE.Vector3(
          _pos[i],
          _pos[i + 1] * 0.7,
          _pos[i + 2]
        )

        _curve.v0.copy(source)
        _curve.v1.x = -offset.x / 2
        _curve.v1.y = -offset.y / 2
        _curve.v2.x = -offset.x + _pos[i] / 2
        _curve.v2.y = -offset.y + this.innerR * _curve._offsetY
      }
    }
  }

  opacitySettings = {
    maxDistance: 1500, // 定义最大视距
    minOpacity: 0.3, // 最远距离粒子的最小透明度
    maxOpacity: 1.0, // 最近距离粒子的最大透明度
  }

  calcParticleOpacityByDistance(x: number, y: number, z: number) {
    const { maxDistance, minOpacity, maxOpacity } = this.opacitySettings

    // 计算相机和粒子之间的距离
    const distance = this.camera.position.distanceTo(new THREE.Vector3(x, y, z))

    // 使用距离来计算透明度，最远处为 minOpacity，最近处为 maxOpacity
    let opacity =
      (1 - distance / maxDistance) * (maxOpacity - minOpacity) + minOpacity

    // 限制透明度在 minOpacity 与 maxOpacity 之间
    opacity = THREE.MathUtils.clamp(opacity, minOpacity, maxOpacity)

    return opacity
  }

  // 光束传输
  beamTransformer(offset: Offset, win: WinInfo) {
    const beam = this.particleBeams[win.id]

    // 两个粒子系统重合了
    if (
      Math.abs(offset.x) <= this.innerR + 20 &&
      Math.abs(offset.y) <= this.outerR + 20
    ) {
      beam.visible = false
    } else {
      // 播放添加粒子动画
      beam.visible = true

      const { attributes: attrs } = beam.geometry
      const positions = attrs.position.array
      const opacity = attrs.alpha.array
      const delay = beam.userData._delay
      const progress = beam.userData._progress
      const curves = beam.userData._curve[win.id]

      // 根据索引从对应曲线上读取相应的坐标
      for (let i = 0; i < positions.length; i += 3) {
        const index = i / 3

        // 检查粒子是否完成路径
        if (progress[index] >= 100) {
          // 重置粒子进度
          progress[index] = 0
          opacity[index] = 0
        } else {
          // 更新进度 (除以 10 降低移动速度)
          progress[index] += (2 - delay[index]) / 4
          if (progress[index] > 5 && progress[index] < 90) {
            opacity[index] = this.calcParticleOpacityByDistance(
              positions[i],
              positions[i + 1],
              positions[i + 2]
            )
          } else {
            opacity[index] = 0
          }
        }

        // 第index个贝塞尔曲线
        const curve = curves[index]
        // 为了实现减速效果，我们将运动进度通过缓动函数进行处理
        const pos = curve.getPoint(progress[index] / 100) // 根据进度读取曲线上点的坐标

        positions[i] = pos.x
        positions[i + 1] = pos.y
        positions[i + 2] = pos.z
      }

      // 更新粒子透明度和坐标
      attrs.alpha.needsUpdate = true
      attrs.position.needsUpdate = true
    }

    this.updateInnerSphereOpacity()
  }

  // 更新内部球体透明度
  updateInnerSphereOpacity() {
    if (!this.innerParticles) return
    const { attributes: attrs } = this.innerParticles.geometry

    if (attrs.alpha) {
      const opacity = attrs.alpha.array

      for (let i = 0; i < opacity.length; i++) {
        if (opacity[i] < 0.85) {
          opacity[i] += 0.002
        }
      }

      attrs.alpha.needsUpdate = true
    }
  }

  destory() {
    // 1. 把向其他窗口流动的光束直接销毁
    ;[this.outerParticles, this.innerParticles, this.hillParticles].forEach(
      (obj) => {
        if (!obj) return
        obj.geometry.dispose()
        ;(obj.material as Material).dispose()
        obj.removeFromParent()
      }
    )
    for (const winId in this.particleBeams) {
      const obj = this.particleBeams[winId]

      this.remove3DObj(obj)
    }
    // 2. 把其他窗口向该粒子系统流动的光束收回并隐藏显示
    this.scene.children.forEach((obj) => {
      if (obj.name === 'inner-particles') {
        // 把其他窗口内部粒子系统销毁
        setTimeout(() => {
          const { attributes: attrs } = (obj as Points).geometry

          if (attrs.alpha) {
            const opacity = attrs.alpha.array

            for (let i = 0; i < opacity.length; i++) {
              opacity[i] = 0
            }

            attrs.alpha.needsUpdate = true
          }
        }, 500)
      } else if (obj.type === 'Points' && obj.userData._id === this.win.id) {
        this.remove3DObj(obj as Points)
      }
    })
  }

  remove3DObj(obj: Points) {
    obj.clear()
    obj.userData = {}
    obj.geometry.deleteAttribute('alpha')
    obj.geometry.deleteAttribute('color')
    obj.geometry.deleteAttribute('position')
    obj.geometry.deleteAttribute('size')
    obj.geometry.dispose()
    ;(obj.material as Material).dispose()
    this.scene.remove(obj)
  }
}
