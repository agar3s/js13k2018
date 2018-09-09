
var mainScene = Scene({});
var enemy = Fighter([80, 120, FIGHTER_STATUS_IDS[0], '#007eff']);
var enemy2 = Fighter([75, 120, FIGHTER_STATUS_IDS[0], '#aaa']);

var playerController = PlayerController([player]);
var enemyController = AIController([enemy]);

mainScene.create = function(){

  for (var i = 0; i < 10; i++) {
    this.add(Fighter([32*i, 120, FIGHTER_STATUS_IDS[0], '#fe9300']));
  }

  this.add(enemy);
  this.add(player);

  var map = [4,5,4,3,4,4,3,4,5,4,4,3,4];
  for (var i = 0; i < map.length; i++) {
    this.add(Tile([i*16*2, 121+16*4, map[i]]));
  }
};


mainScene.updateData = function(time, dt) {
  playerController.update(time, dt);
  enemyController.update(time, dt);
};

// second scene HUD
var secondScene = Scene({});
secondScene.create = function() {
  var something = GameObject([20,20]);
  something.barLength = 100;
  something.draw = function() {
    graphics.fillStyle = '#DFEFE2';
    graphics.fillRect(this.x, this.y, 100*(player.hitPoints/30), 10);
  }
  something.direction = 1;
  something.update = function(dt) {}
  this.add(something);
  this.add(Text([20, 28, 'you']));
};

sceneManager.add(mainScene);
sceneManager.add(secondScene);


