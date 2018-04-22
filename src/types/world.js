import Zone, { ZONE_SIZE } from './zone'

class World {
  constructor() {
    this.zones = []
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
      console.log(`Zone at {${zX}, ${zY}} did not exist; creating...`)
      zone = this.addZone(zX, zY)
    }

    return zone.addEntity(entity)
  }

  getZones() {
    return this.zones
  }
}

export default World
