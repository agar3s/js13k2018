
// first two sprites collides when overlaps

var itemsColliders = {};
var matrixDrawing = {};
function addCollider(item) {
  itemsColliders.push(item);
}

function addPixelToCollisionMatrix(x, y, hitCollide, id) {
  var key = x+'-'+y;
  if(!matrixDrawing[key]) matrixDrawing[key] = [hitCollide];
  matrixDrawing[key][0] = matrixDrawing[key][0] || hitCollide;
  matrixDrawing[key].push([id, hitCollide]);

  if (matrixDrawing[key].length>1 && matrixDrawing[key][0]==1) {
    for (var i = 1; i < matrixDrawing[key].length; i++) {
      var data = matrixDrawing[key][i];
      var sprite = itemsColliders[data[0]];
      if(data[1]!=1) {
        sprite.getDamageOn(y);
        flash('#100');
        //sprite.colliding = true;
      }
    }
  }
}

function resetMatrix() {
  matrixDrawing = {};
}
