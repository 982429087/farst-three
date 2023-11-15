<template>
  <div ref="domRef" class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :options="cameraOptions"
        :fov="45"
        :near="0.01"
        :far="2050"
      />
      <FtWebglRenderer
        :params="{
          antialias: true,
          alpha: true,
        }"
      >
        <FtProjection
          :center="[102.44662948242187, 30.927128325051036]"
          :scale="450"
        >
          <FtGeoJsonPlane
            :geo-json="geoJson"
            :geo-json-outline="geoJsonOutline"
          />
          <FtEdgeMoveLine
            :geojson="geoJsonOutline"
            :options="edgeMoveLineOptions"
          />
        </FtProjection>
        <FtOrbitControls
          :options="{
            enableDamping: true,
            enableZoom: true,
            minDistance: 1,
            maxDistance: 2000,
            maxPolarAngle: (Math.PI / 180) * 75,
            enablePan: true,
          }"
        />
        <FtAmbientLight :color="0x02518d" :intensity="0.8" />
        <FtDirectionalLight
          :color="0x02518d"
          :intensity="0.5"
          :options="{ position: { set: [100, 10, -100] } }"
        />
        <FtDirectionalLight
          :color="0x02518d"
          :intensity="0.8"
          :options="{ position: { set: [100, 10, 100] } }"
        />
        <FtAxesHelper :size="100" />
        <FtGridHelper :size="100" :divisions="100" />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, shallowRef } from 'vue'
import { Color, FileLoader } from 'three'
import {
  FtAmbientLight,
  FtAxesHelper,
  FtDirectionalLight,
  FtEdgeMoveLine,
  FtGeoJsonPlane,
  FtGridHelper,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtProjection,
  FtScene,
  FtWebglRenderer,
  useGui,
} from 'farst-three'
import type { EdgeMoveLineOptions } from 'farst-three'
import type { FeatureCollection, Geometry } from '@turf/turf'
const domRef = ref<HTMLDivElement>()
const cameraOptions = reactive({
  position: {
    set: [3.53, 74.82, 112.39],
  },
})
const edgeMoveLineOptions = reactive<EdgeMoveLineOptions>({
  pointsCount: 10000,
  speed: 0.2,
  color: '#1c475e',
  number: 3,
  length: 0.2,
  size: 8,
  z: 4.2,
})

const geoJson = shallowRef<FeatureCollection<Geometry>>()
const geoJsonOutline = shallowRef<FeatureCollection<Geometry>>()
function initGeoJson() {
  const loader = new FileLoader()
  loader.load('/geo/sichuansheng.json', (data) => {
    const dataObj = JSON.parse(data as string)
    geoJson.value = dataObj
  })

  loader.load('/geo/sichuan-outLine.json', (data) => {
    const dataStr = data as string
    const jsonData = JSON.parse(dataStr)
    geoJsonOutline.value = jsonData
  })
}

initGeoJson()
const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.add(edgeMoveLineOptions, 'pointsCount', 1000, 100000, 1000)
  gui.add(edgeMoveLineOptions, 'speed', 0.1, 1, 0.1)
  gui.addColor(edgeMoveLineOptions, 'color')
  gui.add(edgeMoveLineOptions, 'number', 1, 10, 1)
  gui.add(edgeMoveLineOptions, 'length', 0.1, 1, 0.1)
  gui.add(edgeMoveLineOptions, 'size', 1, 10, 1)
  gui.add(edgeMoveLineOptions, 'z', 0, 10, 1)
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
