const mapToEntities = (map: number[][]): object[] => {
  const entities = []

  for (let y = 0; y < map.length; y += 1) {
    const row = map[y]

    for (let x = 0; x < row.length; x += 1) {
      const cell = row[x]
      entities.push({ x, y, blocked: cell === 1 })
    }
  }

  return entities
}

export default mapToEntities
