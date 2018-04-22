export const ZONE_SIZE = 14

class Zone {
  constructor(worldX, worldY) {
    this.worldX = worldX
    this.worldY = worldY
    this.cells = {}

    for (let y = 0; y < ZONE_SIZE; y += 1) {
      for (let x = 0; x < ZONE_SIZE; x += 1) {
        this.addEntity({
          blocked: false,
          x: (this.worldX * ZONE_SIZE) + x,
          y: (this.worldY * ZONE_SIZE) + y,
        })
      }
    }
  }

  getBounds() {
    return {
      x: this.worldX * ZONE_SIZE,
      y: this.worldY * ZONE_SIZE,
      height: ZONE_SIZE,
      width: ZONE_SIZE,
    }
  }

  addEntity(entity) {
    const hash = Zone.toLocalHash(entity)
    this.cells[hash] = entity
    return entity
  }

  getEntities() {
    return Object.values(this.cells)
  }

  static toLocalHash({ x, y }) {
    const localX = x % ZONE_SIZE
    const localY = y % ZONE_SIZE

    return (localY * ZONE_SIZE) + localX
  }
}

export default Zone
