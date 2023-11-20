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
          logarithmicDepthBuffer: true,
        }"
      >
        <FtProjection
          :center="[102.44662948242187, 30.927128325051036]"
          :scale="450"
        >
          <FtGeoJsonPlane
            :geo-json="geoJson"
            :cursor="'pointer'"
            @click="handleClick"
            @load="planeLoad"
          />
          <FtHighLight />

          <FtEdgeMoveLine :geojson="geoJsonOutline" />
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
          <FtUpParticle
            :options="{
              count: 10,
            }"
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
        <FtAmbientLight :color="0x02518d" :intensity="1" />
        <FtDirectionalLight
          :color="0x02518d"
          :intensity="1"
          :options="{ position: { set: [100, 10, -100] } }"
        />
        <FtDirectionalLight
          :color="0x02518d"
          :intensity="1"
          :options="{ position: { set: [100, 10, 100] } }"
        />
      </FtWebglRenderer>
    </FtScene>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { Color, FileLoader } from 'three'
import {
  FtAmbientLight,
  FtAxesHelper,
  FtDiffusionWave,
  FtDirectionalLight,
  FtDomMarker,
  FtDomMarkerRenderer,
  FtEdgeMoveLine,
  FtGeoJsonPlane,
  FtHighLight,
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
  HIGHLITHT_SCENE,
} from 'farst-three'
import type { FunsEvent, GeoJsonPlaneLoadEvent } from 'farst-three'
import type { Mesh, Object3D } from 'three'
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
const map: Record<string, Object3D> = {}

function planeLoad(e: GeoJsonPlaneLoadEvent) {
  const o3d = e.geoJsonPlane.planeGroup.children[0]
  o3d.layers.enable(HIGHLITHT_SCENE)
  map[o3d.id] = o3d
}

function handleClick({ targets }: FunsEvent) {
  const target = targets[0]
  if (target) {
    const object = target.object as Mesh
    for (const [, value] of Object.entries(map)) {
      value.layers.disable(1)
    }
    if (!map[object.id]) {
      map[object.id] = object
      object.layers.enable(1)
    } else {
      object.layers.enable(1)
    }
  } else {
    for (const [, value] of Object.entries(map)) {
      value.layers.disable(1)
    }
  }
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
