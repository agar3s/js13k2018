
var mainScene = Scene({});
mainScene.create = function(){
  this.add(Sprite([120, 80, 1, '#f6f']));
  this.add(Sprite([200, 50, 0, '#6ff']));
  this.add(Sprite([60, 30, 2, '#994']));
  this.add(Sprite([20, 140, 3, '#f64']));
  this.add(Sprite([160, 140, 4, '#66f']));
};


var secondScene = Scene({});
secondScene.create = function() {
  var something = GameObject([20,20]);
  something.draw = function() {
    graphics.fillStyle = '#f30';
    graphics.fillRect(this.x, this.y, 60, 10);
  }
  something.direction = 1;
  something.update = function(dt) {
    this.y += this.direction*dt*40;
    if(this.y>220) this.direction=-1;
    if(this.y<0) this.direction=1;
  }
  this.add(something);
  this.add(Text([10, 10, 'texto de prueba']));
  this.add(Text([10, 25, 'score #6995']));
  this.add(Text([10, 40, 'what is this?']));
  this.add(Text([10, 55, 'no me lo creo!']));
  this.add(Text([10, 70, '0123456789']));
};

sceneManager.add(mainScene);
sceneManager.add(secondScene);
