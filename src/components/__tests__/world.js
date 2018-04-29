import World from '../world'
import Entity from '../entity'
import { POSITION } from '../components';

describe('World', () => {
  it('creates a new World', () => {
    const world = new World()

    expect(world).toBeInstanceOf(World)
  })

  it('gets an array of entities', () => {
    const world = new World()

    expect(world.getEntities()).toEqual([])
  })

  it('adds an entity to the world', () => {
    const world = new World()
    const entity = new Entity()

    world.addEntity(entity)

    expect(world.getEntities()).toEqual([
      entity,
    ])
  })

  it('adds multiple entities', () => {
    const world = new World()
    const entityA = new Entity()
    const entityB = new Entity()

    world.addEntities([
      entityA,
      entityB,
    ])

    expect(world.getEntities()).toEqual([
      entityA,
      entityB,
    ])
  })

  it('throws an error if a non-Entity is added', () => {
    const world = new World()
    const entity = {}

    expect(() => {
      world.addEntity(entity)
    }).toThrow('Only instances of Entity can be added')
    expect(world.getEntities()).toEqual([])
  })

  it('gets entities within a rectangle', () => {
    const world = new World()

    const entityA = Entity.WithPosition({ x: 10, y: 4 })
    const entityB = Entity.WithPosition({ x: 20, y: 4 })
    const entityC = Entity.WithPosition({ x: 15, y: 4 })
    const entityD = Entity.WithPosition({ x: 15, y: 22 })
    const rect = {
      left: 12,
      top: 2,
      width: 8,
      height: 10,
    }

    world.addEntities([
      entityA,
      entityB,
      entityC,
      entityD,
    ])

    const entities = world.getEntitiesInRect(rect)

    expect(entities).toEqual([
      entityB,
      entityC,
    ])
  })
})
