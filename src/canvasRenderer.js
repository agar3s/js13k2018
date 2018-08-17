// src/canvasRenderer.js >>>

var graphics = c.getContext('2d');

function draw() {
  graphics.clearRect(0, 0, 320, 240);
  player.draw(graphics);
}

// ending file
