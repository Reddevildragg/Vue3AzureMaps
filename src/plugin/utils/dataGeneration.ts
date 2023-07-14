import { CustomPoint } from '@/plugin/types'

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

export function generateRandomLongitude(): number {
  return Math.random() * 360 - 180
}

export function generateRandomLatitude(): number {
  return Math.random() * 170 - 85
}
