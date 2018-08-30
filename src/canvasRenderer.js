// src/canvasRenderer.js >>>

var graphics = c.getContext('2d');

var animationIndex = 0;
var pixelSize = 2;
var frames = animations[0];

function draw() {

  drawBackground();  
  sceneManager.draw();
}

// ending file
