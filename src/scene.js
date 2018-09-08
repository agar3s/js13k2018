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
    active: true,
    children: [],
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
    },
    draw: function() {
      if(!t.active) return;
      for (var i = 0; i < t.children.length; i++) {
        t.children[i].draw();
      }
    }
  };
  return t;
}

