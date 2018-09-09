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
    maxWidth: 320,
    create: function(){},
    add: function(gameObject) {
      t.children.push(gameObject);
      if(gameObject.type==='character'){
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
        t.children[i].update(dt);
      }
      t.updateData(time, dt);
      if(this.following) {
        this.x = -(this.following.x-150);
        this.x = ~~this.x;
        if(this.x>0) {
          this.x = 0;
        }else if(this.x<-this.maxWidth+320){
          this.x = -this.maxWidth+320;
        }
      }
    },
    draw: function() {
      if(!t.active) return;
      graphics.save();
      graphics.translate(this.x, 0);

      for (var i = 0; i < t.children.length; i++) {
        t.children[i].draw();
      }

      graphics.restore();
    }
  };
  return t;
}

