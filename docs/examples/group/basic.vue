<template>
  <div class="farst-three">
    <FtScene>
      <FtOrthographicCamera
        :left="-size"
        :right="size"
        :top="size / 2"
        :bottom="-size / 2"
        :near="0.1"
        :far="10"
        :options="othCameraOptions"
      />

      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
      >
        <FtGroup
          :options="{
            position: {
              y: 0.2,
            },
          }"
          @load="def.resolve"
        >
          <FtMesh>
            <FtBoxGeometry :width="2" :height="0.2" :depth="1" />
            <FtMeshLambertMaterial :params="{ color: 0x1890ff }" />
          </FtMesh>
          <FtMesh v-for="(item, index) in wheels" :key="index" :options="item">
            <FtCylinderGeometry
              :radius-top="0.2"
              :radius-bottom="0.2"
              :height="0.3"
              :radial-segments="10"
            />
            <FtMeshBasicMaterial :params="{ color: 0xff00ff }" />
          </FtMesh>
          <FtMesh
            :options="{
              position: {
                set: [-1.05, 0, 0.2],
              },
            }"
          >
            <FtBoxGeometry :width="0.1" :height="0.1" :depth="0.1" />
            <FtMeshBasicMaterial :params="{ color: 0xffff00 }" />
          </FtMesh>
          <FtMesh
            :options="{
              position: {
                set: [-1.05, 0, -0.2],
              },
            }"
          >
            <FtBoxGeometry :width="0.1" :height="0.1" :depth="0.1" />
            <FtMeshBasicMaterial :params="{ color: 0xffff00 }" />
          </FtMesh>
        </FtGroup>
        <FtDirectionalLight :color="0xffffff" :intensity="0.5" />
        <FtAmbientLight :color="0xffffff" />
        <FtAxesHelper />
        <FtGridHelper
          :size="10"
          :divisions="10"
          :color1="0xcd37aa"
          :color2="0x4a4a4a"
        />
        <FtOrbitControls v-if="showControl" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { MathUtils } from 'three'
import {
  FtAmbientLight,
  FtAxesHelper,
  FtBoxGeometry,
  FtCylinderGeometry,
  FtDirectionalLight,
  FtGridHelper,
  FtGroup,
  FtMesh,
  FtMeshBasicMaterial,
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtOrthographicCamera,
  FtScene,
  FtWebglRenderer,
} from 'farst-three'
import { Deferred } from '@farst-three/utils'
import type { Scene } from 'three'
import type {
  GroupLoadEvent,
  MeshOptions,
  OrthographicCameraOptions,
  WebGLRendererLoadEvent,
} from 'farst-three'

const def = new Deferred<GroupLoadEvent>()
const size = 4
const showControl = ref(true)

const othCameraOptions = shallowRef<OrthographicCameraOptions>({
  position: {
    set: [2, 2, 3],
  },
  lookAt: (scene: Scene) => [scene.position],
})

const wheels = ref<MeshOptions[]>([
  {
    name: 'wheel',
    rotation: {
      x: -Math.PI / 2,
    },
    position: {
      set: [-0.5, 0, 0.4],
    },
  },
  {
    name: 'wheel',
    rotation: {
      x: -Math.PI / 2,
    },
    position: {
      set: [-0.5, 0, -0.4],
    },
  },
  {
    name: 'wheel',
    rotation: {
      x: -Math.PI / 2,
    },
    position: {
      set: [0.5, 0, -0.4],
    },
  },
  {
    name: 'wheel',
    rotation: {
      x: -Math.PI / 2,
    },
    position: {
      set: [0.5, 0, 0.4],
    },
  },
])

const animationFn = (e: WebGLRendererLoadEvent) => {
  def.promise.then(({ group }) => {
    const delta = 1

    const speed = ((2 * Math.PI) / 360) * delta
    group.children.forEach((item) => {
      if (item.name === 'wheel') {
        item.rotation.y += MathUtils.degToRad(delta)
      }
    })
    group.position.x -= speed

    if (group.position.x < -10) {
      group.position.x = 10
    }
  })
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
