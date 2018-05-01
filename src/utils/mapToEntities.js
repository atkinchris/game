import Entity from '../components/entity'
import { POSITION, RENDERABLE } from '../components/components';

const mapToEntities = (map) => {
  const entities = []

  for (let y = 0; y < map.length; y += 1) {
    const row = map[y]

    for (let x = 0; x < row.length; x += 1) {
      const cell = row[x]
      entities.push(Entity.FromComponents({
        [POSITION]: { x, y },
        [RENDERABLE]: { tileName: cell ? 'wall' : 'grass' },
      }))
    }
  }

  return entities
}

export default mapToEntities
