import atlas from 'azure-maps-control'

/*
 * Copyright(c) 2019 Microsoft Corporation. All rights reserved.
 *
 * This code is licensed under the MIT License (MIT).
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Options used to customize how the SpiderClusterManager renders clusters.
 */
export interface ISpiderClusterOptions {
  /** Minimium number of point features in cluster before switching from circle to spiral spider layout. Default: 6 */
  circleSpiralSwitchover?: number

  /** The minium pixel distance between point features and the cluster, when rendering spider layout as a circle. Default: 30 */
  minCircleLength?: number

  /** The minium angle between point features in the spiral. Default: 25 */
  minSpiralAngleSeperation?: number

  /** The maximum number of features that can be rendered in the spider layout. When the cluster is bigger than this value, it will zoom until the cluster starts to break apart. Default: 100 */
  maxFeaturesInWeb?: number

  /** A factor that is used to grow the pixel distance of each point feature from the center in the spiral. Default: 5 */
  spiralDistanceFactor?: number

  /** Layer options used to style the stick connecting the individual point feature to the cluster. */
  stickLayerOptions?: atlas.LineLayerOptions

  /**
   * A callback function that is fired when an individual point feature is clicked.
   * If the point feature is part of a cluster, the cluster will also be returned in the callback.
   */
  featureSelected?: (
    shape: atlas.Shape,
    cluster: atlas.data.Feature<atlas.data.Point, any> | null
  ) => void

  /** A callback that is fired when a point feature is unselected or a spider cluster is collapsed. */
  featureUnselected?: () => void

  /** A boolean indicating if the cluster layer is visible or not. */
  visible?: boolean
}

/**
 * Adds a clustering layer to the map which expands clusters into a spiral spider layout.
 */
export class SpiderClusterManager {
  /**********************
   * Private Properties
   ***********************/

  private _atlasLib: typeof atlas
  private _map: atlas.Map
  private _datasource: atlas.source.DataSource
  private _spiderDataSource: atlas.source.DataSource
  private _clusterLayer: atlas.layer.BubbleLayer | atlas.layer.SymbolLayer
  private _unclustedLayer: atlas.layer.BubbleLayer | atlas.layer.SymbolLayer
  private _spiderFeatureLayer: atlas.layer.BubbleLayer | atlas.layer.SymbolLayer
  private _spiderLineLayer: atlas.layer.LineLayer
  private _hoverStateId: string | null = null
  private _spiderDatasourceId: string
  private _currentCluster: atlas.data.Feature<atlas.data.Point, any> | null =
    null

  private _options: ISpiderClusterOptions = {
    circleSpiralSwitchover: 6,
    minCircleLength: 30,
    minSpiralAngleSeperation: 25,
    spiralDistanceFactor: 5,
    maxFeaturesInWeb: 100,
    stickLayerOptions: {
      strokeColor: [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        'red',
        'black',
      ],
    },
    featureSelected: undefined,
    featureUnselected: undefined,
  }

  /**********************
   * Constructor
   ***********************/

