// src/canvasRenderer.js >>>

var graphics = c.getContext('2d');

function draw() {
  graphics.clearRect(0, 0, 320, 240);
  graphics.fillStyle = '#000';
  graphics.fillRect(0, 0, 320, 240);
  player.draw(graphics);
  playerB.draw(graphics);
  playerC.draw(graphics);
  playerD.draw(graphics);
}

// ending file
