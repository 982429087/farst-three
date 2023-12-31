<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="100"
        :near="0.01"
        :far="1000"
        @load="cameraLoad"
      />
      <FtWebglRenderer :animation-fn="animationFn">
        <FtMesh @load="loadMesh">
          <FtBoxGeometry @load="ftBoxGeometryLoad">
            <FtMeshBasicMaterial
              :params="meshBasicParamsFn"
              @load="ftMeshBasicMaterialLoad"
            />
          </FtBoxGeometry>
        </FtMesh>
        <FtAxesHelper :size="4" />
        <FtGridHelper
          :size="100"
          :divisions="10"
          :color1="0xcd37aa"
          :color2="0x4a4a4a"
        />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { Color } from 'three'
import {
  FtAxesHelper,
  FtBoxGeometry,
  FtGridHelper,
  FtMesh,
  FtMeshBasicMaterial,
  FtPerspectiveCamera,
  FtScene,
  FtWebglRenderer,
  useGui,
  useIntersect,
} from 'farst-three'
import type { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import type {
  BoxGeometryLoadEvent,
  MeshBasicMaterialLoadEvent,
  MeshLoadEvent,
  PerspectiveCameraLoadEvent,
} from 'farst-three'

const meshRef = shallowRef<Mesh>()
const geometryRef = shallowRef<BoxGeometry>()

const domRef = ref<HTMLDivElement>()
const { guiPromise } = useGui(domRef)
const meshBasicParamsFn = {
  color: new Color(Math.random() * 0x00ffff),
}

const cameraLoad = ({ camera }: PerspectiveCameraLoadEvent) => {
  camera.position.z = 5
  guiPromise.then((gui) => {
    gui.add(camera.position, 'x', 0, 1)
    gui
      .add(camera, 'fov')
      .min(-4)
      .max(100)
      .step(0.01)
      .onChange(() => {
        camera.updateProjectionMatrix()
      })
    gui.add(camera, 'aspect', -4, 4, 0.01).onChange(() => {
      camera.updateProjectionMatrix()
    })
    gui.add(camera, 'near', -10, 4, 0.01).onChange(() => {
      camera.updateProjectionMatrix()
      console.log(useIntersect(camera, meshRef.value!.geometry))
    })
    gui.add(camera, 'far', 1, 200, 1).onChange(() => {
      camera.updateProjectionMatrix()
    })
    gui.add(camera, 'zoom', 1, 20, 0.1).onChange(() => {
      camera.updateProjectionMatrix()
    })
  })
}

const loadMesh = ({ mesh }: MeshLoadEvent) => {
  meshRef.value = mesh
  guiPromise.then((gui) => {
    const params = {
      color: '#1890ff',
      wirefarme: false,
    }
    gui.add(mesh, 'visible')

    gui.addColor(params, 'color').onChange((color: string) => {
      ;(mesh.material as MeshBasicMaterial).color.set(color)
    })
    gui.add(mesh.material as MeshBasicMaterial, 'wireframe').onChange((val) => {
      console.log(val)
      ;(mesh.material as MeshBasicMaterial).wireframe = val
    })
  })
}

function animationFn() {
  if (meshRef.value) {
    meshRef.value.rotation.x += 0.01
    meshRef.value.rotation.y += 0.02
  }
}

const ftBoxGeometryLoad = ({ geometry }: BoxGeometryLoadEvent) => {
  geometryRef.value = geometry
}

const ftMeshBasicMaterialLoad = (e: MeshBasicMaterialLoadEvent) => {
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
