// src/gameLoop.js >>>

var timeEnd = 0;
function loop(time) {
  var dt = time - timeEnd;
  var refreshRatio = dt/1000;
  timeEnd = time;

  mainScene.update(refreshRatio);
  secondScene.update(refreshRatio);
  draw();
  drawPostProcessing(~~(time));
  requestAnimationFrame(loop);
}

loop(1);
