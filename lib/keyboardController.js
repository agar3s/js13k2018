
var keyMap = 0;
// default keyboard
var inputs = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39, 
  PUNCH: 83,
  KICK: 68,
  JUMP: 32,
  ENTER: 13,
  ESC: 27
};

var keys = {};
var inputNames = Object.keys(inputs);
for (var i = 0; i < inputNames.length; i++) {
  var inputName = inputNames[i];
  keys[inputs[inputName]] = (1<<i);
}


document.onkeydown = function(e){
  var key = e.keyCode|| e.which;
  if(keys[key]){
    keyMap|=keys[key];
    e.preventDefault();
  }
}

document.onkeyup = function(e){
  var key = e.keyCode ? e.keyCode : e.which;
  if(keyMap&keys[key]){
    keyMap^=keys[key];
    e.preventDefault();
  }
}


