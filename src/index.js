import World from './types/world'
import mapToEntities from './utils/mapToEntities'
import map from './map.json'

const TILE_SIZE = 16
const TRANSLATE = 10

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
context.translate(TRANSLATE, TRANSLATE)

const world = new World()
mapToEntities(map).forEach(entity => world.addEntity(entity))

const render = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)

  world.rebuildDirtyZones()
  const zones = world.getZones()
  let entities = []

  for (let zoneIndex = 0; zoneIndex < zones.length; zoneIndex += 1) {
    entities = entities.concat(zones[zoneIndex].getEntities())
  }

  for (let entityIndex = 0; entityIndex < entities.length; entityIndex += 1) {
    const entity = entities[entityIndex]

    context.fillStyle = entity.blocked ? '#333' : world.getRegion(entity.region.id).colour
    context.fillRect(entity.x * TILE_SIZE, entity.y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  for (let zoneIndex = 0; zoneIndex < zones.length; zoneIndex += 1) {
    const zone = zones[zoneIndex]
    const { x, y, width, height } = zone.getBounds()
    const edges = zone.getEdges()

    context.beginPath()
    context.strokeStyle = 'blue'
    context.lineWidth = '5'
    context.rect(
      x * TILE_SIZE,
      y * TILE_SIZE,
      width * TILE_SIZE,
      height * TILE_SIZE,
    )
    context.stroke()
    context.closePath()

    context.beginPath()
    context.strokeStyle = 'red'
    context.lineWidth = '2'
    for (let e = 0; e < edges.length; e += 1) {
      const edge = edges[e]
      context.rect(edge.x * TILE_SIZE, edge.y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }
    context.stroke()
  }
}

const toWorldCoordinates = (x, y) => ({
  x: Math.floor((x - TRANSLATE) / TILE_SIZE),
  y: Math.floor((y - TRANSLATE) / TILE_SIZE),
})

canvas.onclick = (event) => {
  const rect = canvas.getBoundingClientRect()
  const { x, y } = toWorldCoordinates(event.clientX - rect.left, event.clientY - rect.top)
  world.onClick(x, y)
  render()
}

render()
