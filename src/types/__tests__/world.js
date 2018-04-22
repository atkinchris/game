import World from '../world'

describe('World', () => {
  let world

  beforeEach(() => {
    world = new World()
  })

  it('registers an edge to a region', () => {
    world.registerEdge('00010001', '0000::1')

    expect(world.getEdges()).toEqual({
      '00010001': ['0000::1'],
    })
  })

  it('registers a second region to an edge', () => {
    world.registerEdge('00010001', '0000::1')
    world.registerEdge('00010001', '0001::1')

    expect(world.getEdges()).toEqual({
      '00010001': ['0000::1', '0001::1'],
    })
  })

  it('does not register the same region again on an edge', () => {
    world.registerEdge('00010001', '0000::1')
    world.registerEdge('00010001', '0001::1')
    world.registerEdge('00010001', '0000::1')

    expect(world.getEdges()).toEqual({
      '00010001': ['0000::1', '0001::1'],
    })
  })

  it('unregisters an edge from a region', () => {
    world.registerEdge('00010001', '0000::1')
    world.registerEdge('00010001', '0001::1')
    world.unregisterEdge('00010001', '0000::1')

    expect(world.getEdges()).toEqual({
      '00010001': ['0001::1'],
    })
  })
})
