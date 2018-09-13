// second scene HUD
var levelUpScene = Scene({});
levelUpScene.active = false;

levelUpScene.create = function() {

  var name = Text([40, 28, 'n30: tank, load a new program: ']);
  this.add(name);

  this.options = [];

  this.indexOption = 0;
  this.options.push(Text([55, 50, 'hit points: '+basePlayerStat.maxHp+' (+5)']));
  this.options.push(Text([55, 65, 'defense: +'+basePlayerStat.defense+' (+0.5)']));
  this.options.push(Text([55, 80, 'damage: +'+basePlayerStat.damage+' (+0.5)']));

  for (var i = 0; i < this.options.length; i++) {
    this.add(this.options[i]);
  }
  
  this.setOption(0);
};

levelUpScene.setOption = function(index){
  this.options[this.indexOption].color = '#ddfed9';
  this.indexOption = index;
  if(this.indexOption>=this.options.length){
    this.indexOption = 0;
  }
  if(this.indexOption<0){
    this.indexOption = this.options.length - 1;
  }
  this.options[this.indexOption].color = '#9bbc0f';
}

levelUpScene.applyStat = function(){
  switch(this.indexOption){
    case 0: basePlayerStat.maxHp+=5;break;
    case 1: basePlayerStat.defense+=0.5;break;
    case 2: basePlayerStat.damage+=0.5;break;
  }
  this.options[0].setText('hit points: '+basePlayerStat.maxHp+' (+5)');
  this.options[1].setText('defense: +'+basePlayerStat.defense+' (+0.5)');
  this.options[2].setText('damage: +'+basePlayerStat.damage+' (+0.5)');

  player.resetHp();
  play(powerup);
}

levelUpScene.updateData = function(time){
}

levelUpScene.predraw = function() {
  if(!this.active) return;
  graphics.fillStyle = 'rgba(0,0,0,0.5)';
  graphics.fillRect(0,0,320,240);
}


sceneManager.add(levelUpScene);
