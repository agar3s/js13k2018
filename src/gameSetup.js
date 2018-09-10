
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

  this.enemyCounter = 0;
  this.add(player);
  this.following = player;

  var map = [3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,4,4,4,3,4,0,4,4,3,4];
  map[5] = 1;
  map[14] = 0;
  map[15] = 3;
  map[16] = 0;
  
  map[20] = 1;
  map[29] = 0;
  map[30] = 3;
  map[31] = 0;

  map[35] = 1;
  map[45] = 3;

  map[50] = 1;
  map[60] = 3;
  for (var i = 0; i < map.length; i++) {
    this.add(Tile([i*16*2, 118+16*4, map[i]]));
  }
  console.log(map.length)
  mainScene.maxWidth = map.length*32;

  this.sections = [
    [32*15,[],[]],
    [32*15,[[32*10, 0], [32*11, 0], [32*12, 0]],[]],
    [32*30,[],[]],
    [32*30,[[32*25, 2], [32*27, 1]],[]],
    [32*45,[],[]],
    [32*45,[[32*40, 4]],[]],
    [32*60,[],[]],
    [32*60,[[32*58, 5]],[]],
    [32*70,[],[]],
    [32*70,[],[]]
  ];
  mainScene.limit = [0, 320];
  this.loadSection(0);
};


mainScene.updateData = function(time, dt) {
  playerController.update(time, dt);
  for (var i = 0; i < aIControllers.length; i++) {
    aIControllers[i].update(time, dt);
  }

  if(!this.moving && -this.x >= this.limit[1]-320-8*16 && this.enemyCounter==0) {
    mainScene.loadSection(this.currentSectionIndex+1);
  }
};

mainScene.loadSection = function(index) {
  if(index>=this.sections.length) {
    return;
  }
  this.currentSectionIndex = index;
  var section = this.sections[this.currentSectionIndex];
  mainScene.moveToLimit(this.limit[1]-320, section[0]);
  for (var i = 0; i < section[1].length; i++) {
    this.loadEnemy(section[1][i]);
  }
};

mainScene.loadEnemy = function(props) {
  var enemyConfig = enemyConfigurations[props[1]];
  var enemy = Fighter([props[0], 120, FIGHTER_STATUS_IDS[0], enemyConfig[1]]);
  this.add(enemy);
  enemy.hitPoints = enemyConfig[2];
  aIControllers.push(AIController([enemy, enemyConfig[0]]));
  this.enemyCounter += 1;
};

mainScene.removeEnemy = function(enemy) {
  this.enemyCounter -= 1;
  for (var i = 0; i < aIControllers.length; i++) {
    if(aIControllers[i].fighter.id == enemy.id){
      aIControllers.splice(i, 1);
      break;
    }
  }
  this.remove(enemy);
  if (this.enemyCounter==0) {
    hudScene.goMessage.active = true;
  }
};

sceneManager.add(mainScene);
