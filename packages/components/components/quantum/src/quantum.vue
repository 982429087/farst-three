<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import { Clock, Vector3 } from 'three'
import {
  Particles,
  WindowManager,
  useAnimationService,
  useRenderCamera,
  // useRenderer,
  useScene,
} from '@farst-three/hooks'
import {
  quantumEmits,
  // quantumProps
} from './quantum'
import type { PerspectiveCamera, Points } from 'three'
import type { WinInfo } from '@farst-three/hooks'

defineOptions({
  name: 'FtQuantum',
})

// const props = defineProps(quantumProps)
const emit = defineEmits(quantumEmits)

const scene = useScene()
const camera = useRenderCamera()
// const renderer = useRenderer()
const animation = useAnimationService()

let _wm: WindowManager
const _beams: Particles[] = []

function addParticle(win: WinInfo) {
  const particles = new Particles({
    camera: camera as PerspectiveCamera,
    scene,
    wins: _wm.wins,
    win,
  })

  _beams.push(particles)
}

function removeParticle(win: WinInfo) {
  const index = _beams.findIndex((beam) => beam.win.id === win.id)

  if (index > -1) {
    _beams[index].destory()
    _beams.splice(index, 1)
  }
}

function initWindowManager() {
  _wm = new WindowManager()

  // 有几个窗口初始化几个粒子系统
  _wm.wins.forEach((win) => {
    addParticle(win)
  })

  window.addEventListener('storage', (e) => {
    if (e.key === 'wins' && e.newValue && e.oldValue) {
      const newwins = JSON.parse(e.newValue)
      const oldwins = JSON.parse(e.oldValue)

      if (newwins.length > oldwins.length) {
        // 有窗口新开, 新增粒子系统, 窗口坐标以及贝塞尔曲线
        const win = newwins.find(
          (w: WinInfo) => !oldwins.some((win: WinInfo) => win.id === w.id)
        )

        addParticle(win)
      } else if (newwins.length < oldwins.length) {
        // 有窗口关闭, 移除关闭的粒子系统
        const win = oldwins.find(
          (w: WinInfo) => !newwins.some((win: WinInfo) => win.id === w.id)
        )

        removeParticle(win)
      }
      _wm.wins = newwins
    }
  })

  // 监听当前窗口是否要关闭
  window.addEventListener('beforeunload', () => {
    const wins = _wm
      .getItem('wins')
      .filter((win: WinInfo) => win.id !== _wm.win.id)

    _wm.setItem('wins', wins)
  })
}
const _position = new Vector3()
const _axis = new Vector3()
let _i = 0
let _angle = 0
const clock = new Clock()

function updatePoints() {
  const delta = clock.getDelta()

  scene.children
    .filter(
      (x) =>
        x.name === 'outer-particles' ||
        x.name === 'hill-particles' ||
        (x.name === 'inner-particles' && x.visible)
    )
    .forEach((points) => {
      if (points.name !== 'hill-particles') {
        const { attributes: attrs } = (points as Points).geometry
        const positions = attrs.position.array

        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i]
          const y = positions[i + 1]
          const z = positions[i + 2]

          _position.x = x
          _position.y = y
          _position.z = z
          // 旋转很小的角度
          _axis.set(Math.sin(i), Math.cos(i), Math.sin(i)).normalize()
          _position.applyAxisAngle(_axis, delta / 6)
          positions[i] = _position.x
          positions[i + 1] = _position.y
          positions[i + 2] = _position.z
        }
        attrs.position.needsUpdate = true
      }
      // 旋转粒子系统
      // points.rotation.x += 0.005;
      _angle += 0.001
      points.rotation.y = _angle
    })
}

function updateWindowPosition() {
  const { wins, win } = _wm

  if (wins.length > 1) {
    // 判断当前窗口是否有移动, 更新当前窗口的本地存储
    const { screenLeft, screenTop } = window

    if (screenLeft !== win.x || screenTop !== win.y) {
      const $win = wins.find((w) => w.id === win.id)
      if (!$win) return
      $win.x = screenLeft
      $win.y = screenTop

      _wm.setItem('wins', wins)
      _wm.wins = wins
    }
  }
}

function updateBeams() {
  _i = _i + 1
  // if (_i > 1) return;
  const { wins } = _wm

  // console.log('i', _i, wins);
  if (wins.length > 1) {
    const { screenLeft, screenTop, innerWidth, innerHeight } = window

    _beams.forEach((obj) => {
      // 每个粒子系统本身相对于当前窗口中心移动了多少
      // 由于每个窗口都可能发生了移动, 所以这里要更新窗口信息
      obj.win = wins.find((w) => w.id === obj.win.id)!
      const offset = {
        x: obj.win.x + obj.win.w / 2 - screenLeft - innerWidth / 2,
        y: -(obj.win.y + obj.win.h / 2 - screenTop - innerHeight / 2),
      }

      obj.position(offset)

      const bes = _beams.filter(($obj) => $obj.win.id !== obj.win.id)

      // console.log(_beams);
      bes.forEach(($obj) => {
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
}

initWindowManager()

emit('load', { scene })
onBeforeUnmount(() => {
  _beams.forEach((beam) => {
    beam.destory()
  })
})

animation.on('quantum', () => {
  updateBeams()
  updatePoints()
  updateWindowPosition()
})
</script>
