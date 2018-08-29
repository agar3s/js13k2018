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
  return {
    x: base.x,
    y: base.y,
    dx: base.x,
    dy: base.y,
    id: (~~(Math.random()*10000000)).toString(16),
    frame: [],
    type: 'sprite',
    animation: animations[props[2]],
    colliding: false,
    color: props[3],
    animIndex: 0,
    pixelSize: 5,
    orientation: 1, // right
    animationEnds: function(){
      this.animation = animations[0];
      this.status = 'idle';
    },
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
      this.collided = this.colliding;
      this.colliding = false;
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
          addPixelToCollisionMatrix(this.x + coords[0]*this.pixelSize, this.y +coords[1]*this.pixelSize, coords[2], this.id);
        }else{
          graphics.fillRect(14*this.pixelSize - coords[0]*this.pixelSize, coords[1]*this.pixelSize, this.pixelSize, this.pixelSize);
          addPixelToCollisionMatrix(this.x + 14*this.pixelSize - coords[0]*this.pixelSize, this.y +coords[1]*this.pixelSize, coords[2], this.id);
        }
      }      
    },
    draw: function() {
      graphics.save();
      graphics.translate(this.x, this.y);
      graphics.fillStyle = this.color;
      this.drawFrame();
      graphics.restore();
    }
  }
}

