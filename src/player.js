// src/player.js >>>

function Sprite() {
  var x = 0;
  return {
    x: x,
    setX: function(newX) {
      this.x = newX;
    }
  }
}

var player = Sprite();
