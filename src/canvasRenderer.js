// src/canvasRenderer.js >>>

var graphics = c.getContext('2d');

var animationIndex = 0;
var animationLength = 7;

function draw() {
  graphics.clearRect(0, 0, 320, 240);
  graphics.fillStyle = '#000';
  graphics.fillRect(0, 0, 320, 240);
  player.draw(graphics);
  playerB.draw(graphics);
  playerC.draw(graphics);
  playerD.draw(graphics);

  graphics.fillStyle = '#ffffff';
  if(frames.length>0){
    var animIndex = ~~animationIndex;
    for (var i = 0; i < frames[animIndex].length; i++) {
      var coords = frames[animIndex][i];
      graphics.fillRect(coords[0]*3 + 5+animIndex*0, coords[1]*3 + 5, 3, 3);
    }

    animationIndex+=0.2;
    if(animationIndex>=animationLength)animationIndex=0;
  }
}

// ending file
