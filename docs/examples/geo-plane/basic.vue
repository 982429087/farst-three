<template>
  <div class="farst-three">
    <FtScene>
      <FtPerspectiveCamera
        :fov="45"
        :near="0.01"
        :far="2050"
        :options="{
          position: {
            set: [3.53, 74.82, 112.39],
          },
        }"
      />
      <FtWebglRenderer
        :params="{ antialias: true, alpha: true }"
        :options="{
          shadowMap: {
            enabled: true,
          },
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
          <FtMarkPoint :points="points" />
          <FtDomMarkerRenderer>
            <FtDomMarker
              v-for="item in points"
              :key="item.name"
              :point="item.center"
            >
              {{ item.name }}
            </FtDomMarker>
          </FtDomMarkerRenderer>
          <FtReflectorPlane />
          <FtDiffusionWave />
          <FtRotationPlane
            :options="{
              url: '/geo/rotating-aperture.png',
            }"
            :mesh-options="{
              scale: {
                set: [1.2, 1.2, 1.2],
              },
            }"
          />
          <FtRotationPlane
            :options="{
              url: '/geo/rotating-aperture.png',
              speed: -0.005,
            }"
            :mesh-options="{
              position: {
                y: 0.04,
              },
            }"
          />
          <FtUpParticle />
        </FtProjection>
        <!-- <FtGeoPlane /> -->

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
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { FileLoader } from 'three'
import {
  FtAmbientLight,
  FtDiffusionWave,
  FtDirectionalLight,
  FtDomMarker,
  FtDomMarkerRenderer,
  FtGeoJsonPlane,
  FtMarkPoint,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtProjection,
  FtReflectorPlane,
  FtRotationPlane,
  FtScene,
  FtUpParticle,
  FtWebglRenderer,
} from '@farst-three/components'
import type { FeatureCollection, Geometry } from '@turf/turf'

const geoJson = shallowRef<FeatureCollection<Geometry>>()
const geoJsonOutline = shallowRef<FeatureCollection<Geometry>>()
const points = shallowRef<{ name: string; center: [number, number] }[]>([])
function initGeoJson() {
  const loader = new FileLoader()
  loader.load('/geo/sichuansheng.json', (data) => {
    const dataObj = JSON.parse(data as string)
    geoJson.value = dataObj
    points.value = dataObj.features.map((item) => {
      return {
        name: item.properties.name,
        center: item.properties.centroid || item.properties.center,
      }
    })
  })

  loader.load('/geo/sichuan-outLine.json', (data) => {
    const dataStr = data as string
    const jsonData = JSON.parse(dataStr)
    geoJsonOutline.value = jsonData
  })
}

initGeoJson()
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
