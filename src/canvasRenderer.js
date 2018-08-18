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

  graphics.fillStyle = '#ffffff';
  for (var i = 0; i < points.length; i++) {
    var coords = points[i];
    graphics.fillRect(coords[0]*3 + 5, coords[1]*3 + 5, 3, 3);
  }
}

// ending file
