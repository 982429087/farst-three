<template>
  <slot />
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue'
import {
  ExtrudeGeometry,
  FileLoader,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Object3D,
  Shape,
  Vector2,
} from 'three'
import { isString } from '@vueuse/core'
import { center } from '@turf/turf'
import { geoMercator } from 'd3'
import {
  effectComposer,
  useAnimationService,
  useScene,
  useStoreService,
} from '@farst-three/hooks'
import {
  MeshLine,
  MeshLineMaterial,
  useTextGeometry,
} from '@farst-three/components'
import { geoPlaneEmits, geoPlaneProps } from './geo-plane'
import { useLight } from './use-light'
import { useReflector } from './use-reflector'
import type { FeatureCollection, Geometry, Position } from '@turf/turf'
defineOptions({
  name: 'FtGeoPlane',
})

const props = defineProps(geoPlaneProps)
const emit = defineEmits(geoPlaneEmits)
let scene = useScene()

const loader = new FileLoader()

let material: MeshBasicMaterial | undefined
const map = new Object3D()
loader.load(props.url, (data) => {
  if (isString(data)) {
    const jsondata = JSON.parse(data) as FeatureCollection<Geometry>
    const c = center(jsondata).geometry.coordinates as [number, number]
    generateGeometry(jsondata, c)
  }
})

function getLin(vertices: number[]) {
  const groups = new Group()
  if (vertices.length != 0) {
    const line = new MeshLine()
    line.setPoints(vertices)
    const material = new MeshLineMaterial({
      useMap: 0,
      color: '#0fb9ee',
      opacity: 1,
      resolution: new Vector2(window.innerWidth, window.innerHeight),
      sizeAttenuation: 2,
      lineWidth: 0.02,
      transparent: true,
      wireframe: false,
    })
    const mesh = new Mesh(line.geometry, material)
    mesh.layers.enable(1)
    groups.add(mesh)
    map.add(groups)
  }
}

function generateGeometry(
  data: FeatureCollection<Geometry>,
  centerPoint: [number, number]
) {
  const projection = geoMercator().center(centerPoint).translate([0, 0])
  data.features.forEach((elem) => {
    const province = new Object3D()
    const coordinates = elem.geometry.coordinates as Position[][][]
    const lineArr: number[] = []
    useTextGeometry(
      {
        text: elem.properties?.name,
        url: '/font/Microsoft YaHei_Regular.json',
      },
      {
        size: 0.1,
        height: 0.01,
        depth: 0.01,
      }
    ).then((geometry) => {
      const material = new MeshPhongMaterial({
        color: '#000',
        transparent: true,
        opacity: 0.45,
      })
      const mesh = new Mesh(geometry, material)
      const proviceCenterPoint = projection(
        center(elem).geometry.coordinates as [number, number]
      )!
      mesh.position.set(proviceCenterPoint[0], proviceCenterPoint[1], 0.501)
      province.add(mesh)
    })

    coordinates.forEach((multiPolygon) => {
      multiPolygon.forEach((polygon) => {
        lineArr.length = 0
        const shape = new Shape()
        for (const [i, element] of polygon.entries()) {
          const [x, y] = projection(element as [number, number])!
          if (!x) {
            continue
          }
          if (i === 0) {
            shape.moveTo(x, -y)
          }
          lineArr.push(x, -y, 0.501)
          shape.lineTo(x, -y)
        }
        getLin(lineArr)
        material = new MeshBasicMaterial({
          color: '#ffffff',
          transparent: true,
          opacity: 0.9,
        })
        const materialDepth = new MeshBasicMaterial({
          color: '#fff',
          transparent: true,
          opacity: 0.45,
        })

        const extrudeSettings = {
          depth: 0.5,
          bevelEnabled: false,
        }
        const geometry = new ExtrudeGeometry(shape, extrudeSettings)
        const mesh = new Mesh(geometry, [material, materialDepth])
        province.add(mesh)
      })
    })
    map.add(province)
  })
}
scene.add(map)

const store = useStoreService()
const renderer = store.getRenderer()!
const animation = useAnimationService()
const camera = store.getRenderCamera()!
const { render } = useLight(scene, camera, renderer)
useReflector(scene)
animation.on(effectComposer, () => {
  render()
})
emit('load', { scene })

onBeforeUnmount(() => {
  scene.remove(map)
  ;(scene as any) = null
})
</script>
