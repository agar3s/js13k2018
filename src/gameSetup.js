
var mainScene = Scene({});
var enemy = Fighter([80, 120, 2, '#f6f']);
mainScene.create = function(){
  this.add(enemy);
  //this.add(Character([160, 120, 4, '#6ff']));
  //this.add(Character([250, 120, 4, '#6ff']));

  for (var i = 0; i < 0; i++) {
    this.add(Character([(~~(Math.random()*60)*5+10), 120, 4, '#666']));
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
var playerController = new PlayerController([player]);
var enemyController = new AIController([enemy]);

mainScene.updateData = function(dt) {
  playerController.update(dt);
  enemyController.update(dt);
}

