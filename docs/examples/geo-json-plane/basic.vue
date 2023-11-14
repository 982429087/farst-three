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
            :plane-options="planeOptions"
            :line-options="lineOptions"
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
import { FileLoader } from 'three'
import { useGui } from '@farst-three/hooks'
import {
  FtAmbientLight,
  FtAxesHelper,
  FtDirectionalLight,
  FtGeoJsonPlane,
  FtGridHelper,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtProjection,
  FtScene,
  FtWebglRenderer,
} from '@farst-three/components'
import type {
  GeoJsonPlaneLinesOptions,
  GeoJsonPlaneOptions,
} from '@farst-three/components'
import type { FeatureCollection, Geometry } from '@turf/turf'
const domRef = ref<HTMLDivElement>()
const cameraOptions = reactive({
  position: {
    set: [3.53, 74.82, 112.39],
  },
})

const planeOptions = reactive<GeoJsonPlaneOptions>({
  topPlaneOptions: {
    color: '#02518d',
  },
  sidePlaneOptions: {
    texture: '/geo/wall.png',
    textureCenter: [0, 0],
  },
})
const lineOptions = reactive<GeoJsonPlaneLinesOptions>({
  showBottomLine: true,
  showTopLine: true,
  topLineMaterialOptions: {
    color: 0x68c5f6,
    linewidth: 0.002,
  },
  bottomLineMaterialOptions: {
    color: 0x45bff8,
    linewidth: 0.004,
  },
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
  gui.addColor(planeOptions.topPlaneOptions!, 'color')
  gui.add(lineOptions, 'showBottomLine')
  gui.add(lineOptions, 'showTopLine')

  gui.addColor(lineOptions.topLineMaterialOptions!, 'color')
  gui.addColor(lineOptions.bottomLineMaterialOptions!, 'color')

  gui.add(lineOptions.topLineMaterialOptions!, 'linewidth', 0.001, 0.01, 0.001)
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>