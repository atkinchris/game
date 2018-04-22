import Zone, { ZONE_SIZE } from './zone'

class World {
  constructor() {
    this.zones = []
    this.dirtyZones = []
  }

  addZone(x, y) {
    const zone = new Zone(x, y)
    this.zones.push(zone)
    return zone
  }

  addEntity(entity) {
    const zX = Math.floor(entity.x / ZONE_SIZE)
    const zY = Math.floor(entity.y / ZONE_SIZE)
    let zone = this.zones.find(z => z.worldX === zX && z.worldY === zY)

    if (!zone) {
      zone = this.addZone(zX, zY)
    }

    this.dirtyZones.push(zone)

    return zone.addEntity(entity)
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

  getZones() {
    return this.zones
  }
}

export default World
