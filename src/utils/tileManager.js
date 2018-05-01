import loadImage from './loadImage'

class TileManager {
  constructor(tileSet, tileSize = 32) {
    this.tiles = {}
    this.tileSet = tileSet
    this.tileSize = tileSize
  }

  getTile(id) {
    const tile = this.tiles[id]

    if (!tile) {
      throw Error(`Tile "${id}" not found`)
    }

    return this.tiles[id]
  }

  async loadTiles() {
    const keys = Object.keys(this.tileSet)

    const promises = keys.reduce((out, tileKey) => {
      out.push(loadImage(this.tileSet[tileKey]))
      return out
    }, [])

    const loadedTiles = await Promise.all(promises)

    loadedTiles.forEach((tile, index) => {
      const key = keys[index]
      this.tiles[key] = tile
    })
  }
}

export default TileManager
