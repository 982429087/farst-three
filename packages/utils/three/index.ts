import { geoMercator } from 'd3-geo'

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 *
 * @param center 地图中心点经纬度
 * @param scale 缩放比例
 * @param translate 画布偏移量,不偏移就是[0,0]
 * @returns
 */
export function useProjection(
  center: [number, number],
  scale: number,
  translate: [number, number] = [0, 0]
) {
  const projection = geoMercator()
    .center(center)
    .scale(scale)
    .translate(translate)
  return projection
}
