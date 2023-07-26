import { CustomPoint } from '@/vue3-azure-maps/types.ts'
import {
  CustomLine,
  CustomPolygon,
} from '@/vue3-azure-maps/types/customTypes.ts'

export function generateMockPoints(
  mockPointSize: number = 5
): Array<CustomPoint> {
  const points: Array<CustomPoint> = []

  // Generate a bunch of points with random coordinates
  for (let i = 0; i < mockPointSize; i++) {
    points.push({
      longitude: generateRandomLongitude(),
      latitude: generateRandomLatitude(),
      properties: {
        name: `Point-${i}`,
        description: `This is a popup for Point-${i}.`,
        isPopupOpen: false,
      },
    })
  }

  return points
}

export function generateMockLineStrings(
  mockLineStringSize: number = 5
): Array<CustomLine> {
  const lineStrings: Array<CustomLine> = []
  // Generate a bunch of line strings with random coordinates
  for (let i = 0; i < mockLineStringSize; i++) {
    lineStrings.push({
      name: `LineString-${i}`,
      coordinates: [
        [generateRandomLongitude(), generateRandomLatitude()],
        [generateRandomLongitude(), generateRandomLatitude()],
      ],
    })
  }

  return lineStrings
}

export function generateMockPolygons(
  mockPolygonSize: number = 2
): Array<CustomPolygon> {
  const polygons: Array<CustomPolygon> = []

  // Generate a bunch of polygons with random coordinates
  for (let i = 0; i < mockPolygonSize; i++) {
    polygons.push({
      name: `Polygon-${i}`,
      coordinates: [
        [generateRandomLongitude(), generateRandomLatitude()],
        [generateRandomLongitude(), generateRandomLatitude()],
        [generateRandomLongitude(), generateRandomLatitude()],
        [generateRandomLongitude(), generateRandomLatitude()],
        [generateRandomLongitude(), generateRandomLatitude()],
      ],
    })
  }
  return polygons
}

export function generateRandomLongitude(): number {
  return Math.random() * 360 - 180
}

export function generateRandomLatitude(): number {
  return Math.random() * 170 - 85
}
