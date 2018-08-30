// src/gameLoop.js >>>

var timeEnd = 0;
function loop(time) {
  var dt = time - timeEnd;
  var refreshRatio = dt/1000;
  timeEnd = time;
  resetMatrix();
  updateBackgroud(refreshRatio);
  sceneManager.update(refreshRatio);
  
  draw();
  drawPostProcessing(~~(time));
  requestAnimationFrame(loop);
}

loop(1);
