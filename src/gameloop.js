// src/gameLoop.js >>>

var timeEnd = 0;
var lock = false;
function loop(time) {
  var dt = time - timeEnd;
  var refreshRatio = dt/1000;
  timeEnd = time;
  otherNinja.update(refreshRatio);
  otherNinja2.update(refreshRatio);
  otherNinja3.update(refreshRatio);
  otherNinja4.update(refreshRatio);
  otherNinja5.update(refreshRatio);

  if(keyMap&keys[inputs.LEFT]) {
    otherNinja.x -= 45*refreshRatio;
  }
  if(keyMap&keys[inputs.RIGHT]) {
    otherNinja.x += 45*refreshRatio;
  }
  if(keyMap&keys[inputs.PUNCH]) {
    if(!lock){
      play(punchSounds[~~(getRandomValue(punchSounds.length))]);
      lock = true;
    }
  } else {
    lock = false;
  }

  draw();
  drawPostProcessing(~~(time));
  requestAnimationFrame(loop);
}

loop(1);
