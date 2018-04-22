import Region from '../region'
import mapToEntities from '../../utils/mapToEntities'

describe('Region', () => {
  it('finds an array of edges', () => {
    const region = new Region('00000000::1')

    const entities = mapToEntities([
      [0, 0, 1, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ])

    entities.forEach(e => region.addEntity(e))

    expect(region.findEdges()).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ])
  })
})
