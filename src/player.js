// src/player.js >>>


var player = Sprite([10, 120, 0, '#226']);
player.speed = 120;
player.nextPunch = 0;
var punchs = [2,3,4];

player.updateData = function(dt){
  if(keyMap&keys[inputs.LEFT]) {
    this.dx -= this.speed*dt;
    this.x = ~~(this.dx/this.pixelSize)*this.pixelSize;
    this.orientation = 0;
  }
  if(keyMap&keys[inputs.RIGHT]) {
    this.dx += this.speed*dt;
    this.x = ~~(this.dx/this.pixelSize)*this.pixelSize;
    this.orientation = 1;
  }
  if(keyMap&keys[inputs.ENTER]) {
    this.orientation ^= 1;
  }
  if(keyMap&keys[inputs.PUNCH]) {
    this.punch();
  }
  if(keyMap&keys[inputs.KICK]) {
    this.animation = animations[1];
    this.animIndex = 0;
  }
  if(keyMap&keys[inputs.JUMP]) {
    this.animation = animations[0];
    this.animIndex = 0;
  }
};

player.punch = function() {
  if(this.status === 'punching') return;
  this.status = 'punching';
  this.animation = animations[punchs[this.nextPunch]];
  this.nextPunch++;
  console.log(punchs.length)
  if(this.nextPunch==punchs.length) this.nextPunch = 0

  this.animIndex = 0;
}