  /**
   * @constructor
   * A cluster manager that expands clusters when selectd into a spiral layout.
   * @param map A map instance to add the cluster layer to.
   * @param clusterLayer The layer used for rendering the clusters.
   * @param options A combination of SpiderClusterManager and Cluster options.
   */
  constructor(
    lib: typeof atlas,
    map: atlas.Map,
    clusterLayer: atlas.layer.BubbleLayer | atlas.layer.SymbolLayer,
    unclustedLayer: atlas.layer.BubbleLayer | atlas.layer.SymbolLayer,
    options?: ISpiderClusterOptions
  ) {
    this._atlasLib = lib
    this._map = map
    this._clusterLayer = clusterLayer

    var s = clusterLayer.getSource()
    if (typeof s === 'string') {
      s = map.sources.getById(s)
    }

    if (s instanceof this._atlasLib.source.DataSource) {
      this._datasource = s
    } else {
      throw 'Data source on cluster layer is not supported.'
    }

    options = options || {}

    //Create a data source to manage the spider lines.
    this._spiderDataSource = new this._atlasLib.source.DataSource()
    map.sources.add(this._spiderDataSource)

    this._spiderDatasourceId = this._spiderDataSource.getId()

    this._spiderLineLayer = new this._atlasLib.layer.LineLayer(
      this._spiderDataSource,
      undefined,
      this._options.stickLayerOptions
    )
    map.layers.add(this._spiderLineLayer)

    //Make a copy of the cluster layer options.
    var unclustedLayerOptions = this._deepCopy(unclustedLayer.getOptions(), [
      'source',
    ])
    unclustedLayerOptions.filter = [
      'any',
      ['==', ['geometry-type'], 'Point'],
      ['==', ['geometry-type'], 'MultiPoint'],
    ] //Only render Point or MultiPoints in this layer.;

    this._unclustedLayer = unclustedLayer

    if (unclustedLayer instanceof this._atlasLib.layer.BubbleLayer) {
      this._spiderFeatureLayer = new this._atlasLib.layer.BubbleLayer(
        this._spiderDataSource,
        undefined,
        unclustedLayerOptions
      )
    } else {
      unclustedLayerOptions.iconOptions =
        unclustedLayerOptions.iconOptions || {}
      unclustedLayerOptions.iconOptions.allowOverlap = true
      unclustedLayerOptions.iconOptions.ignorePlacement = true
      this._spiderFeatureLayer = new this._atlasLib.layer.SymbolLayer(
        this._spiderDataSource,
        undefined,
        unclustedLayerOptions
      )
    }

    map.layers.add(this._spiderFeatureLayer)

    this.setOptions(options)

    map.events.add('click', this.hideSpiderCluster)
    map.events.add('movestart', this.hideSpiderCluster)
    map.events.add(
      'mouseleave',
      this._spiderFeatureLayer,
      this._unhighlightStick
    )
    map.events.add('mousemove', this._spiderFeatureLayer, this._highlightStick)
    map.events.add('click', this._layerClickEvent)
    map.events.add('click', this._clusterLayer, this._layerClickEvent)
    map.events.add('click', this._spiderFeatureLayer, this._layerClickEvent)
    map.events.add('click', this._unclustedLayer, this._layerClickEvent)
  }

  /**********************
   * Public Functions
   ***********************/

  /**
   * Disposes the SpiderClusterManager and releases it's resources.
   */
  public dispose(): void {
    //Remove events.
    this._map.events.remove('click', this.hideSpiderCluster)
    this._map.events.remove('movestart', this.hideSpiderCluster)
    //@ts-ignore
    this._map.events.remove('click', this._clusterLayer, this._layerClickEvent)
    this._map.events.remove(
      'mouseleave',
      //@ts-ignore
      this._spiderFeatureLayer,
      this._unhighlightStick
    )
    this._map.events.remove(
      'mousemove',
      //@ts-ignore
      this._spiderFeatureLayer,
      this._highlightStick
    )
    this._map.events.remove(
      'click',
      //@ts-ignore
      this._spiderFeatureLayer,
      this._layerClickEvent
    )
    this._map.events.remove(
      'click',
      //@ts-ignore
      this._unclustedLayer,
      this._layerClickEvent
    )

    //Remove layers.
    this._map.layers.remove(this._spiderFeatureLayer)
    ;(this._spiderFeatureLayer as
      | atlas.layer.BubbleLayer
      | atlas.layer.SymbolLayer
      | null) = null

    this._map.layers.remove(this._spiderLineLayer)
    ;(this._spiderLineLayer as atlas.layer.LineLayer | null) = null

    //Clear and dispose of datasource.
    this._spiderDataSource.clear()
    this._map.sources.remove(this._spiderDataSource)
    ;(this._spiderDataSource as atlas.source.DataSource | null) = null
  }

  /**
   * Collapses any open spider clusters.
   */
  private hideSpiderCluster = (): void => {
    this._spiderDataSource.clear()
  }

