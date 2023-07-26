import atlas from 'azure-maps-control'

export type MapOptions = atlas.ServiceOptions &
  atlas.CameraOptions &
  atlas.StyleOptions &
  atlas.UserInteractionOptions

export type CustomPoint = {
  longitude: number
  latitude: number
  properties: Record<string, unknown>
}

export type CustomLine = {
  name: string
  coordinates: Array<atlas.data.Position>
}

export type CustomPolygon = {
  name: string
  coordinates: Array<atlas.data.Position>
}
