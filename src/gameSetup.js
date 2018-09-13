
var mainScene = Scene({});
var playerController = PlayerController([player]);

var aIControllers = [];

var enemyConfigurations = [
  [0, '#007eff', 10],
  [1, '#fe9300', 10],
  [2, '#69ccef', 20], // 69ccef
  [3, '#1ae0b8', 20], // 1ae0b8
  [4, '#8fcc3e', 30], // 8fcc3e
  [5, '#fe1111', 30],  // fe1111
  [6, '#ffff11', 40],   // fe1111
  [7, '#F6FF97', 50]   // fe1111
];

mainScene.create = function(){

  this.enemyCounter = 0;
  this.add(player);
  this.following = player;
  this.enemiesToSummon = [];
  this.lastCheckPoint = 0;

  var map = [0];
  for (var i = 1; i < 150; i++) {
    var tile = 4;
    if(i%15==0){
      map[i-1] = 3;
      map[i-10] = 0;
    };
    map.push(tile);
  }
  map[5] = 1;
  map[20] = 1;
  map[35] = 1;
  map[50] = 1;

  for (var i = 0; i < map.length; i++) {
    this.add(Tile([i*16*2, 118+16*4, map[i]]));
  }

  mainScene.maxWidth = map.length*32;

  this.sections = [
    // 0
    [32*15,[],[], matrixScript[0]],
    [32*15,[[32*10, 0]],[[0,0],[0,0],[1]]],
    // 1
    [32*30,[],[]],
    [32*30,[[32*25, 1], [32*27, 1]],[[1],[1,1],[],[2]]],
    
    // 2
    [32*45,[],[]],
    [32*45,[[32*40, 4]],[],matrixScript[1]],
    // 3
    [32*60,[],[],[['operator: i cant believe it!', 2]]],
    [32*60,[[32*58, 2]],[[1,1],[0,0],[1,1],[],[3]]],
    // 4
    [32*75,[],[]],
    [32*75,[[32*69,0],[32*71,0],[32*73, 3]],[[0,1],[0,0],[1,0]]],
    // 5
    [32*90,[],[]],
    [32*90,[[32*85, 5]],[], matrixScript[2]],
    // 6
    [32*105,[],[], matrixScript[3]],
    [32*105,[],[[0,0],[1,1],[0,0,0],[1,1,1],[],[],[0,0,1,1],[1,0,0,1],[],[],[],[2]]],
    // 7
    [32*120,[],[], [['trinity: hurry, neo!', 2]]],
    [32*120,[],[[5, 6]], matrixScript[4]],
    // 8
    [32*135,[],[]],
    [32*135,[[32*130, 7]], [], matrixScript[5]],
    // 9
    [32*150,[],[]],
    [32*150,[],[]]
  ];
  mainScene.limit = [0, 320];
  //this.loadSection(0);

  this.loadCheckPoint(0*2);
};

mainScene.loadCheckPoint = function(point) {
  var distance = this.sections[point][0];
  this.enemyCounter = 0;
  player.dx = distance-32*15;
  player.x = player.dx;
  this.x = -player.x;
  mainScene.limit = [0, distance-32*5];
  this.loadSection(point);
}

mainScene.gameOver = function(player){
  //this.remove(player);
  player.hitPoints = 60;
  playerController.fighter = player;
  this.enemiesToSummon = [];
  for (var i = aIControllers.length - 1; i >= 0; i--) {
    this.remove(aIControllers[i].fighter);
    aIControllers.splice(i, 1);
  }
  // remove aIcontrollers with enemies
  this.loadCheckPoint(this.lastCheckPoint);
}


mainScene.updateData = function(time, dt) {
  playerController.update(time, dt);
  for (var i = 0; i < aIControllers.length; i++) {
    aIControllers[i].update(time, dt);
  }

  if(!this.moving && -this.x >= this.limit[1]-320-8*16 && this.enemyCounter==0 && this.enemiesToSummon.length==0) {
    mainScene.loadSection(this.currentSectionIndex+1);
  }

  this.nextSummon -= dt;
  if(this.enemiesToSummon.length>0 && this.nextSummon<0) {
    var enemyprops = this.enemiesToSummon.splice(0, 1)[0];
    var enemy = mainScene.loadEnemy([enemyprops[0], enemyprops[1]]);
    enemy.setAnimation(11);
    enemy.speed = enemyprops[2];
    enemy.y = 0;
    enemy.speedY= -250;
    enemy.dy = 0;
    enemy.locked = true;
    this.nextSummon = 0.5;
  }
};

mainScene.loadSection = function(index) {
  if(index>=this.sections.length) {
    return;
  }
  if(hudScene && this.currentSectionIndex>5){
    hudScene.setDialoguePipeline([]);
  }
  this.currentSectionIndex = index;
  var section = JSON.parse(JSON.stringify(this.sections[this.currentSectionIndex]));
  mainScene.moveToLimit(this.limit[1]-320, section[0]);
  for (var i = 0; i < section[1].length; i++) {
    this.loadEnemy(section[1][i]);
  }
  this.enemyPool = section[2].reverse();
  if(i==0) {
    this.summonEnemies(-(this.limit[1]-320), 2);
  }
  if (section[3]) {
    setTimeout(function(){
      hudScene.setDialoguePipeline(section[3]);
    }, 1500)
  }
  this.lastCheckPoint = (~~(index/2))*2;
};

mainScene.loadEnemy = function(props) {
  var enemyConfig = enemyConfigurations[props[1]];
  var enemy = Fighter([props[0], 120, FIGHTER_STATUS_IDS[0], enemyConfig[1]]);
  this.add(enemy);
  enemy.hitPoints = enemyConfig[2];
  aIControllers.push(AIController([enemy, enemyConfig[0]]));
  this.enemyCounter += 1;
  return enemy;
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
  mainScene.summonEnemies(this.x, 0);
  if (this.enemyCounter==0&&this.enemiesToSummon.length==0) {
    hudScene.goMessage.active = true;
  }
};

mainScene.summonEnemies = function(xOffset, delay) {
  if(!this.enemyPool.length) return;
  var enemiesToSummon = this.enemyPool.pop();
  for (var i = 0; i < enemiesToSummon.length; i++) {
    var enemyType = enemiesToSummon[i];
    var x = -xOffset + (i%2==0?0:32*8);
    
    this.nextSummon = 0.5 + delay;
    
    this.enemiesToSummon.push([x, enemyType, i%2==0?250:-250]);
  }
};


sceneManager.add(mainScene);
