var req = new XMLHttpRequest();
req.open('GET', './ninja_dead_animation.bs', true);
req.responseType = 'arraybuffer';

var frames = [];
var previousFrame = [];
req.onload = function (event) {
  var arrayBuffer = req.response;
  if (arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer);
    var frame = []
    for (var i = 0; i < byteArray.byteLength; i++) {
      var dataByte = byteArray[i];
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
