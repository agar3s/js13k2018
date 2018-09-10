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
      var length = ~~(100*(enemyPunched.hitPoints/30));
      if(length<0) return;
      var start = this.x - length
      graphics.fillRect(start, this.y, length, 5);
    }
  }
  enemyBar.direction = 1;
  enemyBar.update = function(dt) {}

  this.add(heroBar);
  var name = Text([20, 28, 'mr anderson']);
  name.size = 1;
  this.add(name);
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

  this.goMessage = Text([200, 60, 'go!']);
  this.goMessage.size = 2;
  this.goMessage.time = 0;
  this.goMessage.visible = false;
  this.goMessage.update = function(dt) {
    if(!this.active) return;
    this.time += dt;
    var value = this.time%0.8;
    this.visible = value<0.6;

    if(this.time > 4) {
      this.visible = false;
      this.time = 0;
      this.active = false;
    }
  }
  
  this.add(this.goMessage);

  this.clock = Text([150, 1, '00 00'])
  this.clock.time = 0;
  this.clock.setTime = function(time){
    this.time = time;
    var cents = this.time%100;
    if(cents<10) cents = '0'+cents;
    var seconds = ~~(this.time/100);
    if(seconds<10) seconds = '0'+seconds;
    this.setText(seconds+' '+cents);
  }
  this.add(this.clock);

  this.dialogue = Text([10, 70, '']);
  this.dialogue.size = 1;
  this.dialogue.time = 0;
  this.dialogue.visible = false;
  this.dialogue.pipeline = [];
  this.dialogue.index = -1;
  this.dialogue.color = '#66b400';
  this.dialogue.setIndex = function(index){
    this.index = index;
    if(this.index>=this.pipeline.length) {
      this.active = false;
      this.visible = false;
      return;
    }
    var dialogue = this.pipeline[this.index];
    this.setText(dialogue[0]);
    this.time = dialogue[1];
    this.active = true;
    this.visible = true;

  };
  this.dialogue.update = function(dt) {
    if(!this.active) return;
    this.time -= dt;
    if(this.time<0) {
      this.setIndex(this.index + 1);
    }
  }
  this.add(this.dialogue);
};

hudScene.updateData = function(time){
  var time = ~~(time/10);
  if(this.clock.time != time){
    this.clock.setTime(time);
  }
}

hudScene.setDialoguePipeline = function(dialogue){
  this.dialogue.pipeline = dialogue;
  if(this.dialogue.pipeline.length>0){
    this.dialogue.setIndex(0);
  }
}


sceneManager.add(hudScene);

