// src/gameObject.js >>

function GameObject(props) {
  return {
    x: props[0],
    y: props[1],
    update: function(dt) {},
    draw: function() {}
  }
}

function Sprite(props) {
  var base = GameObject(props);

  var extended = {
    dx: base.x,
    dy: base.y,
    id: (~~(Math.random()*10000000)).toString(16),
    frame: [],
    type: 'sprite',
    animation: animations[props[2]],
    color: props[3],
    animIndex: 0,
    pixelSize: 5,
    orientation: 1, // right
    animationEnds: function() {},
    updateFrame: function (dt) {
      this.animIndex += dt*20;
      if (this.animIndex >= this.animation.length) {
        this.animIndex = 0;
        this.animationEnds();
      }
      this.frame = this.animation[~~(this.animIndex)];
    },
    updateData: function(dt) {},
    update: function(dt) {
      this.updateData(dt);
      this.updateFrame(dt);
    },
    drawFrame: function() {
      for (var i = 0; i < this.frame.length; i++) {
        var coords = this.frame[i];
        if(coords[2]==1){
          graphics.fillStyle = '#f00'
        } else if(this.collided){
          graphics.fillStyle = '#ff0'
        }else{
          graphics.fillStyle = this.color
        }
        if(this.orientation == 1){
          graphics.fillRect(coords[0]*this.pixelSize, coords[1]*this.pixelSize, this.pixelSize, this.pixelSize);
        }else{
          graphics.fillRect(14*this.pixelSize - coords[0]*this.pixelSize, coords[1]*this.pixelSize, this.pixelSize, this.pixelSize);
        }
      }      
    },
    draw: function() {
      graphics.save();
      graphics.translate(this.x, this.y);
      graphics.fillStyle = this.color;
      this.drawFrame();
      graphics.restore();
    },
    setAnimation: function(animationIndex) {
      this.animation = animations[animationIndex]
    }
  }
  extendFunction(base, extended)
  return extended
}


function Character(props) {
  var base = Sprite(props);
  var extended = {
    type: 'character',
    colliding: false,
    hitPoints: 3,
    collisionAnimation: collisionAnimations[props[2]],
    collisionFrame: [],
    animationEnds: function() {
      this.animation = animations[0];
      this.collisionAnimation = collisionAnimations[0];
      this.status = 'idle';
      this.colliding = false;
    },
    update: function(dt) {
      this.collided = this.colliding;
      this.updateData(dt);
      this.updateFrame(dt);
      this.collisionFrame = this.collisionAnimation[~~(this.animIndex)];
      this.setHitArea();
    },
    setHitArea: function() {
      for (var i = 0; i < this.collisionFrame.length; i++) {
        var coords = this.collisionFrame[i];
        if(this.orientation == 1){
          addHitPixelToCollisionMatrix(this.x + coords[0]*this.pixelSize, this.y +coords[1]*this.pixelSize, this.id);
        }else{
          addHitPixelToCollisionMatrix(this.x + 14*this.pixelSize - coords[0]*this.pixelSize, this.y +coords[1]*this.pixelSize, this.id);
        }
      }
    },
    drawFrame: function() {
      for (var i = 0; i < this.frame.length; i++) {
        var coords = this.frame[i];
        /*if(coords[2]==1){
          graphics.fillStyle = '#f00'
        }else{*/
          graphics.fillStyle = this.color
        //}
        if(this.orientation == 1){
          graphics.fillRect(coords[0]*this.pixelSize, coords[1]*this.pixelSize, this.pixelSize, this.pixelSize);
          addPixelToCollisionMatrix(this.x + coords[0]*this.pixelSize, this.y +coords[1]*this.pixelSize, this.id);
        }else{
          graphics.fillRect(14*this.pixelSize - coords[0]*this.pixelSize, coords[1]*this.pixelSize, this.pixelSize, this.pixelSize);
          addPixelToCollisionMatrix(this.x + 14*this.pixelSize - coords[0]*this.pixelSize, this.y +coords[1]*this.pixelSize, this.id);
        }
      }      
    },
    getDamageOn: function(y) {
      if(this.colliding) return
      this.colliding = true;
      this.hitPoints--;

      var impactOnY = (y - this.y)/this.pixelSize;
      var keyFrame = 0;
      if(this.hitPoints<0) {
        keyFrame = 7;
      }else if(impactOnY <= 6){
        // impact on head
        keyFrame = 5;
      }else if(impactOnY <= 11) {
        keyFrame = 6;
        // impact on body
      }else {
        // impact on legs
      }
      this.setAnimation(keyFrame);
    },
    setAnimation: function(animationIndex) {
      this.animation = animations[animationIndex];
      this.collisionAnimation = collisionAnimations[animationIndex];
      this.animIndex = 0;
    }
  }
  extendFunction(base, extended)
  return extended
}

// 0: left, 1: right
const CHARACTER_SIDES = [-1, 1];
const PUNCHS = [2,3,4];

function Fighter(props) {
  var base = Character(props);
  var extended = {
    speed: 120,
    nextPunch: 0,
    updateData: function() {

    },
    run: function() {

    },
    jump: function() {
      fighter.setAnimation(2);
    },
    kick: function() {
      this.setAnimation(1);
    },
    punch: function() {
      if(this.status === 'punching') return;
      this.status = 'punching';
      this.setAnimation(PUNCHS[this.nextPunch])
      this.nextPunch++;
      if(this.nextPunch==PUNCHS.length) this.nextPunch = 0
    },
    catchActor: function() {

    },
    throwActor: function() {

    },
    move: function(side, dt) {
      this.dx += CHARACTER_SIDES[side]*this.speed*dt;
      this.x = ~~(this.dx/this.pixelSize)*this.pixelSize;
      this.orientation = side;
    }
  };
  extendFunction(base, extended)
  return extended
}