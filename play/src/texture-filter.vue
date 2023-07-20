<template>
  <div class="farst-three">
    <FtScene>
      <FtMesh
        :options="{
          position: {
            x: 1.5,
          },
        }"
        @load="({ mesh }) => (emesh = mesh)"
      >
        <FtBoxGeometry :width="1" :height="1" :depth="1"></FtBoxGeometry>
        <FtMeshLambertMaterial>
          <FtTextureLoader
            url="\textures\sword.png"
            :type="'map'"
            :options="{
              minFilter: NearestFilter,
              magFilter: NearestFilter,
            }"
            @load="textureLoad"
          ></FtTextureLoader>
        </FtMeshLambertMaterial>
      </FtMesh>
      <FtMesh
        :options="{
          position: {
            x: -1.5,
          },
        }"
      >
        <FtBoxGeometry :width="1" :height="1" :depth="1"></FtBoxGeometry>
        <FtMeshLambertMaterial>
          <FtTextureLoader
            url="/Material_1741/height.png"
            :type="'map'"
            :options="{
              minFilter: NearestFilter,
              magFilter: NearestFilter,
            }"
          ></FtTextureLoader>
        </FtMeshLambertMaterial>
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
      <FtDirectionalLight :color="0xffffff" :intensity="0.5" />
      <FtAmbientLight :color="0xffffff" />

      <FtWebglRenderer :params="{ antialias: true }" :animationFn="animationFn">
        <FtOrbitControls v-if="showControl" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { TextureLoadEvent, WebGLRendererProps } from '@farst-three/components'
import { useGui } from '@farst-three/hooks'
import {
  CameraHelper,
  LinearFilter,
  LinearMipMapLinearFilter,
  Mesh,
  NearestFilter,
  Texture,
} from 'three'
import { ref, shallowRef } from 'vue'

const cameraHelper = shallowRef<CameraHelper>()
const size = 4
const showControl = ref(true)
const emesh = shallowRef<Mesh>()

const othCameraOptions = ref({
  position: {
    set: [0, 1, 4],
  },
})

const animationFn: WebGLRendererProps['animationFn'] = ({}) => {
  if (cameraHelper.value) {
    cameraHelper.value.update()
  }
}

let texture: Texture
function textureLoad(e: TextureLoadEvent) {
  texture = e.texture
}
const { gui } = useGui()

const params = {
  minFilter: NearestFilter,
  magFilter: NearestFilter,
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
    LinearMipMapLinearFilter: LinearMipMapLinearFilter,
    LinearFilter: LinearFilter,
    NearestFilter: NearestFilter,
  })
  .onChange((v) => {
    texture.magFilter = v
    texture.needsUpdate = true
    ;(emesh.value!.material as any).map = texture
  })
</script>

<style lang="scss" scoped>
.farst-three {
  height: 100vh;
  width: 100vw;
}
</style>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
