<template>
  <div ref="domRef" class="farst-three">
    <div v-show="showMask" class="mask" @click="start">点击开始</div>
    <FtScene>
      <FtMesh
        :options="{
          position: {
            z: 40,
            y: -1,
          },
          receiveShadow: true,
        }"
      >
        <FtBoxGeometry :width="100" :height="4" :depth="100" />
        <FtMeshLambertMaterial>
          <FtTextureLoader url="\textures\monastery_stone_floor_diff_2k.jpg" />
        </FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh
        :options="{
          position: {
            z: -140,
            y: -1,
          },
          receiveShadow: true,
        }"
      >
        <FtBoxGeometry :width="50" :height="4" :depth="50" />
        <FtMeshLambertMaterial>
          <FtTextureLoader url="\textures\monastery_stone_floor_diff_2k.jpg" />
        </FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh :options="bollOptions" @load="({ mesh }) => (bollMesh = mesh)">
        <FtSphereGeometry
          :radius="2"
          :height-segments="64"
          :width-segments="64"
        />
        <FtMeshLambertMaterial>
          <FtTextureLoader url="\textures\decorative-4813.jpg" />
        </FtMeshLambertMaterial>
      </FtMesh>
      <FtGroup
        :options="{
          position: {
            z: -95,
          },
        }"
      >
        <FtMesh
          v-for="item in 8"
          :key="item"
          :options="{
            position: {
              z: 10 * item,
              y: -10,
            },
          }"
        >
          <FtBoxGeometry :width="10" :height="10" :depth="10" />
          <FtMeshLambertMaterial>
            <FtTextureLoader
              url="\textures\monastery_stone_floor_diff_2k.jpg"
            />
          </FtMeshLambertMaterial>
        </FtMesh>
      </FtGroup>
      <FtAmbientLight :color="0xffffff" :intensity="0.95" />
      <FtDirectionalLight :options="directionLightOPtions">
        <FtDirectionalLightHelper />
      </FtDirectionalLight>
      <FtPerspectiveCamera
        :fov="75"
        :near="0.01"
        :far="500"
        :options="{
          position: {
            set: [0.01, 40, 40],
          },
        }"
      />
      <FtPointerLockControls :options="pointerlCOptions" />
      <FtAudio
        v-if="startSound"
        url="\sound\dong.m4a"
        :buffer-onload="bufferOnload"
      />
      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
        :options="{
          shadowMap: {
            enabled: true,
          },
        }"
      >
        <FtOrbitControls />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, shallowRef } from 'vue'
import { Clock, type Mesh } from 'three'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtAudio,
  FtBoxGeometry,
  FtDirectionalLight,
  FtDirectionalLightHelper,
  FtGridHelper,
  FtGroup,
  FtMesh,
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPointerLockControls,
  FtScene,
  FtSphereGeometry,
  FtTextureLoader,
  FtWebglRenderer,
} from '@farst-three/components'
import type {
  AudioLoaderOnLoad,
  DirectionalLightOptions,
} from '@farst-three/components'
const domRef = ref<HTMLDivElement>()
const startSound = ref(false)
const showMask = ref(true)
const bollMesh = shallowRef<Mesh>()
const directionLightOPtions = ref<DirectionalLightOptions>({
  position: {
    x: 5,
    y: 15,
    z: 20,
  },
  castShadow: true,
  target: () => bollMesh.value,
})

const bollOptions = ref({
  position: {
    y: 3,
    z: 12,
    x: 0,
  },
  castShadow: true,
})

const pointerlCOptions = ref({
  moveForward: [0],
})

const bufferOnload: AudioLoaderOnLoad = (sound, buffer) => {
  sound.setBuffer(buffer)
  sound.setPlaybackRate(1)
  sound.setVolume(0.5)
  sound.play()
}
const { gui } = useGui(domRef)

function start() {
  showMask.value = false
  startSound.value = true
}
const move = {
  up: false,
  down: false,
}
//键盘按下事件
document.onkeydown = (e) => {
  switch (e.code) {
    case 'ArrowUp':
      //1前进
      move.up = true

      break
    case 'ArrowDown':
      //后退
      move.down = true
      break
  }
}
document.onkeyup = (e) => {
  switch (e.code) {
    case 'ArrowUp':
      //1前进
      move.up = false

      break
    case 'ArrowDown':
      //后退
      move.down = false
      break
  }
}
const clock = new Clock()
const animationFn = () => {
  const timeDelta = clock.getDelta()
  const boxPositon = bollOptions.value.position as any
  const lightPosition = directionLightOPtions.value.position as any
  const distance = timeDelta * 10
  if (move.up) {
    boxPositon.z -= distance
    lightPosition.z -= distance
    pointerlCOptions.value.moveForward = [distance]
  }
  if (move.down) {
    boxPositon.z += distance
    lightPosition.z += distance
  }
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
  background: #00000080;
  cursor: pointer;
}
</style>
