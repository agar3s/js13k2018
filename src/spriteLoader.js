var req = new XMLHttpRequest();
//req.open('GET', './ninja_dead_animation.bs');
req.open('GET', './ninja_run_animation.bs');
//req.responseType = 'arraybuffer';

var frames = [];
var previousFrame = [];
req.onload = function (event) {
  var arrayBuffer = req.response;
  console.log(arrayBuffer.toString())
  if (arrayBuffer) {
    
    var frame = []
    for (var i = 0; i < arrayBuffer.length; i+=2) {
      var dataByte = parseInt(arrayBuffer[i]+arrayBuffer[i+1], 16);
      if (dataByte==1) {
        frames.push(JSON.parse(JSON.stringify(frame)));
        previousFrame = frame;
      } else {
        var index = previousFrame.indexOf(dataByte);
        if(index==-1){
          frame.push(dataByte);
        } else {
          index  = frame.indexOf(dataByte);
          frame.splice(index, 1);
        }
      }
    }
    frames.push(frame);
  }

  for (var i = 0; i < frames.length; i++) {
    for (var j = 0; j < frames[i].length; j++) {
      var dataByte = frames[i][j];
      var x = dataByte&0x0f;
      var y = dataByte>>4;
      frames[i][j] = [x, y];
    }
  }
  animationLength = frames.length;
  console.log('animationLength', animationLength)
};

req.send(null)
