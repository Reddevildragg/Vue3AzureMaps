import 'azure-maps-control/dist/atlas.min.css'

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
import AzureMapFullscreenControl from './components/controls/AzureMapFullScreenControl.vue'
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
import AzureMapSymbolLayer from './components/Layers/AzureMapSymbolLayer.vue'
import AzureMapLineLayer from './components/Layers/AzureMapLineLayer.vue'
import AzureMapPolygonLayer from './components/Layers/AzureMapPolygonLayer.vue'
import AzureMapHeatMapLayer from './components/Layers/AzureMapHeatMapLayer.vue'
import AzureMapImageLayer from './components/Layers/AzureMapImageLayer.vue'
import AzureMapTileLayer from './components/Layers/AzureMapTileLayer.vue'
import AzureMapBubbleLayer from './components/Layers/AzureMapBubbleLayer.vue'
import Vue3AzureMaps from '@/vue3-azure-maps/vue3-azure-maps.ts'

export type {
  CustomLine,
  CustomPoint,
  CustomPolygon,
  MapOptions,
} from './utils/customTypes.ts'

export * from './utils/enums.ts'
export {
  generateMockPoints,
  generateMockPolygons,
  generateMockLineStrings,
  generateRandomLatitude,
  generateRandomLongitude,
} from './utils/dataGeneration.ts'
export { azureMapStore } from '@/vue3-azure-maps/store/azureMapStore.ts'
export default Vue3AzureMaps
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