  /**
   * Sets the options used to customize how the SpiderClusterManager renders clusters.
   * @param options The options used to customize how the SpiderClusterManager renders clusters.
   */
  public setOptions(options: ISpiderClusterOptions): void {
    this.hideSpiderCluster()

    if (options) {
      if (typeof options.circleSpiralSwitchover === 'number') {
        this._options.circleSpiralSwitchover = options.circleSpiralSwitchover
      }

      if (typeof options.maxFeaturesInWeb === 'number') {
        this._options.maxFeaturesInWeb = options.maxFeaturesInWeb
      }

      if (typeof options.minSpiralAngleSeperation === 'number') {
        this._options.minSpiralAngleSeperation =
          options.minSpiralAngleSeperation
      }

      if (typeof options.spiralDistanceFactor === 'number') {
        this._options.spiralDistanceFactor = options.spiralDistanceFactor
      }

      if (typeof options.minCircleLength === 'number') {
        this._options.minCircleLength = options.minCircleLength
      }

      if (options.stickLayerOptions) {
        this._options.stickLayerOptions = options.stickLayerOptions
        this._spiderLineLayer.setOptions(options.stickLayerOptions)
      }

      if (options.featureSelected) {
        this._options.featureSelected = options.featureSelected
      }

      if (options.featureUnselected) {
        this._options.featureUnselected = options.featureUnselected
      }

      if (
        typeof options.visible === 'boolean' &&
        this._options.visible !== options.visible
      ) {
        this._options.visible = options.visible
        this._spiderLineLayer.setOptions({ visible: options.visible })
        ;(<atlas.layer.SymbolLayer>this._spiderFeatureLayer).setOptions({
          visible: options.visible,
        })
      }
    }
  }

  /**
   * Expands a cluster into it's open spider layout.
   * @param cluster The cluster to show in it's open spider layout.
   */
  public showSpiderCluster(
    cluster: atlas.data.Feature<atlas.data.Point, atlas.ClusteredProperties>
  ): void {
    this.hideSpiderCluster()

    if (cluster && (<atlas.ClusteredProperties>cluster.properties).cluster) {
      this._datasource
        .getClusterLeaves(
          (<atlas.ClusteredProperties>cluster.properties).cluster_id,
          this._options.maxFeaturesInWeb as number,
          0
        )
        .then((children) => {
          //Create spider data.
          var center = cluster.geometry.coordinates
          var centerPoint = this._map.positionsToPixels([center])[0]
          var angle: number = 0

          var makeSpiral: boolean =
            children.length > (this._options.circleSpiralSwitchover as number)

          var legPixelLength: number
          var stepAngle: number = 0
          var stepLength: number = 0

          if (makeSpiral) {
            legPixelLength = (this._options.minCircleLength as number) / Math.PI
            stepLength =
              2 * Math.PI * (this._options.spiralDistanceFactor as number)
          } else {
            stepAngle = (2 * Math.PI) / children.length

            legPixelLength =
              ((this._options.spiralDistanceFactor as number) /
                stepAngle /
                Math.PI /
                2) *
              children.length

            if (legPixelLength < (this._options.minCircleLength as number)) {
              legPixelLength = this._options.minCircleLength as number
            }
          }

          var shapes = []

          for (var i = 0, len = children.length; i < len; i++) {
            //Calculate spider point feature location.
            if (makeSpiral) {
              angle +=
                (this._options.minSpiralAngleSeperation as number) /
                  legPixelLength +
                i * 0.0005
              legPixelLength += stepLength / angle
            } else {
              angle = stepAngle * i
            }

            var pos = this._map.pixelsToPositions([
              [
                centerPoint[0] + legPixelLength * Math.cos(angle),
                centerPoint[1] + legPixelLength * Math.sin(angle),
              ],
            ])[0]

            //Create stick to point feature.
            var stick = new this._atlasLib.data.Feature(
              new this._atlasLib.data.LineString([center, pos]),
              null,
              i + ''
            )
            shapes.push(stick)

            //Create point feature in spiral that contains same metadata as parent point feature.
            var c = children[i]
            var p =
              c instanceof this._atlasLib.Shape
                ? c.getProperties()
                : c.properties
            var id = c instanceof this._atlasLib.Shape ? c.getId() : c.id

            //Make a copy of the properties.
            p = this._deepCopy(p)
            p._stickId = i + ''
            p._parentId = id

            shapes.push(
              new this._atlasLib.data.Feature(
                new this._atlasLib.data.Point(pos),
                p
              )
            )
          }

          this._spiderDataSource.add(shapes)
        })
    }
  }

