// src/player.js >>>

function Sprite() {
  return {
    x: 220,
    y: 120,
    speed: 100,
    direction: 1,
    color: '#ff0000',
    moveX: function(dt) {
      this.x = this.x + this.direction*this.speed*dt;
      if(this.x>320) this.direction = -1
      if(this.x<0) this.direction = 1
    },
    draw: function(graphics) {
      graphics.fillStyle = this.color;
      graphics.fillRect(this.x, this.y, 30, 30);
    }
  }
}

var player = Sprite();
var playerB = Sprite();
playerB.color = '#00ff00';
playerB.y -= 50;
playerB.speed *= 1.2;
var playerC = Sprite();
playerC.color = '#0000ff';
playerC.y += 50;
playerC.speed *= 1.4;
var playerD = Sprite();
playerD.color = '#ffffff';
playerD.y = 10;
playerD.speed *= 1.6;

