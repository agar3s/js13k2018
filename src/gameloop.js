// src/gameLoop.js >>>

var timeEnd = 0
function loop(time) {
  var dt = time - timeEnd;
  var refreshRatio = dt/1000;
  timeEnd = time;
  otherNinja.update(refreshRatio);
  otherNinja2.update(refreshRatio);
  otherNinja3.update(refreshRatio);
  otherNinja4.update(refreshRatio);
  otherNinja5.update(refreshRatio);
  draw();
  drawPostProcessing(~~(time));
  requestAnimationFrame(loop);
}

loop(1);
