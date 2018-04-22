import World from './types/world'
import mapToEntities from './utils/mapToEntities'
import map from './map.json'

const TILE_SIZE = 16

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const world = new World()
mapToEntities(map).forEach(entity => world.addEntity(entity))

const render = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.translate(10, 10)

  const zones = world.getZones()
  let entities = []

  for (let zoneIndex = 0; zoneIndex < zones.length; zoneIndex += 1) {
    entities = entities.concat(zones[zoneIndex].getEntities())
  }

  for (let entityIndex = 0; entityIndex < entities.length; entityIndex += 1) {
    const entity = entities[entityIndex]

    context.fillStyle = entity.blocked ? '#333' : '#eee'
    context.fillRect(entity.x * TILE_SIZE, entity.y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  for (let zoneIndex = 0; zoneIndex < zones.length; zoneIndex += 1) {
    const { x, y, width, height } = zones[zoneIndex].getBounds()

    context.strokeStyle = 'blue'
    context.lineWidth = '5'
    context.rect(
      x * TILE_SIZE,
      y * TILE_SIZE,
      width * TILE_SIZE,
      height * TILE_SIZE,
    )
    context.stroke()
  }
}

render()
