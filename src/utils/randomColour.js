const randomColour = () => {
  const h = Math.floor(Math.random() * 255)

  return `hsl(${h}, 100%, 50%)`
}

export default randomColour
