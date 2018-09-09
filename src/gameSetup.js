
var mainScene = Scene({});
var playerController = PlayerController([player]);

var aIControllers = [];

mainScene.create = function(){

  for (var i = 0; i < 1; i++) {
    var enemy = Fighter([300+32*i, 120, FIGHTER_STATUS_IDS[0], '#007eff']);
    this.add(enemy);
    enemy.hitPoints = 30;
    var enemyController = AIController([enemy, 2]);
    aIControllers.push(enemyController);
  }

  this.add(player);
  this.following = player;

  var map = [4,5,4,3,4,4,3,4,5,4,4,3,4,4,5,4,3,4,4,3,4,5,4,4,3,4];
  for (var i = 0; i < map.length; i++) {
    this.add(Tile([i*16*2, 121+16*4, map[i]]));
  }
  mainScene.maxWidth = map.length*32;

};


mainScene.updateData = function(time, dt) {
  playerController.update(time, dt);
  for (var i = 0; i < aIControllers.length; i++) {
    aIControllers[i].update(time, dt);
  }
};

// second scene HUD
var secondScene = Scene({});
var enemyPunched;
var enemyId = Text([250, 28, '']);

secondScene.create = function() {
  var heroBar = GameObject([20,20]);
  heroBar.barLength = 100;
  heroBar.draw = function() {
    graphics.fillStyle = '#DFEFE2';
    var lenght = 100*(player.hitPoints/30);
    if(lenght<0) return;
    graphics.fillRect(this.x, this.y, ~~lenght, 5);
  }
  heroBar.direction = 1;
  heroBar.update = function(dt) {}
  this.add(heroBar);

  var enemyBar = GameObject([300,20]);
  enemyBar.barLength = 100;
  enemyBar.draw = function() {
    if (enemyPunched){
      graphics.fillStyle = enemyPunched.color;
      var lenght = 100*(enemyPunched.hitPoints/30);
      if(lenght<0) return;
      var start = this.x - lenght
      graphics.fillRect(start, this.y, ~~lenght, 5);
    }
  }
  enemyBar.direction = 1;
  enemyBar.update = function(dt) {}

  this.add(heroBar);
  this.add(Text([20, 28, 'you']));
  this.add(enemyBar);
  this.add(enemyId);
};

sceneManager.add(mainScene);
sceneManager.add(secondScene);


