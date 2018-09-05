
var getRandomValue = function(value, offset) {
  return Math.random()*(value||1) + (offset||0);
}

var randomSign = function() {
  return getRandomValue()>0.5?1:-1;
}

var extendFunction = function(parent, child) {
  var keys = Object.keys(parent);
  for(var i=0; i<keys.length; i++){
    var key = keys[i]
    if(!child[key]){
      child[key] = parent[key]
    }
  }
}
