import randomColour from '../utils/randomColour'
import Zone, { ZONE_SIZE } from './zone'

class Region {
  constructor(id) {
    this.id = id
    this.entities = []
    this.colour = randomColour()
  }

  addEntity(entity) {
    this.entities.push(entity)
  }

  getEntities() {
    return this.entities
  }

  findEdges() {
    const edges = []

    for (let i = 0; i < this.entities.length; i += 1) {
      const entity = this.entities[i]
      const { x, y } = Zone.toLocalPos(entity)

      // eslint-disable-next-line no-continue
      if (entity.blocked) continue

      if (x === 0 || x === (ZONE_SIZE - 1)) {
        edges.push({ x, y })
      }

      if (y === 0 || y === (ZONE_SIZE - 1)) {
        edges.push({ x, y })
      }
    }

    return edges
  }
}

export default Region
