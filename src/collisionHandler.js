
// first two sprites collides when overlaps

var itemsColliders = {};
var matrixDrawing = {};

function addHitPixelToCollisionMatrix(x, y, id) {
  var key = x+'-'+y;
  if(!matrixDrawing[key]) matrixDrawing[key] = [];
  matrixDrawing[key].push(id);
}

function addPixelToCollisionMatrix(x, y, id) {
  var key = x+'-'+y;
  if(!matrixDrawing[key]) return;
  matrixDrawing[key].push(id);

  var spriteHitId = matrixDrawing[key][0];
  for (var i = 1; i < matrixDrawing[key].length; i++) {
    var data = matrixDrawing[key][i];
    // if the same sprite is on the hit area continue
    if(spriteHitId == data) continue;

    var sprite = itemsColliders[data];
    sprite.getDamageOn(y);

    flash('#600');
    //sprite.colliding = true;
    // example
    var explosion = Sprite([x-8, y-8, 10, '#fff']);
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
