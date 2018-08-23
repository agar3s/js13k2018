// src/scene.js
// should display different objects in screen, like scenes in phaser

var sceneManager = {
  scenes: [],
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
    add: function(gameObject) {
      this.children.push(gameObject);
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
  sceneManager.scenes.push(scene);
  return scene;
}

