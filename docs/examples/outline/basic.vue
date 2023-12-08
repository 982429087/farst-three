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
        <FtOutline :options="highLightOptions" :selected="selectedObjes" />
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
  FtOrbitControls,
  FtOutline,
  FtPerspectiveCamera,
  FtProjection,
  FtScene,
  FtWebglRenderer,
  useGui,
} from 'farst-three'
import type { Mesh, Object3D } from 'three'
import type { FunsEvent, OutlineOptions } from 'farst-three'
import type { FeatureCollection, Geometry } from '@turf/turf'
const baseUrl = import.meta.env.VITE_BASE_URL

const domRef = ref<HTMLDivElement>()
const cameraOptions = reactive({
  position: {
    set: [3.53, 74.82, 112.39],
  },
})

const highLightOptions = reactive<OutlineOptions>({
  edgeStrength: 30.0, // 边框的亮度
  edgeGlow: 1, // 光晕[0,1]
  usePatternTexture: false, // 是否使用父级的材质
  edgeThickness: 1.0, // 边框宽度
  downSampleRatio: 1.0, // 边框弯曲度
  pulsePeriod: 0, // 呼吸闪烁的速度
  visibleEdgeColor: 0x02518d, // 无遮挡颜色
  hiddenEdgeColor: 0x02518d, // 被遮挡颜色
})
const selectedObjes = shallowRef<Object3D[]>([])

const geoJson = shallowRef<FeatureCollection<Geometry>>()
function initGeoJson() {
  const loader = new FileLoader()
  loader.load(`${baseUrl}geo/sichuansheng.json`, (data) => {
    const dataObj = JSON.parse(data as string)
    geoJson.value = dataObj
  })
}

function handleClick({ targets }: FunsEvent) {
  const target = targets[0]
  if (target) {
    selectedObjes.value = [target.object]
  }
}

initGeoJson()
const { guiPromise } = useGui(domRef)
guiPromise.then((gui) => {
  gui.add(highLightOptions, 'edgeStrength', 0, 100)
  gui.add(highLightOptions, 'edgeGlow', 0, 1)
  gui.add(highLightOptions, 'edgeThickness', 0, 10)
  gui.add(highLightOptions, 'downSampleRatio', 0, 1)
  gui.add(highLightOptions, 'pulsePeriod', 0, 10)
  gui.addColor(highLightOptions, 'visibleEdgeColor')
  gui.addColor(highLightOptions, 'hiddenEdgeColor')
})
</script>

<style lang="scss" scoped>
.farst-three {
  height: 700px;
  width: 100%;
  position: relative;
}
</style>
