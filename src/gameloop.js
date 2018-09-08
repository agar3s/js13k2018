// src/gameLoop.js >>>

var timeEnd = 0;
function loop(time) {
  if(DEBUG){
    _fps_.begin();
    _processing_.begin();
    _memory_.begin();
    _enemies_.begin();
  }
  var dt = time - timeEnd;
  var refreshRatio = dt/1000;
  timeEnd = time;
  resetMatrix();
  updateBackgroud(refreshRatio);
  sceneManager.update(time, refreshRatio);
  
  draw();
//  drawPostProcessing(~~(time));
  requestAnimationFrame(loop);

  if(DEBUG){
    _fps_.end();
    _processing_.end();
    _memory_.end();
    _enemies_.end();
    //enemiesPanel.update(enemies?enemies.length:0, 1000);
  }
}

loop(1);
