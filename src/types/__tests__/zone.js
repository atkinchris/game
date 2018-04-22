import randomColour from '../../utils/randomColour'
import Zone, { ZONE_SIZE } from '../zone'

jest.mock('../../utils/randomColour')

describe('Zone', () => {
  const mockColour = 'rgb(0, 0, 0)'
  beforeEach(() => {
    randomColour.mockImplementation(() => mockColour)
  })

  it('builds regions of contiguous open positions', () => {
    const zone = new Zone(0, 0)
    const regions = zone.getRegions()

    expect(regions.length).toBe(1)
    expect(regions[0]).toMatchObject({
      colour: mockColour,
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
      colour: mockColour,
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
      colour: mockColour,
    })
    expect(regions[0].getEntities().length).toBe(84)
    expect(regions[1]).toMatchObject({
      id: '00000000::2',
      colour: mockColour,
    })
    expect(regions[1].getEntities().length).toBe(98)
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
      colour: mockColour,
    })
    expect(regions[0].getEntities().length).toBe(84)
    expect(regions[1]).toMatchObject({
      id: '00000000::2',
      colour: mockColour,
    })
    expect(regions[1].getEntities().length).toBe(98)
  })
})
