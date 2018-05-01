import tileSet from './assets/tiles'
import TileManager from './utils/tileManager'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const setup = async () => {
  const tileManager = new TileManager(tileSet)
  await tileManager.loadTiles()

  const tile = tileManager.getTile('grass')
  context.drawImage(tile, 0, 0)
}

// eslint-disable-next-line no-console
setup().then(console.log).catch(console.error)
