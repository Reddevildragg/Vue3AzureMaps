import atlas from 'azure-maps-control'

//===
// Components
//===
import AzureMap from './components/AzureMap.vue'
import AzureMapDataSource from './components/AzureMapDataSource.vue'
import AzureMapHtmlMarker from './components/AzureMapHtmlMarker.vue'
import AzureMapPopup from './components/AzureMapPopup.vue'

//===
// Custom components
//===
import AzureMapUserPosition from './components/AzureMapUserPosition.vue'
import AzureMapImageSpriteIcon from './components/AzureMapImageSpriteIcon.vue'
import AzureMapSpiderClusterManager from './components/AzureMapSpiderClusterManager.vue'
import AzureMapFullscreenControl from './components/controls/AzureMapFullScreenControl.vue'
import AzureMapGeolocationControl from './components/controls/AzureMapGeolocationControl.vue'

//===
// Control components
//===
import AzureMapControl from './components/controls/AzureMapControl.vue'
import AzureMapZoomControl from './components/controls/AzureMapZoomControl.vue'
import AzureMapPitchControl from './components/controls/AzureMapPitchControl.vue'
import AzureMapStyleControl from './components/controls/AzureMapStyleControl.vue'
import AzureMapCompassControl from './components/controls/AzureMapCompassControl.vue'

//===
// Layer components
//===
import AzureMapSymbolLayer from './components/Layers/AzureMapSymbolLayer.vue'
import AzureMapPolygonLayer from './components/Layers/AzureMapPolygonLayer.vue'
import AzureMapLineLayer from './components/Layers/AzureMapLineLayer.vue'
import AzureMapHeatMapLayer from './components/Layers/AzureMapHeatMapLayer.vue'
import AzureMapImageLayer from './components/Layers/AzureMapImageLayer.vue'
import AzureMapTileLayer from './components/Layers/AzureMapTileLayer.vue'
import AzureMapBubbleLayer from './components/Layers/AzureMapBubbleLayer.vue'

//===
// Geometry components
//===
import AzureMapPoint from './components/geometries/AzureMapPoint.vue'
import AzureMapCircle from './components/geometries/AzureMapCircle.vue'
import AzureMapLineString from './components/geometries/AzureMapLineString.vue'
import AzureMapPolygon from './components/geometries/AzureMapPolygon.vue'

export * from './utils/customTypes.ts'
export * from './utils/enums.ts'
export * from './utils/dataGeneration.ts'

export {
  atlas,
  AzureMap,
  AzureMapDataSource,
  AzureMapHtmlMarker,
  AzureMapPopup,
  AzureMapUserPosition,
  AzureMapImageSpriteIcon,
  AzureMapSpiderClusterManager,
  AzureMapPoint,
  AzureMapCircle,
  AzureMapLineString,
  AzureMapPolygon,
  AzureMapControl,
  AzureMapZoomControl,
  AzureMapPitchControl,
  AzureMapStyleControl,
  AzureMapCompassControl,
  AzureMapFullscreenControl,
  AzureMapGeolocationControl,
  AzureMapSymbolLayer,
  AzureMapPolygonLayer,
  AzureMapLineLayer,
  AzureMapHeatMapLayer,
  AzureMapImageLayer,
  AzureMapTileLayer,
  AzureMapBubbleLayer,
}
