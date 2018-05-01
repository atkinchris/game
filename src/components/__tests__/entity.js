import Entity from '../entity'
import { POSITION, RENDERABLE } from '../components'

const COMPONENT = 'test-component'

describe('Entity', () => {
  it('creates a new Entity', () => {
    const entity = new Entity()

    expect(entity).not.toBe(undefined)
    expect(entity).toBeInstanceOf(Entity)
  })

  it('gets the value of a component', () => {
    const entity = new Entity()

    entity.updateComponent(COMPONENT, { something: true })

    const value = entity.getComponent(COMPONENT)
    expect(value).toEqual({ something: true })
  })

  it('adds a component if it does not exist', () => {
    const entity = new Entity()

    entity.updateComponent(COMPONENT, { something: true })

    const value = entity.getComponent(COMPONENT)
    expect(value).toEqual({ something: true })
  })

  it('returns the entity after adding a component to allow chaining', () => {
    const entity = new Entity()

    entity
      .updateComponent(COMPONENT, { a: 'foo' })
      .updateComponent('component2', { b: 'bar' })

    expect(entity.getComponent(COMPONENT)).toEqual({ a: 'foo' })
    expect(entity.getComponent('component2')).toEqual({ b: 'bar' })
  })

  it('updates a component if it exists', () => {
    const entity = new Entity()

    entity.updateComponent(COMPONENT, { something: true })
    entity.updateComponent(COMPONENT, { somethingElse: true })

    const value = entity.getComponent(COMPONENT)
    expect(value).toEqual({ somethingElse: true })
  })

  it('returns "true" if a component exists', () => {
    const entity = new Entity()

    entity.updateComponent(COMPONENT, { something: true })

    const exists = entity.hasComponent(COMPONENT)
    expect(exists).toBe(true)
  })

  it('returns "false" if a component does not exist', () => {
    const entity = new Entity()
    const otherComponent = 'OTHER_COMPONENT'

    entity.updateComponent(COMPONENT, { something: true })

    const exists = entity.hasComponent(otherComponent)
    expect(exists).toBe(false)
  })

  it('does not return a false negative if the component value is false', () => {
    const entity = new Entity()

    entity.updateComponent(COMPONENT, false)

    const exists = entity.hasComponent(COMPONENT)
    expect(exists).toBe(true)
  })

  it('does not return a false negative if the component value is falsy', () => {
    const entity = new Entity()

    entity.updateComponent(COMPONENT, 0)

    const exists = entity.hasComponent(COMPONENT)
    expect(exists).toBe(true)
  })

  it('initialises the components passed to the constructor', () => {
    const entity = new Entity({ [COMPONENT]: { value: 1 } })

    const component = entity.getComponent(COMPONENT)

    expect(component).toEqual({ value: 1 })
  })

  describe('static helpers', () => {
    it('creates a new Entity with a position', () => {
      const entity = Entity.WithPosition({ x: 10, y: 3 })
      const position = entity.getComponent(POSITION)

      expect(position).toEqual({ x: 10, y: 3 })
    })

    it('creates an entity from components', () => {
      const entity = Entity.FromComponents({
        [POSITION]: { x: 10, y: 3 },
        [RENDERABLE]: { foo: 'bar' },
      })

      const position = entity.getComponent(POSITION)
      const renderable = entity.getComponent(RENDERABLE)

      expect(position).toEqual({ x: 10, y: 3 })
      expect(renderable).toEqual({ foo: 'bar' })
    })

    it('allows the static methods to be chained to instance methods', () => {
      const entity = Entity
        .WithPosition({ x: 10, y: 3 })
        .updateComponent(RENDERABLE, { foo: 'bar' })

      const position = entity.getComponent(POSITION)
      const renderable = entity.getComponent(RENDERABLE)

      expect(position).toEqual({ x: 10, y: 3 })
      expect(renderable).toEqual({ foo: 'bar' })
    })
  })
})
