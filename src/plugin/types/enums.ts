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

export enum AzureMapPolygonLayerEvent {
  Created = 'created',
}

export enum AzureMapTileLayerEvent {
  Created = 'created',
}

export enum AzureMapLineLayerEvent {
  Created = 'created',
}

export enum AzureMapImageLayerEvent {
  Created = 'created',
}

export enum AzureMapHeatMapLayerEvent {
  Created = 'created',
}

export enum AzureMapBubbleLayerEvent {
  Created = 'created',
}

export enum AzureMapImageSpriteIconEvent {
  Error = 'error',
  Added = 'added',
  Removed = 'removed',
}

export enum AzureMapPopupEvent {
  Created = 'created',
  Update = 'update',
  Open = 'open',
  Close = 'close',
}

export enum AzureMapSpiderClusterManagerEvent {
  FeatureSelected = 'feature-selected',
  FeatureUnselected = 'feature-unselected',
}

export enum AzureMapUserPositionEvent {
  Success = 'success',
  Error = 'error',
  PermissionDenied = 'permission-denied',
  PositionUnavailable = 'permission-unavailable',
  Timeout = 'timeout',
  UnknownError = 'unknown-error',
  Ready = 'ready',
}
