
var mainScene = Scene({});
var playerController = PlayerController([player]);

var aIControllers = [];

var enemyConfigurations = [
  [0, '#007eff', 10],
  [1, '#fe9300', 10],
  [2, '#69ccef', 20],
  [3, '#1ae0b8', 20],
  [4, '#8fcc3e', 30],
  [5, '#fe1111', 30]
];

mainScene.create = function(){

  for (var i = 0; i < 6; i++) {
    var enemyConfig = enemyConfigurations[i%6];

    var enemy = Fighter([300+32*i*10, 120, FIGHTER_STATUS_IDS[0], enemyConfig[1]]);
    this.add(enemy);
    enemy.hitPoints = enemyConfig[2];
    var enemyController = AIController([enemy, enemyConfig[0]]);
    aIControllers.push(enemyController);
  }

  this.add(player);
  this.following = player;

  var map = [0,4,4,5,4,5,4,5,4,4,0,4,4,4,5,4,3,4,4,4,0,4,4,4,3,4,4,4,3,4,0,4,4,3,4,0,4,4,5,4,5,4,5,4,4,0,4,4,4,5,4,3,4,4,4,0,4,4,4,3,4,4,4,3,4,0,4,4,3,4];
  for (var i = 0; i < map.length; i++) {
    this.add(Tile([i*16*2, 118+16*4, map[i]]));
  }
  mainScene.maxWidth = map.length*32;
  console.log(map.length)



  this.sections = [
    32*15,
    32*25,
    32*25,
    32*45,
    32*70,
    32*70
  ];
  this.currentSectionIndex = 0;
  mainScene.limit = [0, this.sections[this.currentSectionIndex]];

  //mainScene.moveToLimit(mainScene.limit[1]-320, 32*25);

};


mainScene.updateData = function(time, dt) {
  playerController.update(time, dt);
  for (var i = 0; i < aIControllers.length; i++) {
    aIControllers[i].update(time, dt);
  }

  if(!this.moving&&-this.x>=this.limit[1]-320-8*16) {
    this.currentSectionIndex++;
    if(this.currentSectionIndex>=this.sections.length) {
      return;
    }
    var section = this.sections[this.currentSectionIndex];
    mainScene.moveToLimit(this.limit[1]-320, section);
    console.log('changing to '+this.currentSectionIndex + 'section')
  }
};

// second scene HUD
var hudScene = Scene({});
var enemyPunched;
var enemyId = Text([250, 28, '']);

hudScene.create = function() {
  var heroBar = GameObject([20,20]);
  heroBar.barLength = 100;
  heroBar.draw = function() {
    graphics.fillStyle = '#DFEFE2';
    var length = 100*(player.hitPoints/30);
    if(length<0) return;
    graphics.fillRect(this.x, this.y, ~~length, 5);
  }
  heroBar.direction = 1;
  heroBar.update = function(dt) {}
  this.add(heroBar);

  var enemyBar = GameObject([300,20]);
  enemyBar.barLength = 100;
  enemyBar.draw = function() {
    if (enemyPunched){
      graphics.fillStyle = enemyPunched.color;
      var length = 100*(enemyPunched.hitPoints/30);
      if(length<0) return;
      var start = this.x - length
      graphics.fillRect(start, this.y, ~~length, 5);
    }
  }
  enemyBar.direction = 1;
  enemyBar.update = function(dt) {}

  this.add(heroBar);
  this.add(Text([20, 28, 'mr anderson']));
  this.add(enemyBar);
  this.add(enemyId);

  var progressBar = GameObject([20, 234]);
  progressBar.length = 280;
  progressBar.draw = function() {
    graphics.fillStyle = '#000';
    graphics.fillRect(this.x, this.y, this.length, 3);
    graphics.fillStyle = '#fff';
    var position = ~~(this.length*((player.x+12)/(mainScene.maxWidth-24)));
    graphics.fillRect(this.x + position, this.y, 1, 3);
  }
  this.add(progressBar);
};

sceneManager.add(mainScene);
sceneManager.add(hudScene);


