
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


