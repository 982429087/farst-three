import * as THREE from 'three'
// import { GUI } from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/orbitControls'
import WindowManager from './windowManager'
import Particles from './particles'

const playground = {
  init() {
    this.canvas = document.querySelector('#c')
    this.setup()
    this.initWindowManager()
    this.tick()
  },

  setup() {
    this.scene = new THREE.Scene()
    // this.setLight();
    this.setCamera()
    this.render()
    this.controls()
    this.resize()
    // this.gui();
  },

  /* gui () {
    const gui = new GUI();
    const folder = gui.addFolder('params');

    folder.open();
    folder.add(playground, 'outerR', 0.5, 3).onChange(value => {
      this.addParticles();
    });

  }, */

  /* setLight () {
    const globalLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    directionalLight.position.set(-300, 300, -100);

    this.scene.add(globalLight, directionalLight);
  }, */

  setCamera() {
    // https://forum.babylonjs.com/t/how-to-settup-camera-to-transform-1-unit-to-1-pixel/15799
    const perspective = 800
    const fov =
      (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI
    const camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    )
    // 创建观察场景的相机 (相机显示的内容需要和窗口显示的内容同样的比例才能够显示没有被拉伸变形的效果)
    /* const frustumSize = 210; //设置显示相机前方高4的内容
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-aspect * frustumSize, aspect * frustumSize, frustumSize, -frustumSize, 0.001, 1000); // 正交相机

    camera.position.set(0, 0, frustumSize); */
    camera.position.set(0, 0, perspective)
    camera.lookAt(this.scene)
    this.camera = camera
    this.scene.add(camera)
  },

  _wm: null,
  _beams: [], // 存储粒子系统列表
  initWindowManager() {
    this._wm = new WindowManager()

    // 有几个窗口初始化几个粒子系统
    this._wm.wins.forEach((win) => {
      this.addParticle(win)
    })

    window.addEventListener('storage', (e) => {
      if (e.key === 'wins') {
        const newwins = JSON.parse(e.newValue)
        const oldwins = JSON.parse(e.oldValue)

        if (newwins.length > oldwins.length) {
          // 有窗口新开, 新增粒子系统, 窗口坐标以及贝塞尔曲线
          const win = newwins.find(
            (w) => !oldwins.some((win) => win.id === w.id)
          )

          this.addParticle(win)
        } else if (newwins.length < oldwins.length) {
          // 有窗口关闭, 移除关闭的粒子系统
          const win = oldwins.find(
            (w) => !newwins.some((win) => win.id === w.id)
          )

          this.removeParticle(win)
        }
        this._wm.wins = newwins
      }
    })

    // 监听当前窗口是否要关闭
    window.addEventListener('beforeunload', () => {
      const wins = this._wm
        .getItem('wins')
        .filter((win) => win.id !== this._wm.win.id)

      this._wm.setItem('wins', wins)
    })
  },

  addParticle(win) {
    const particles = new Particles({
      camera: this.camera,
      scene: this.scene,
      wins: this._wm.wins,
      win,
    })

    this._beams.push(particles)
  },

  removeParticle(win) {
    const index = this._beams.findIndex((beam) => beam.win.id === win.id)

    if (index > -1) {
      this._beams[index].destory()
      this._beams.splice(index, 1)
    }
  },

  render() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.render(this.scene, this.camera)
  },

  controls() {
    this.orbitControl = new OrbitControls(this.camera, this.canvas)

    this.orbitControl.enableDamping = true // 启用惯性拖拽
  },

  removeParticles({ id }) {
    const particles = this.scene.children.filter((obj) => obj._id === id)

    particles.forEach((p) => p.destroy())
  },

  resize() {
    // 监听窗口大小变化
    window.addEventListener(
      'resize',
      () => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(window.innerWidth, window.innerHeight)
      },
      false
    )
  },

  _position: new THREE.Vector3(),
  _axis: new THREE.Vector3(),
  _angle: 0,
  updatePoints() {
    const delta = this.clock.getDelta()

    this.scene.children
      .filter(
        (x) =>
          x.name === 'outer-particles' ||
          x.name === 'hill-particles' ||
          (x.name === 'inner-particles' && x.visible)
      )
      .forEach((points) => {
        if (points.name !== 'hill-particles') {
          const { attributes: attrs } = points.geometry
          const positions = attrs.position.array

          for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i]
            const y = positions[i + 1]
            const z = positions[i + 2]

            this._position.x = x
            this._position.y = y
            this._position.z = z
            // 旋转很小的角度
            this._axis.set(Math.sin(i), Math.cos(i), Math.sin(i)).normalize()
            this._position.applyAxisAngle(this._axis, delta / 6)
            positions[i] = this._position.x
            positions[i + 1] = this._position.y
            positions[i + 2] = this._position.z
          }
          attrs.position.needsUpdate = true
        }
        // 旋转粒子系统
        // points.rotation.x += 0.005;
        this._angle += 0.001
        points.rotation.y = this._angle
      })
  },

  updateWindowPosition() {
    const { wins, win } = this._wm

    if (wins.length > 1) {
      // 判断当前窗口是否有移动, 更新当前窗口的本地存储
      const { screenLeft, screenTop } = window

      if (screenLeft !== win.x || screenTop !== win.y) {
        const $win = wins.find((w) => w.id === win.id)

        $win.x = screenLeft
        $win.y = screenTop

        this._wm.setItem('wins', wins)
        this._wm.wins = wins
      }
    }
  },

  _i: 0,
  updateBeams() {
    this._i++
    // if (this._i > 1) return;
    const { wins } = this._wm

    // console.log('i', this._i, wins);
    if (wins.length > 1) {
      const { screenLeft, screenTop, innerWidth, innerHeight } = window

      this._beams.forEach((obj) => {
        // 每个粒子系统本身相对于当前窗口中心移动了多少
        // 由于每个窗口都可能发生了移动, 所以这里要更新窗口信息
        obj.win = wins.find((w) => w.id === obj.win.id)
        const offset = {
          x: obj.win.x + obj.win.w / 2 - screenLeft - innerWidth / 2,
          y: -(obj.win.y + obj.win.h / 2 - screenTop - innerHeight / 2),
        }

        obj.position(offset, obj.win)

        const _beams = this._beams.filter(($obj) => $obj.win.id !== obj.win.id)

        // console.log(_beams);
        _beams.forEach(($obj) => {
          // console.log(obj, $obj.win);
          obj.beamPosition(offset, $obj.win)

          // 每个粒子系统相对于其他粒子系统的移动光束相对于其他窗口中心移动了多少
          const _offset = {
            x: -($obj.win.x + $obj.win.w / 2 - obj.win.x - obj.win.w / 2),
            y: $obj.win.y + $obj.win.h / 2 - obj.win.y - obj.win.h / 2,
          }

          obj.createCurve(_offset, $obj.win)
          obj.beamTransformer(_offset, $obj.win)
        })
      })
    }
  },

  clock: new THREE.Clock(),
  tick() {
    this.updatePoints()
    this.updateWindowPosition()
    this.updateBeams()
    this.orbitControl.update()
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(() => this.tick())
  },
}

export default playground
