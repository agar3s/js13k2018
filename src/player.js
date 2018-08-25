// src/player.js >>>


var player = Sprite([10, 120, 0, '#226']);
player.speed = 80;

player.updateData = function(dt){
  if(keyMap&keys[inputs.LEFT]) {
    this.x -= this.speed*dt;
    this.orientation = 0;
  }
  if(keyMap&keys[inputs.RIGHT]) {
    this.x += this.speed*dt;
    this.orientation = 1;
  }
  if(keyMap&keys[inputs.ENTER]) {
    this.orientation ^= 1;
  }
  if(keyMap&keys[inputs.PUNCH]) {
    this.animation = animations[3];
    this.animIndex = 0;
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

