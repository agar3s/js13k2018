// src/gameObject.js >>

function GameObject(props) {
  return {
    x: props[0],
    y: props[1],
    visible: true,
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
    pixelSize: 4,
    orientation: 1, // right
    animationEnds: function() {},
    updateFrame: function (dt) {
      this.animIndex += dt*22;
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
        graphics.fillStyle = this.color
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
    hitPoints: 30,
    collisionAnimation: collisionAnimations[props[2]],
    collisionFrame: [],
    targetHit: 2,
    typeHit: 1,
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
          addHitPixelToCollisionMatrix(this.x + coords[0]*this.pixelSize, this.y +coords[1]*this.pixelSize, this.id, this.targetHit);
        }else{
          addHitPixelToCollisionMatrix(this.x + 14*this.pixelSize - coords[0]*this.pixelSize, this.y +coords[1]*this.pixelSize, this.id, this.targetHit);
        }
      }
    }
  }
  extendFunction(base, extended)
  return extended
}
