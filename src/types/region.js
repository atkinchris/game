import randomColour from '../utils/randomColour'
import Zone, { ZONE_SIZE } from './zone'

class Region {
  constructor(id, world) {
    this.id = id
    this.world = world
    this.entities = []
    this.edges = []
    this.edgeHashes = []
    this.neighbours = []
    this.colour = randomColour()
  }

  addEntity(entity) {
    this.entities.push(entity)
  }

  getEntities() {
    return this.entities
  }

  destroy() {
    this.unregisterEdges()
  }

  getNeighbouringEntities() {
    let entities = [...this.entities]

    console.log(this.neighbours)

    for (let i = 0; i < this.neighbours.length; i += 1) {
      const neighbour = this.world.getRegion(this.neighbours[i])
      entities = entities.concat(neighbour.getEntities())
    }

    return entities
  }

  buildNeighbours() {
    this.buildEdges()
    this.neighbours = []

    for (let i = 0; i < this.edgeHashes.length; i += 1) {
      const neighbour = this.world.getNeighbour(this.edgeHashes[i], this.id)

      if (neighbour && neighbour.length > 0 && this.neighbours.indexOf(neighbour) === -1) {
        this.neighbours.push(neighbour)
      }
    }
  }

  buildEdges() {
    this.unregisterEdges()

    this.edges = this.findEdges()
    this.edgeHashes = this.edges.map(e => Region.hashEdge(e))

    this.registerEdges()
  }

  unregisterEdges() {
    for (let i = 0; i < this.edgeHashes.length; i += 1) {
      this.world.unregisterEdge(this.edgeHashes[i], this.id)
    }
  }

  registerEdges() {
    for (let i = 0; i < this.edgeHashes.length; i += 1) {
      this.world.registerEdge(this.edgeHashes[i], this.id)
    }
  }

  getEdges() {
    return this.edges
  }

  findEdges() {
    const edges = []
    const testEdge = (x, y) => {
      const cell = this.world.getEntity(x, y)
      if (cell && !cell.blocked) {
        edges.push({ x, y })
      }
    }

    for (let i = 0; i < this.entities.length; i += 1) {
      const entity = this.entities[i]

      const { x, y } = Zone.toLocalPos(entity)
      if (entity.blocked || (x === ZONE_SIZE - 1 && y === ZONE_SIZE - 1)) {
        // eslint-disable-next-line no-continue
        continue
      }

      if (x === 0) testEdge(entity.x, entity.y)
      if (x === ZONE_SIZE - 1) testEdge(entity.x + 1, entity.y)
      if (y === 0) testEdge(entity.x, entity.y - 1)
      if (y === ZONE_SIZE - 1) testEdge(entity.x, entity.y)
    }

    return edges
  }

  static hashEdge({ x, y }) {
    return `${String(x).padStart(8, 0)}${String(y).padStart(8, 0)}`
  }
}

export default Region
