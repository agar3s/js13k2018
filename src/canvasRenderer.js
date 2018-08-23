// src/canvasRenderer.js >>>

var graphics = c.getContext('2d');

var animationIndex = 0;
var pixelSize = 2;
var frames = animations[0];

function draw() {
  graphics.save();
  graphics.clearRect(0, 0, 320, 240);
  graphics.fillStyle = '#000';
  graphics.fillRect(0, 0, 320, 240);
  graphics.restore();
  
  mainScene.draw();
  secondScene.draw();
}

// ending file
