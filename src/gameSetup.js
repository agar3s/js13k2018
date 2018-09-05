
var mainScene = Scene({});
var enemy = Fighter([80, 120, 2, '#f6f']);
var enemy2 = Fighter([75, 120, 2, '#fff']);

var playerController = PlayerController([player]);
var enemyController = AIController([enemy]);
var enemyController2 = AIController([enemy2]);

mainScene.create = function(){

  for (var i = 0; i < 0; i++) {
    this.add(Character([(~~(Math.random()*60)*5+10), 120, 4, '#666']));
  }

  this.add(enemy);
  this.add(enemy2);
  this.add(player);
};


mainScene.updateData = function(dt) {
  playerController.update(dt);
  enemyController.update(dt);
  enemyController2.update(dt);
};

// second scene HUD
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


