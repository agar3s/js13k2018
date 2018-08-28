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
    animation: animations[props[2]],
    color: props[3],
    animIndex: 0,
    pixelSize: 5,
    orientation: 1, // right
    updateFrame: function (dt) {
      this.animIndex += dt*20;
      if (this.animIndex >= this.animation.length) {
        this.animIndex = 0;
      }
    },
    updateData: function(dt) {},
    update: function(dt) {
      this.updateData(dt);
      this.updateFrame(dt);
    },
    drawFrame: function() {
      var animationIndex = ~~(this.animIndex);
      for (var i = 0; i < this.animation[animationIndex].length; i++) {
        var coords = this.animation[animationIndex][i];
        if(coords[2]){
          graphics.fillStyle = '#f00'
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
      graphics.translate(~~this.x, ~~this.y);
      graphics.fillStyle = this.color;
      this.drawFrame();
      graphics.restore();
    }
  }
}

