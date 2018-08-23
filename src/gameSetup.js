
var mainScene = Scene({});

mainScene.add(Sprite([120, 80, 1, '#f6f']));
mainScene.add(Sprite([200, 50, 0, '#6ff']));
mainScene.add(Sprite([60, 30, 2, '#994']));
mainScene.add(Sprite([20, 140, 3, '#f64']));
mainScene.add(Sprite([160, 140, 4, '#66f']));

var secondScene = Scene({});

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
secondScene.add(something);

setTimeout(function(){
  mainScene.active = false;
}, 3000);

setTimeout(function(){
  secondScene.active = false;
}, 4000);

setTimeout(function(){
  mainScene.active = true;
}, 4500);

setTimeout(function(){
  secondScene.active = true;
}, 6000);
