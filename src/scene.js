// src/scene.js
// should display different objects in screen, like scenes in phaser

var sceneManager = {
  scenes: [],
  add: function(scene) {
    scene.create();
    this.scenes.push(scene);
  },
  update: function(time, dt) {
    for (var i = 0; i < this.scenes.length; i++) {
      this.scenes[i].update(time, dt);
    }
  },
  draw: function() {
    for (var i = 0; i < this.scenes.length; i++) {
      this.scenes[i].predraw();
      this.scenes[i].draw();
    }
  }
};

function Scene (props) {
  var t = {
    x: 0,
    dx: 0,
    active: true,
    children: [],
    following: undefined,
    limit: [],
    maxWidth: 320,
    create: function(){},
    add: function(gameObject) {
      t.children.push(gameObject);
      if(gameObject.type==='character'||gameObject.type==='pickable'){
        itemsColliders[gameObject.id] = gameObject;
      }
    },
    remove: function(gameObject) {
      var index = t.children.indexOf(gameObject);
      if(index!=-1){
        t.children.splice(index, 1);
      }
    },
    updateData: function(time, dt){},
    update: function(time, dt) {
      if(!t.active) return;
      for (var i = 0; i < t.children.length; i++) {
        var gameObject = t.children[i]
        if(gameObject.x + 24 > -this.x && gameObject.x < -this.x + 320){
          gameObject.update(dt);
        }
      }
      t.updateData(time, dt);

      if (this.moving) {
        this.moving = this.x>-this.targetX && this.x-320>-this.limit[1];
        if (this.moving) this.x -= 1;
      }else if(this.following) {
        this.x = -(this.following.x-150);
        this.x = ~~this.x;
        if(this.x>-this.limit[0]) {
          this.x = -this.limit[0];
        }else if(this.x<-this.limit[1]+320){
          this.x = -this.limit[1]+320;
        }
      }
    },
    predraw: function(){},
    draw: function() {
      if(!t.active) return;
      graphics.save();
      graphics.translate(this.x, 0);

      for (var i = 0; i < t.children.length; i++) {
        var gameObject = t.children[i]
        if(gameObject.x + 24 > -this.x && gameObject.x < -this.x + 310 && gameObject.visible){
          gameObject.draw();
        }
      }

      graphics.restore();
    },
    moveToLimit: function(minLimit, maxLimit){
      this.moving = true;
      this.targetX = player.x-150;
      if (this.targetX<minLimit){
        this.targetX = minLimit;
      }
      this.limit[0] = minLimit;
      this.limit[1] = maxLimit;
    }
  };
  return t;
}

