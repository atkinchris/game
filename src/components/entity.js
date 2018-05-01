import { POSITION } from './components'

class Entity {
  constructor(components = {}) {
    this.components = components
  }

  hasComponent(componentName) {
    return this.components[componentName] !== undefined
  }

  getComponent(componentName) {
    return this.components[componentName]
  }

  updateComponent(componentName, value) {
    this.components[componentName] = value
    return this
  }

  removeComponent(componentName) {
    this.components[componentName] = undefined
    return this
  }

  static WithPosition(position) {
    return new Entity({
      [POSITION]: position,
    })
  }
}

export default Entity
