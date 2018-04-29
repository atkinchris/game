import Entity from './entity'
import { POSITION } from './components'

class World {
  constructor() {
    this.entities = []
  }

  addEntity(entity) {
    if (entity instanceof Entity) {
      this.entities.push(entity)
    } else {
      throw Error('Only instances of Entity can be added')
    }
  }

  addEntities(entities) {
    entities.forEach(this.addEntity.bind(this))
  }

  getEntities() {
    return this.entities
  }

  getEntitiesInRect(rect) {
    return this.entities.filter((entity) => {
      const pos = entity.getComponent(POSITION)

      return (
        pos &&
        pos.x >= rect.left &&
        pos.x <= rect.left + rect.width &&
        pos.y >= rect.top &&
        pos.y <= rect.top + rect.height
      )
    })
  }
}

export default World
