import { Color, Group, Object3D } from 'three'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { merge } from 'lodash'
import type { LineMaterialParameters } from 'three/examples/jsm/lines/LineMaterial'
import type { GeoProjection } from 'd3-geo'
import type { Scene } from 'three'
import type { FeatureCollection, Geometry, Position } from '@turf/turf'

export type GeoJsonPlaneLinesOptions = {
  topLineMaterialOptions?: LineMaterialParameters
  showBottomLine?: boolean
  showTopLine?: boolean
  bottomLineMaterialOptions?: LineMaterialParameters
  topLineOptions?: {
    position: [number, number, number]
  }
  bottomLineOptions?: {
    position: [number, number, number]
  }
  z?: number
  geoJson?: FeatureCollection<Geometry>
}

export function useGeoJsonPlaneLines(
  scene: Scene,
  projection: GeoProjection,
  opts: GeoJsonPlaneLinesOptions
) {
  const defaultOptions = {
    showBottomLine: true,
    showTopLine: true,
    topLineMaterialOptions: {
      color: 0x68c5f6,
      linewidth: 0.002,
      vertexColors: true,
      dashed: false,
      alphaToCoverage: true,
    },
    bottomLineMaterialOptions: {
      color: 0x45bff8,
      linewidth: 0.004,
      vertexColors: true,
      dashed: false,
      alphaToCoverage: true,
    },
    topLineOptions: {
      position: [0, 0.1, -3] as [number, number, number],
    },
    bottomLineOptions: {
      position: [0, -3.2, -3] as [number, number, number],
    },
    z: 4.1,
  }
  const options = merge(defaultOptions, opts)
  const geoJson = options.geoJson!
  const group = new Group()

  function createLine(geometry: LineGeometry, material: LineMaterial) {
    const line = new Line2(geometry, material)
    line.computeLineDistances()
    line.rotateX(-Math.PI / 2)
    return line
  }

  // 上下两个线框
  function initMapLine() {
    // 顶部线条
    const topMaterial = new LineMaterial(options.topLineMaterialOptions)
    // 底部线条
    const bottomMaterial = new LineMaterial(options.bottomLineMaterialOptions)

    geoJson.features?.forEach((elem) => {
      const block = new Object3D()
      const coordinates = elem.geometry.coordinates as Position[][][]
      coordinates.forEach((multiPolygon) => {
        multiPolygon.forEach((polygon) => {
          const positions: number[] = []
          const colors: number[] = []
          const color = new Color()
          const linGeometry = new LineGeometry()

          for (const element of polygon) {
            const [x, y] = projection(element as [number, number]) as number[]
            positions.push(x, -y, options.z!)
            colors.push(color.r, color.g, color.b)
          }
          linGeometry.setPositions(positions)
          linGeometry.setColors(colors)

          if (options.showTopLine) {
            const topLine = createLine(linGeometry, topMaterial)
            topLine.position.set(...options.topLineOptions!.position!)
            block.add(topLine)
          }

          if (options.showBottomLine) {
            const bottomLine = createLine(linGeometry, bottomMaterial)
            bottomLine.position.set(...options.bottomLineOptions!.position!)
            block.add(bottomLine)
          }
        })
      })
      group.add(block)
    })
    scene.add(group)
  }

  function dispose() {
    scene.remove(group)

    group.traverse((obj) => {
      if (obj instanceof Line2) {
        obj.geometry.dispose()
        obj.material.dispose()
      }
    })
  }
  initMapLine()

  return {
    dispose,
    group,
  }
}
