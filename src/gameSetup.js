
var mainScene = Scene({});
mainScene.create = function(){
  this.add(Sprite([120, 120, 2, '#f6f']));
  this.add(Sprite([160, 80, 4, '#6ff']));
  this.add(Sprite([250, 150, 4, '#6ff']));

  for (var i = 0; i < 0; i++) {
    this.add(Sprite([(~~(Math.random()*60)*5+10), 120, 4, '#666']));
  }


  this.add(player);
};

var secondScene = Scene({});
secondScene.create = function() {
  var something = GameObject([20,20]);
  something.barLength = 60;
  something.draw = function() {
    graphics.fillStyle = '#f30';
    graphics.fillRect(this.x, this.y, this.barLength, 10);
  }
  something.direction = 1;
  something.update = function(dt) {
    this.barLength -= dt;
  }
  this.add(something);
  this.add(Text([20, 28, 'you']));
};

sceneManager.add(mainScene);
sceneManager.add(secondScene);
