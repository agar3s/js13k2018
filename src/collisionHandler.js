
// first two sprites collides when overlaps

var itemsColliders = {};
var matrixDrawing = {};

function addHitPixelToCollisionMatrix(x, y, id, target) {
  var key = x+'-'+y;
  if(!matrixDrawing[key]) matrixDrawing[key] = [];
  matrixDrawing[key][0] = [id, target];
}

function addPixelToCollisionMatrix(x, y, id, type) {
  var key = x+'-'+y;
  if(!matrixDrawing[key]) return;
  matrixDrawing[key].push([id, type]);

  var spriteHitId = matrixDrawing[key][0];
  for (var i = 1; i < matrixDrawing[key].length; i++) {
    var data = matrixDrawing[key][i];
    // if the same sprite is on the hit area continue
    if((spriteHitId[1]&data[1]) == 0) continue;

    var sprite = itemsColliders[data[0]];
    sprite.getDamageOn(y);

    flash('#600');
    //sprite.colliding = true;
    // example
    var explosion = Sprite([x-8, y-8, 11, '#fff']);
    explosion.pixelSize = 1;
    explosion.orientation = 0;
    explosion.animationEnds = function(){
      mainScene.remove(this);
    }
    mainScene.add(explosion);
    // ends example
  }

}

function resetMatrix() {
  matrixDrawing = {};
}
