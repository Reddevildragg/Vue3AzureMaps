import atlas from 'azure-maps-control'
import './vue.ts'
import { VueAzureMaps } from './vue-azure-maps.ts'

//===
// Components
//===
import AzureMap from '@/Vue3AzureMapsPlugin/components/AzureMap.vue'
import AzureMapDataSource from '@/Vue3AzureMapsPlugin/components/AzureMapDataSource.vue'
import AzureMapHtmlMarker from '@/Vue3AzureMapsPlugin/components/AzureMapHtmlMarker.vue'
import AzureMapPopup from '@/Vue3AzureMapsPlugin/components/AzureMapPopup.vue'

//===
// Custom components
//===
import AzureMapUserPosition from '@/Vue3AzureMapsPlugin/components/AzureMapUserPosition.vue'
import AzureMapImageSpriteIcon from '@/Vue3AzureMapsPlugin/components/AzureMapImageSpriteIcon.vue'
import AzureMapSpiderClusterManager from '@/Vue3AzureMapsPlugin/components/AzureMapSpiderClusterManager.vue'
import AzureMapFullscreenControl from '@/Vue3AzureMapsPlugin/components/controls/AzureMapFullscreenControl.vue'
import AzureMapGeolocationControl from '@/Vue3AzureMapsPlugin/components/controls/AzureMapGeolocationControl.vue'

//===
// Control components
//===
import AzureMapControl from '@/Vue3AzureMapsPlugin/components/controls/AzureMapControl.vue'
import AzureMapZoomControl from '@/Vue3AzureMapsPlugin/components/controls/AzureMapZoomControl.vue'
import AzureMapPitchControl from '@/Vue3AzureMapsPlugin/components/controls/AzureMapPitchControl.vue'
import AzureMapStyleControl from '@/Vue3AzureMapsPlugin/components/controls/AzureMapStyleControl.vue'
import AzureMapCompassControl from '@/Vue3AzureMapsPlugin/components/controls/AzureMapCompassControl.vue'

//===
// Layer components
//===
import AzureMapSymbolLayer from '@/plugin/components/layers/AzureMapSymbolLayer.vue'
import AzureMapPolygonLayer from '@/plugin/components/layers/AzureMapPolygonLayer.vue'
import AzureMapLineLayer from '@/plugin/components/layers/AzureMapLineLayer.vue'
import AzureMapHeatMapLayer from '@/plugin/components/layers/AzureMapHeatMapLayer.vue'
import AzureMapImageLayer from '@/plugin/components/layers/AzureMapImageLayer.vue'
import AzureMapTileLayer from '@/plugin/components/layers/AzureMapTileLayer.vue'
import AzureMapBubbleLayer from '@/plugin/components/layers/AzureMapBubbleLayer.vue'

//===
// Geometry components
//===
import AzureMapPoint from '@/Vue3AzureMapsPlugin/components/geometries/AzureMapPoint.vue'
import AzureMapCircle from '@/Vue3AzureMapsPlugin/components/geometries/AzureMapCircle.vue'
import AzureMapLineString from '@/Vue3AzureMapsPlugin/components/geometries/AzureMapLineString.vue'
import AzureMapPolygon from '@/Vue3AzureMapsPlugin/components/geometries/AzureMapPolygon.vue'

export default VueAzureMaps

export { VueAzureMapsPluginOptions } from './vue-azure-maps.ts'
export {
  MapOptions,
  CustomPoint,
  CustomLine,
  CustomPolygon,
} from '@/Vue3AzureMapsPlugin/types/customTypes.ts'

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
