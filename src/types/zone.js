import Region from './region'

export const ZONE_SIZE = 14

class Zone {
  constructor(worldX, worldY) {
    this.id = `${String(worldX).padStart(4, 0)}${String(worldY).padStart(4, 0)}`
    this.worldX = worldX
    this.worldY = worldY
    this.cells = {}
    this.regions = {}

    for (let y = 0; y < ZONE_SIZE; y += 1) {
      for (let x = 0; x < ZONE_SIZE; x += 1) {
        this.addEntity({
          blocked: false,
          x: (this.worldX * ZONE_SIZE) + x,
          y: (this.worldY * ZONE_SIZE) + y,
        })
      }
    }

    this.rebuild()
  }

  getBounds() {
    return {
      x: this.worldX * ZONE_SIZE,
      y: this.worldY * ZONE_SIZE,
      height: ZONE_SIZE,
      width: ZONE_SIZE,
    }
  }

  addEntity(entity) {
    const hash = Zone.toLocalHash(entity)
    this.cells[hash] = entity
    return entity
  }

  getEntities() {
    return Object.values(this.cells)
  }

  getEntity(x, y) {
    return this.cells[Zone.toLocalHash({ x, y })]
  }

  getRegion(regionId) {
    return this.regions[regionId]
  }

  getRegions() {
    return Object.values(this.regions)
  }

  flood(x, y, region) {
    const node = this.getEntity(x, y)
    if (!node || node.blocked || node.region) return

    this.regions[region.id].addEntity(node)
    node.region = region

    this.flood(x - 1, y, region)
    this.flood(x + 1, y, region)
    this.flood(x, y + 1, region)
    this.flood(x, y - 1, region)
  }

  resetRegions() {
    this.regions = {}
    this.lastRegionId = 0
    const entities = this.getEntities()

    for (let index = 0; index < entities.length; index += 1) {
      entities[index].region = null
    }
  }

  rebuild() {
    const getNextFree = () => this.getEntities().find(p => !p.region && !p.blocked)

    this.resetRegions()
    let next = getNextFree()

    while (next) {
      this.lastRegionId += 1
      const region = new Region(`${this.id}::${this.lastRegionId}`)
      this.regions[region.id] = region
      this.flood(next.x, next.y, region)
      next = getNextFree()
    }
  }

  static toLocalHash({ x, y }) {
    const localX = x % ZONE_SIZE
    const localY = y % ZONE_SIZE

    return (localY * ZONE_SIZE) + localX
  }
}

export default Zone
