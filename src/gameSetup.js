
var mainScene = Scene({});
var enemy = Fighter([80, 120, FIGHTER_STATUS_IDS[0], '#afa']);
var enemy2 = Fighter([75, 120, FIGHTER_STATUS_IDS[0], '#afa']);

var playerController = PlayerController([player]);
var enemyController = AIController([enemy]);

mainScene.create = function(){

  for (var i = 0; i < 0; i++) {
    this.add(Character([(~~(Math.random()*60)*5+10), 120, 4, '#666']));
  }

  this.add(enemy);
  this.add(player);
};


mainScene.updateData = function(time, dt) {
  playerController.update(time, dt);
  enemyController.update(time, dt);
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


