import randomColour from '../utils/randomColour'
import Zone, { ZONE_SIZE } from './zone'

class Region {
  constructor(id, world) {
    this.id = id
    this.world = world
    this.entities = []
    this.edges = []
    this.colour = randomColour()
  }

  addEntity(entity) {
    this.entities.push(entity)
  }

  getEntities() {
    return this.entities
  }

  buildEdges() {
    this.edges = this.findEdges()
  }

  getEdges() {
    return this.edges
  }

  findEdges() {
    const edges = []

    for (let i = 0; i < this.entities.length; i += 1) {
      const entity = this.entities[i]

      // eslint-disable-next-line no-continue
      if (entity.blocked) continue

      const testEdge = (x, y) => {
        const cell = this.world.getEntity(x, y)
        if (cell && !cell.blocked) {
          edges.push({ x, y })
        }
      }

      const { x, y } = Zone.toLocalPos(entity)
      if (x === 0) testEdge(entity.x, entity.y)
      if (x === ZONE_SIZE) testEdge(entity.x + 1, entity.y)
      if (y === 0) testEdge(entity.x, entity.y - 1)
      if (y === ZONE_SIZE) testEdge(entity.x, entity.y)
    }

    return edges
  }
}

export default Region
