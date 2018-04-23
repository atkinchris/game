import Region from './region'
import World from './world'

export const ZONE_SIZE = 14

class Zone {
  id: string
  worldX: number
  worldY: number
  world: World
  cells: any[]
  regions: any
  lastRegionId: number

  constructor(worldX: number, worldY: number, world: World) {
    this.id = `${worldX.toString().padStart(4, '0')}${worldY.toString().padStart(4, '0')}`
    this.worldX = worldX
    this.worldY = worldY
    this.world = world
    this.cells = []
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
    const localPosition = Zone.toLocalPos(entity)
    const hash = Zone.toIndex(localPosition)
    this.cells[hash] = entity
    return entity
  }

  getEntities() {
    return this.cells
  }

  getEntity(x: number, y: number) {
    const localPosition = Zone.toLocalPos({ x, y })
    return this.cells[Zone.toIndex(localPosition)]
  }

  getRegion(regionId: string) {
    return this.regions[regionId]
  }

  getRegions() {
    return Object.values(this.regions)
  }

  getEdges() {
    let edges = []
    const regions = this.getRegions()

    for (let i = 0; i < regions.length; i += 1) {
      const region = regions[i]
      edges = edges.concat(region.getEdges())
    }

    return edges
  }

  flood(x, y, region) {
    if (x < 0 || x >= ZONE_SIZE || y < 0 || y >= ZONE_SIZE) {
      return
    }

    const node = this.getEntity(x, y)
    if (!node || node.blocked || node.region) return

    region.addEntity(node)
    node.region = region

    this.flood(x - 1, y, region)
    this.flood(x + 1, y, region)
    this.flood(x, y + 1, region)
    this.flood(x, y - 1, region)
  }

  resetRegions() {
    const regions: Region[] = Object.values(this.regions)

    for (let i = 0; i < regions.length; i += 1) {
      regions[i].destroy()
    }

    this.regions = {}
    this.lastRegionId = 0

    for (let i = 0; i < this.cells.length; i += 1) {
      this.cells[i].region = null
    }
  }

  rebuild() {
    const getNextFree = () => this.getEntities().findIndex(p => !p.region && !p.blocked)

    this.resetRegions()
    let next = getNextFree()

    while (next !== -1) {
      this.lastRegionId += 1
      const region = new Region(`${this.id}::${this.lastRegionId}`, this.world)
      this.regions[region.id] = region

      const position = Zone.toPosition(next)
      this.flood(position.x, position.y, region)
      region.buildNeighbours()
      next = getNextFree()
    }
  }

  static toLocalPos({ x, y }) {
    return {
      x: x % ZONE_SIZE,
      y: y % ZONE_SIZE,
    }
  }

  static toPosition(index) {
    return {
      x: index % ZONE_SIZE,
      y: Math.floor(index / ZONE_SIZE),
    }
  }

  static toIndex({ x, y }) {
    return (y * ZONE_SIZE) + x
  }
}

export default Zone
