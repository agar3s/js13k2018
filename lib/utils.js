
var getRandomValue = function(value, offset) {
  return Math.random()*(value||1) + (offset||0);
}

var randomSign = function() {
  return getRandomValue()>0.5?1:-1;
}