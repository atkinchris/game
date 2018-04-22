import randomColour from '../utils/randomColour'

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
}

export default Region
