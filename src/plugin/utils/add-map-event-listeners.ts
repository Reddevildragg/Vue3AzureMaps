import atlas from 'azure-maps-control'

export interface MapEventListenersConfig {
  map: atlas.Map
  listeners: any
  target?: any
  reservedEventTypes?: string[]
}

function addMapEventListeners({
  map,
  listeners,
  target,
  reservedEventTypes = [],
}: MapEventListenersConfig): () => void {
  const mapListeners: (() => void)[] = []
  const listenersEntries = Object.entries(listeners)

  // eslint-disable-next-line prefer-const
  for (let [eventType, callback] of listenersEntries) {
    eventType = eventType.toLowerCase()
    if (eventType.startsWith('on')) {
      eventType = eventType.substring(2)
    }

    // Omit component's emitted events.
    // `.sync` modifier pattern for 'two-way binding': `update:`.
    if (
      reservedEventTypes.includes(eventType) ||
      eventType.startsWith('update:')
    ) {
      continue
    }

    //test onUpdate:view test undefined test ($event) => $setup.mapOptions.view = $event
    try {
      if (target) {
        map.events.add(eventType as any, target, callback as any)
        mapListeners.push(() =>
          map.events.remove(eventType as any, target, callback as any)
        )
      } else {
        map.events.add(eventType as any, callback as any)
        mapListeners.push(() =>
          map.events.remove(eventType as any, callback as any)
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  return () => mapListeners.forEach((removeListener) => removeListener())
}

export default addMapEventListeners
