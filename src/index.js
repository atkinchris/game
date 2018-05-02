import tileSet from './assets/tiles'
import TileManager from './utils/tileManager'
import mapToEntities from './utils/mapToEntities'
import World from './components/world'
import map from './map.json'
import { RENDERABLE, POSITION } from './components/components'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

let tileManager
const world = new World()
const viewport = {
  left: 0,
  top: 0,
  width: 25,
  height: 20,
}

const setup = async () => {
  tileManager = new TileManager(tileSet)
  await tileManager.loadTiles()
  canvas.height = viewport.height * tileManager.tileSize
  canvas.width = viewport.width * tileManager.tileSize

  world.addEntities(mapToEntities(map))
}

const render = () => {
  context.setTransform(1, 0, 0, 1, 0, 0)
  const entities = world.getEntitiesInRect(viewport)

  entities.forEach((entity) => {
    if (entity.hasComponent(RENDERABLE)) {
      const { tileName } = entity.getComponent(RENDERABLE)
      const { x, y } = entity.getComponent(POSITION)

      const tile = tileManager.getTile(tileName)
      context.drawImage(tile, x * tileManager.tileSize, y * tileManager.tileSize)
    }
  })

  context.translate(-viewport.left * tileManager.tileSize, -viewport.top * tileManager.tileSize)

  requestAnimationFrame(render)
}

setup()
  .then(() => {
    requestAnimationFrame(render)
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error)
  })
