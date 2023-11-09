import { geoMercator } from 'd3'

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
