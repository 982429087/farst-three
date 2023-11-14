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
          <FtDomMarkerRenderer>
            <template v-for="item in points" :key="item.name">
              <FtDomMarker
                :x="item.center[0]"
                :y="item.center[1]"
                :z="5.1"
                :y-key="'z'"
                :z-key="'y'"
              >
                {{ item.name }}
              </FtDomMarker>
              <!-- 这里是为了统一循环，只有domMarker需要在domMarkerRender下， 其他两个组件不需要 -->
              <FtPointMarker
                :options="{
                  x: item.center[0],
                  y: item.center[1],
                  z: 4.1,
                  yKey: 'z',
                  zKey: 'y',
                }"
              />
              <FtPillar
                :options="{
                  x: item.center[0],
                  y: item.center[1],
                  z: 4.2,
                  yKey: 'z',
                  zKey: 'y',
                  height: 9,
                }"
              />
            </template>
          </FtDomMarkerRenderer>

          <FtReflectorPlane />
          <FtDiffusionWave />
          <FtRotationPlane
            :options="{
              texture: '/geo/rotating-aperture.png',
            }"
            :mesh-options="{
              scale: {
                set: [1.2, 1.2, 1.2],
              },
            }"
          />
          <FtRotationPlane
            :options="{
              texture: '/geo/rotating-point2.png',
              speed: -0.005,
            }"
            :mesh-options="{
              position: {
                y: 0.25,
              },
            }"
          />
          <FtUpParticle />
        </FtProjection>
        <FtOrbitControls
          :options="{
            enableDamping: true,
            enableZoom: false,
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
  FtOrbitControls,
  FtPerspectiveCamera,
  FtPillar,
  FtPointMarker,
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

<style>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
.ft-dom-marker-container {
  font-size: 12px;
}
</style>
