import tile from './assets/tile.png'

import loadImage from './utils/loadImage'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

Promise.all([
  loadImage(tile),
]).then((images) => {
  context.drawImage(images[0], 0, 0)
})
