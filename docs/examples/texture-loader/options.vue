<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtMesh
        :options="{
          position: {
            x: -1.5,
          },
        }"
      >
        <FtBoxGeometry :width="1" :height="1" :depth="1" />
        <FtMeshStandardMaterial>
          <FtTextureLoader
            url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_basecolor.jpg"
            :type="'map'"
          />
        </FtMeshStandardMaterial>
      </FtMesh>
      <FtMesh
        :options="{
          position: {
            x: 1.5,
          },
        }"
      >
        <FtBoxGeometry :width="1" :height="1" :depth="1" />
        <FtMeshStandardMaterial :options="{}" @load="lbasicMaterialLoad">
          <FtTextureLoader
            url="\textures\Warning_Sign_HighVoltage_001\Warning_Sign_HighVoltage_001_basecolor.jpg"
            :type="'map'"
            :options="{
              repeat: {
                set: [2, 4],
              },
              wrapS: RepeatWrapping,
              wrapT: MirroredRepeatWrapping,
              // ClampToEdgeWrapping: 1001,
              // MirroredRepeatWrapping: 1002,
              offset: new Vector2(0.3, 0.1),
              rotation: Math.PI / 4,
              center: {
                set: [0.5, 0.5],
              },
            }"
            @load="textLaoder"
          />
        </FtMeshStandardMaterial>
      </FtMesh>
      <FtOrthographicCamera
        :left="-size"
        :right="size"
        :top="size / 2"
        :bottom="-size / 2"
        :near="0.001"
        :far="100"
        :options="othCameraOptions"
      />
      <FtDirectionalLight
        :color="0xffffff"
        :intensity="0.7"
        :options="{ position: { set: [1, 2, 4] } }"
      />
      <FtAmbientLight :color="0xffffff" :intensity="0.5" />

      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
      >
        <FtOrbitControls v-if="showControl" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  RepeatWrapping,
  Vector2,
} from 'three'
import { useGui } from '@farst-three/hooks'
import { Deferred } from '@farst-three/utils'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtDirectionalLight,
  FtMesh,
  FtMeshStandardMaterial,
  FtOrbitControls,
  FtOrthographicCamera,
  FtScene,
  FtTextureLoader,
  FtWebglRenderer,
} from '@farst-three/components'
import type {
  MeshStandardMaterialLoadEvent,
  TextureLoadEvent,
  WebGLRendererProps,
} from '@farst-three/components'

const size = 4
const showControl = ref(true)
const deferred = new Deferred<TextureLoadEvent>()
const domRef = ref<HTMLDivElement>()
const othCameraOptions = ref({
  position: {
    set: [0, 1, 6],
  },
})

const animationFn: WebGLRendererProps['animationFn'] = () => {
  deferred.promise.then(({ texture }) => {
    texture.offset.x += 0.001
    texture.offset.y += 0.001
  })
}

const { guiPromise } = useGui(domRef)

function textLaoder(e: TextureLoadEvent) {
  const texture = e.texture
  deferred.resolve(e)
  guiPromise.then((gui) => {
    gui.add(texture.repeat, 'x', 0, 10, 0.1).name('repeatx')
    gui.add(texture.repeat, 'y', 0, 10, 0.1).name('repeatY')

    gui
      .add(texture, 'wrapS', {
        ClampToEdgeWrapping,
        RepeatWrapping,
        MirroredRepeatWrapping,
      })
      .onChange((val) => {
        texture.wrapS = val
        texture.needsUpdate = true
      })
    gui
      .add(texture, 'wrapT', {
        ClampToEdgeWrapping,
        RepeatWrapping,
        MirroredRepeatWrapping,
      })
      .onChange((val) => {
        texture.wrapT = val
        texture.needsUpdate = true
      })
    gui.add(texture.offset, 'x', 0, 1, 0.1).name('offsetx')
    gui.add(texture, 'rotation', 0, Math.PI, 0.1)
    gui.add(texture.center, 'x', 0, 1, 0.1).name('centerx')
    gui.add(texture.center, 'y', 0, 1, 0.1).name('centerY')
  })
}

function lbasicMaterialLoad({ material }: MeshStandardMaterialLoadEvent) {
  //
}
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
