export enum AzureMapPointEvent {
  GeometryCreated = 'geometry-created',
  ShapeCreated = 'shape-created',
  ShapeAdded = 'shape-added',
  CircleCoordinates = 'circle-coordinates',
}

export enum AzureMapEvent {
  Ready = 'ready',
}

export enum AzureMapSymbolLayerEvent {
  Created = 'created',
}

enum AzureMapLineStringEvents {
  Error = 'error',
}
