import Zone, { ZONE_SIZE } from '../zone'
import Region from '../region'

jest.mock('../region')

describe('Zone', () => {
  beforeEach(() => {
    Region.mockImplementation((id) => {
      const entities = []

      return {
        id,
        addEntity: e => entities.push(e),
        getEntities: () => entities,
        buildNeighbours: jest.fn(),
        destroy: jest.fn(),
      }
    })
  })

  it('builds regions of contiguous open positions', () => {
    const zone = new Zone(0, 0)
    const regions = zone.getRegions()

    expect(regions.length).toBe(1)
    expect(regions[0]).toMatchObject({
      id: '00000000::1',
    })
  })

  it('creates a single region for a contiguous area', () => {
    const zone = new Zone(0, 0)

    for (let x = 0; x < 12; x += 1) {
      zone.addEntity({ x, y: 6, blocked: true })
    }
    zone.rebuild()

    const regions = zone.getRegions()

    expect(regions.length).toBe(1)
    expect(regions[0]).toMatchObject({
      id: '00000000::1',
    })
  })

  it('creates a two regions for a bisected area', () => {
    const zone = new Zone(0, 0)

    for (let x = 0; x < ZONE_SIZE; x += 1) {
      zone.addEntity({ x, y: 6, blocked: true })
    }
    zone.rebuild()

    const regions = zone.getRegions()

    expect(regions.length).toBe(2)
    expect(regions[0]).toMatchObject({
      id: '00000000::1',
    })
    expect(regions[0].getEntities().length).toBe(84)
    expect(regions[1]).toMatchObject({
      id: '00000000::2',
    })
    expect(regions[1].getEntities().length).toBe(98)
  })

  it('creates two regions for a concave area touching the zone boundary', () => {
    const zone = new Zone(0, 0)

    zone.addEntity({ x: 4, y: 0, blocked: true })
    zone.addEntity({ x: 4, y: 1, blocked: true })
    zone.addEntity({ x: 4, y: 2, blocked: true })
    zone.addEntity({ x: 4, y: 3, blocked: true })
    zone.addEntity({ x: 4, y: 4, blocked: true })
    zone.addEntity({ x: 3, y: 4, blocked: true })
    zone.addEntity({ x: 2, y: 4, blocked: true })
    zone.addEntity({ x: 1, y: 4, blocked: true })
    zone.addEntity({ x: 0, y: 4, blocked: true })
    zone.rebuild()

    const regions = zone.getRegions()

    expect(regions.length).toBe(2)
    expect(regions[0].getEntities().length).toBe(16)
    expect(regions[1].getEntities().length).toBe(171)
  })

  it('rebuilds regions when blocked areas change', () => {
    const zone = new Zone(0, 0)
    expect(zone.getRegions().length).toBe(1)

    for (let x = 0; x < ZONE_SIZE; x += 1) {
      zone.addEntity({ x, y: 6, blocked: true })
    }
    zone.rebuild()

    const regions = zone.getRegions()

    expect(regions.length).toBe(2)
    expect(regions[0]).toMatchObject({
      id: '00000000::1',
    })
    expect(regions[0].getEntities().length).toBe(84)
    expect(regions[1]).toMatchObject({
      id: '00000000::2',
    })
    expect(regions[1].getEntities().length).toBe(98)
  })
})