  /**********************
   * Private Functions
   ***********************/

  /**
   * Click event handler for when a shape in the cluster layer is clicked.
   * @param e The mouse event argurment from the click event.
   */
  private _layerClickEvent = (e: atlas.MapMouseEvent): void => {
    if (e && e.shapes && e.shapes.length > 0) {
      var prop
      var pos:
        | atlas.data.Position
        | atlas.data.Position[]
        | atlas.data.Position[][]
        | atlas.data.Position[][][]
      var s: atlas.Shape | undefined
      var f: atlas.data.Feature<atlas.data.Point, any> | undefined

      if (e.shapes[0] instanceof this._atlasLib.Shape) {
        s = <atlas.Shape>e.shapes[0]
        prop = s.getProperties()
        pos = s.getCoordinates()
      } else {
        f = <atlas.data.Feature<atlas.data.Point, any>>e.shapes[0]
        prop = f.properties
        pos = f.geometry.coordinates
      }

      if (prop.cluster) {
        if (this._options.featureUnselected) {
          this._options.featureUnselected()
        }

        this._currentCluster = <atlas.data.Feature<atlas.data.Point, any>>(
          e.shapes[0]
        )

        if (prop.point_count > (this._options.maxFeaturesInWeb as number)) {
          this._datasource
            .getClusterExpansionZoom(prop.cluster_id)
            .then((zoom) => {
              this._map.setCamera({
                center: pos,
                zoom: zoom,
              })
            })
        } else if (f) {
          this.showSpiderCluster(f)
        }
      } else {
        if (typeof prop._parentId !== 'undefined') {
          s = this._datasource.getShapeById(prop._parentId)
        } else {
          ;(this._currentCluster as atlas.data.Feature<
            atlas.data.Point,
            any
          > | null) = null

          if (this._options.featureUnselected) {
            this._options.featureUnselected()
          }
        }

        if (this._options.featureSelected && s) {
          this._options.featureSelected(s, this._currentCluster)
        }

        this.hideSpiderCluster()
      }

      e.preventDefault()
    }
  }

  private _highlightStick = (e: atlas.MapMouseEvent): void => {
    if (e && e.shapes && e.shapes.length > 0) {
      var stickId: string

      if (e.shapes[0] instanceof this._atlasLib.Shape) {
        stickId = (<atlas.Shape>e.shapes[0]).getProperties()._stickId
      } else {
        stickId = (<atlas.data.Feature<atlas.data.Point, any>>e.shapes[0])
          .properties._stickId
      }

      if (this._hoverStateId) {
        // @ts-ignore TODO: replace with built-in function.
        this._map.map.setFeatureState(
          { source: this._spiderDatasourceId, id: this._hoverStateId },
          { hover: false }
        )
      }

      this._hoverStateId = stickId
      // @ts-ignore TODO: replace with built-in function.
      this._map.map.setFeatureState(
        { source: this._spiderDatasourceId, id: this._hoverStateId },
        { hover: true }
      )
    }
  }

  private _unhighlightStick = (e: atlas.MapMouseEvent): void => {
    if (this._hoverStateId) {
      // @ts-ignore TODO: replace with built-in function.
      this._map.map.setFeatureState(
        { source: this._spiderDatasourceId, id: this._hoverStateId },
        { hover: false }
      )
      this._hoverStateId = null
    }
  }

  private _deepCopy(obj: any, filter?: string[]): any {
    var copy = obj,
      k

    if (obj && typeof obj === 'object') {
      copy = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {}
      for (k in obj) {
        if (
          !Array.isArray(filter) ||
          (Array.isArray(filter) && filter.indexOf(k) !== -1)
        ) {
          copy[k] = this._deepCopy(obj[k], filter)
        }
      }
    }

    return copy
  }
}
