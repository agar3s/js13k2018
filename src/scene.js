// src/scene.js
// should display different objects in screen, like scenes in phaser

var sceneManager = {
  scenes: [],
  add: function(scene) {
    scene.create();
    this.scenes.push(scene);
  },
  update: function(dt) {
    for (var i = 0; i < this.scenes.length; i++) {
      this.scenes[i].update(dt);
    }
  },
  draw: function() {
    for (var i = 0; i < this.scenes.length; i++) {
      this.scenes[i].draw();
    }
  }
};

function Scene (props) {
  var scene = {
    active: true,
    children: [],
    create: function(){},
    add: function(gameObject) {
      this.children.push(gameObject);
      if(gameObject.type==='character'){
        itemsColliders[gameObject.id] = gameObject;
      }
    },
    remove: function(gameObject) {
      var index = this.children.indexOf(gameObject);
      if(index!=-1){
        this.children.splice(index, 1);
      }
    },
    update: function(dt) {
      if(!this.active) return;
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].update(dt);
      }
    },
    draw: function() {
      if(!this.active) return;
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].draw();
      }
    }
  };
  return scene;
}

