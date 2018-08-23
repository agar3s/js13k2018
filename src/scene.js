// src/scene.js
// should display different objects in screen, like scenes in phaser

function Scene (props) {
  return {
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
  } 
}
