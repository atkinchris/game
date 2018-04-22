import Zone, { ZONE_SIZE } from './zone'

class World {
  constructor() {
    this.zones = []
    this.dirtyZones = []
    this.edges = {}
  }

  addZone(x, y) {
    const zone = new Zone(x, y, this)
    this.zones.push(zone)
    return zone
  }

  addEntity(entity) {
    let zone = this.getZone(entity.x, entity.y)

    if (!zone) {
      const zX = Math.floor(entity.x / ZONE_SIZE)
      const zY = Math.floor(entity.y / ZONE_SIZE)
      zone = this.addZone(zX, zY)
    }

    this.dirtyZones.push(zone)

    return zone.addEntity(entity)
  }

  getEntity(x, y) {
    const zone = this.getZone(x, y)
    return zone ? zone.getEntity(x, y) : null
  }

  getRegion(regionHash) {
    const [zoneId] = regionHash.split('::')
    const zone = this.zones.find(z => z.id === zoneId)

    return zone.getRegion(regionHash)
  }

  rebuildDirtyZones() {
    for (let i = 0; i < this.dirtyZones.length; i += 1) {
      this.dirtyZones[i].rebuild()
    }

    this.dirtyZones = []
  }

  getZone(x, y) {
    const zX = Math.floor(x / ZONE_SIZE)
    const zY = Math.floor(y / ZONE_SIZE)
    return this.zones.find(z => z.worldX === zX && z.worldY === zY)
  }

  getZones() {
    return this.zones
  }

  getEdges() {
    return this.edges
  }

  registerEdge(hash, regionId) {
    const edge = this.edges[hash] || []

    if (edge.indexOf(regionId) === -1) {
      edge.push(regionId)
    }

    this.edges[hash] = edge
  }

  unregisterEdge(hash, regionId) {
    this.edges[hash] = (this.edges[hash] || []).filter(e => e && e !== regionId)
  }

  getNeighbour(hash, regionId) {
    return (this.edges[hash] || []).filter(e => e !== regionId)[0]
  }

  onClick(x, y) {
    const { region } = this.getEntity(x, y) || {}
    // const { blocked } = this.getEntity(x, y) || {}
    // this.addEntity({ x, y, blocked: !blocked })

    this.selectedRegion = region
  }
}

export default World
