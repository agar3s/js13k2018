// src/player.js >>>

function Sprite() {
  var x = 0;
  return {
    x: x,
    setX: function(newX) {
      this.x = newX;
      console.log('player.x ahora es ', this.x);
    }
  }
}

var player = new Sprite();
