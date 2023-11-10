import { Color, Group, Object3D } from 'three'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import type { GeoProjection } from 'd3-geo'
import type { Scene } from 'three'
import type { FeatureCollection, Geometry, Position } from '@turf/turf'

export function useGeoJsonPlaneLines(
  scene: Scene,
  projection: GeoProjection,
  geoJson: FeatureCollection<Geometry>
) {
  const map = new Group()

  // 上下两个线框
  function initMapLine() {
    const matLine = new LineMaterial({
      color: 0x68c5f6,
      linewidth: 0.002,
      vertexColors: true,
      dashed: false,
      alphaToCoverage: true,
    })

    const matLine2 = new LineMaterial({
      color: 0x45bff8,
      linewidth: 0.004,
      vertexColors: true,
      dashed: false,
      alphaToCoverage: true,
    })
    // 遍历省份构建模型
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
            positions.push(x, -y, 4.01)
            color.setHSL(1, 1, 1)
            colors.push(color.r, color.g, color.b)
          }
          //Line2
          linGeometry.setPositions(positions)
          linGeometry.setColors(colors)
          const line = new Line2(linGeometry, matLine)
          const line2 = new Line2(linGeometry, matLine2)
          line.computeLineDistances()
          line.rotateX(-Math.PI / 2)
          line2.rotateX(-Math.PI / 2)
          line.position.set(0, 0.1, -3)
          line2.position.set(0, -3.2, -3)
          line2.computeLineDistances()
          line.scale.set(1, 1, 1)
          block.add(line)
          block.add(line2)
        })
      })
      map.add(block)
    })
    scene.add(map)
  }

  initMapLine()

  function dispose() {
    map.traverse((obj) => {
      if (obj instanceof Line2) {
        obj.geometry.dispose()
        obj.material.dispose()
      }
    })
    scene.remove(map)
  }

  return {
    dispose,
  }
}
