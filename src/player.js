// src/player.js >>>

function Sprite() {
  return {
    x: 0,
    y: 120,
    speed: 200,
    direction: 1,
    color: '#ff0000',
    moveX: function(dt) {
      this.x = this.x + this.direction*this.speed*dt;
      if(this.x>320) this.direction = -1
      if(this.x<0) this.direction = 1
    },
    draw: function(graphics) {
      graphics.fillStyle = this.color;
      graphics.fillRect(this.x, this.y, 15, 15);
    }
  }
}

var player = Sprite();

