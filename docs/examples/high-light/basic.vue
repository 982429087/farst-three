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
        <FtHighLight :options="highLightOptions" />
        <FtProjection
          :center="[102.44662948242187, 30.927128325051036]"
          :scale="450"
        >
          <FtGeoJsonPlane
            :geo-json="geoJson"
            :click-options="{
              allTheTime: true,
            }"
            cursor="pointer"
            @click="handleClick"
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
import { reactive, ref, shallowRef } from 'vue'
import { FileLoader } from 'three'
import {
  FtAmbientLight,
  FtDirectionalLight,
  FtGeoJsonPlane,
  FtHighLight,
  FtOrbitControls,
  FtPerspectiveCamera,
  FtProjection,
  FtScene,
  FtWebglRenderer,
  useGui,
} from 'farst-three'
import type { Mesh } from 'three'
import type { FunsEvent, HighLightOptions } from 'farst-three'
import type { FeatureCollection, Geometry } from '@turf/turf'

const domRef = ref<HTMLDivElement>()
const cameraOptions = reactive({
  position: {
    set: [3.53, 74.82, 112.39],
  },
})

const highLightOptions = reactive<HighLightOptions>({
  strength: 0.78,
  threshold: 0,
  radius: 0.1,
  exposure: 6,
})

const geoJson = shallowRef<FeatureCollection<Geometry>>()
function initGeoJson() {
  const loader = new FileLoader()
  loader.load('/geo/sichuansheng.json', (data) => {
    const dataObj = JSON.parse(data as string)
    geoJson.value = dataObj
  })
}
// 高亮

const map: Record<string, Mesh> = {}
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
const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.add(highLightOptions, 'strength', 0, 1, 0.01)
  gui.add(highLightOptions, 'threshold', 0, 1, 0.01)
  gui.add(highLightOptions, 'radius', 0, 1, 0.01)
  gui.add(highLightOptions, 'exposure', -20, 20, 1)
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
