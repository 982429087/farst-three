<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtOrthographicCamera
        :left="-size"
        :right="size"
        :top="size / 2"
        :bottom="-size / 2"
        :near="0.001"
        :far="100"
        :options="othCameraOptions"
      />
      <FtWebglRenderer
        :params="{ antialias: true }"
        :animation-fn="animationFn"
      >
        <FtMesh
          :options="{
            position: {
              x: 1.5,
            },
          }"
          @load="({ mesh }) => (emesh = mesh)"
        >
          <FtBoxGeometry :width="1" :height="1" :depth="1" />
          <FtMeshLambertMaterial>
            <FtTextureLoader
              :url="baseUrl + 'textures/sword.png'"
              :type="'map'"
              :options="{
                minFilter: NearestFilter,
                magFilter: NearestFilter,
              }"
              @load="textureLoad"
            />
          </FtMeshLambertMaterial>
        </FtMesh>
        <FtMesh
          :options="{
            position: {
              x: -1.5,
            },
          }"
        >
          <FtBoxGeometry :width="1" :height="1" :depth="1" />
          <FtMeshLambertMaterial>
            <FtTextureLoader
              :url="baseUrl + 'textures/Material_1741/height.png'"
              :type="'map'"
              :options="{
                minFilter: NearestFilter,
                magFilter: NearestFilter,
              }"
            />
          </FtMeshLambertMaterial>
        </FtMesh>

        <FtDirectionalLight :color="0xffffff" :intensity="0.5" />
        <FtAmbientLight :color="0xffffff" />
        <FtOrbitControls v-if="showControl" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { LinearFilter, LinearMipMapLinearFilter, NearestFilter } from 'three'
import {
  FtAmbientLight,
  FtBoxGeometry,
  FtDirectionalLight,
  FtMesh,
  FtMeshLambertMaterial,
  FtOrbitControls,
  FtOrthographicCamera,
  FtScene,
  FtTextureLoader,
  FtWebglRenderer,
  useGui,
} from 'farst-three'
import type { TextureLoadEvent, WebGLRendererProps } from 'farst-three'
import type { CameraHelper, Mesh, Texture } from 'three'

const baseUrl = import.meta.env.VITE_BASE_URL

const cameraHelper = shallowRef<CameraHelper>()
const size = 4
const showControl = ref(true)
const emesh = shallowRef<Mesh>()
const domRef = ref<HTMLDivElement>()

const othCameraOptions = ref({
  position: {
    set: [0, 1, 4],
  },
})

const animationFn: WebGLRendererProps['animationFn'] = () => {
  if (cameraHelper.value) {
    cameraHelper.value.update()
  }
}

let texture: Texture
function textureLoad(e: TextureLoadEvent) {
  texture = e.texture
}
const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  const params = {
    minFilter: NearestFilter, // 当贴图大于物体表面时，需要设置纹理的minFilter属性为NearestFilter 选择最近像素
    magFilter: NearestFilter, // 当贴图小于物体表面时，需要设置纹理的magFilter属性为NearestFilter 选择4个像素混合
  }
  // gui
  //   .add(params, 'minFilter', {
  //     LinearMipMapNearestFilter: LinearMipMapNearestFilter,
  //     LinearFilter: LinearFilter,
  //     NearestFilter: NearestFilter,
  //   })
  //   .onChange((v) => {
  //     texture.minFilter = v
  //     texture.needsUpdate = true
  //     emesh.value.material.map = texture
  //   })
  gui
    .add(params, 'magFilter', {
      LinearMipMapLinearFilter,
      LinearFilter,
      NearestFilter,
    })
    .onChange((v) => {
      texture.magFilter = v
      texture.needsUpdate = true
      // todo 这样重新赋值有点问题
      ;(emesh.value!.material as any).map = texture
    })
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 500px;
  width: 100%;
  position: relative;
}
</style>
