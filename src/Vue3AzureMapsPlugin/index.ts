import 'azure-maps-control/dist/atlas.min.css'

import VueAzureMaps from './vueAzureMaps.ts'

//===
// Components
//===
import AzureMap from './components/AzureMap.vue'
import AzureMapDataSource from './components/AzureMapDataSource.vue'
import AzureMapHtmlMarker from './components/AzureMapHtmlMarker.vue'
import AzureMapPopup from './components/AzureMapPopup.vue'

//===
// Control components
//===
import AzureMapControl from './components/controls/AzureMapControl.vue'
import AzureMapZoomControl from './components/controls/AzureMapZoomControl.vue'
import AzureMapPitchControl from './components/controls/AzureMapPitchControl.vue'
import AzureMapStyleControl from './components/controls/AzureMapStyleControl.vue'
import AzureMapCompassControl from './components/controls/AzureMapCompassControl.vue'

//===
// Custom components
//===
import AzureMapFullscreenControl from './components/controls/AzureMapFullscreenControl.vue'
import AzureMapGeolocationControl from './components/controls/AzureMapGeolocationControl.vue'
import AzureMapUserPosition from './components/AzureMapUserPosition.vue'
import AzureMapImageSpriteIcon from './components/AzureMapImageSpriteIcon.vue'
import AzureMapSpiderClusterManager from './components/AzureMapSpiderClusterManager.vue'

//===
// Geometry components
//===
import AzureMapPoint from './components/geometries/AzureMapPoint.vue'
import AzureMapCircle from './components/geometries/AzureMapCircle.vue'
import AzureMapLineString from './components/geometries/AzureMapLineString.vue'
import AzureMapPolygon from './components/geometries/AzureMapPolygon.vue'

//===
// Layer components
//===
import AzureMapSymbolLayer from './components/layers/AzureMapSymbolLayer.vue'
import AzureMapLineLayer from './components/layers/AzureMapLineLayer.vue'
import AzureMapPolygonLayer from './components/layers/AzureMapPolygonLayer.vue'
import AzureMapHeatMapLayer from './components/layers/AzureMapHeatMapLayer.vue'
import AzureMapImageLayer from './components/layers/AzureMapImageLayer.vue'
import AzureMapTileLayer from './components/layers/AzureMapTileLayer.vue'
import AzureMapBubbleLayer from './components/layers/AzureMapBubbleLayer.vue'

export {
  generateMockPoints,
  generateMockLineStrings,
  generateMockPolygons,
  generateRandomLongitude,
  generateRandomLatitude,
} from '@/Vue3AzureMapsPlugin/utils/dataGeneration.ts'

export {
  AzureMap,
  AzureMapDataSource,
  AzureMapControl,
  AzureMapZoomControl,
  AzureMapPitchControl,
  AzureMapStyleControl,
  AzureMapCompassControl,
  AzureMapFullscreenControl,
  AzureMapGeolocationControl,
  AzureMapPoint,
  AzureMapCircle,
  AzureMapSymbolLayer,
  AzureMapPolygonLayer,
  AzureMapLineLayer,
  AzureMapHeatMapLayer,
  AzureMapImageLayer,
  AzureMapTileLayer,
  AzureMapBubbleLayer,
  AzureMapLineString,
  AzureMapPolygon,
  AzureMapUserPosition,
  AzureMapImageSpriteIcon,
  AzureMapSpiderClusterManager,
  AzureMapHtmlMarker,
  AzureMapPopup,
}

export default VueAzureMaps
