// src/gameLoop.js >>>

var timeEnd = 0
function loop(time) {
  var dt = time - timeEnd;
  timeEnd = time;
  player.setX(dt);
  requestAnimationFrame(loop);
}

loop(1);
