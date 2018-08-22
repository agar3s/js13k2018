

function animationLoader (animationData) {
  var frames = [];
  var previousFrame = [];
  var frame = [];

  for (var i = 0; i < animationData.length; i+=2) {
    var dataByte = parseInt(animationData[i]+animationData[i+1], 16);
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

  for (var i = 0; i < frames.length; i++) {
    for (var j = 0; j < frames[i].length; j++) {
      var dataByte = frames[i][j];
      var x = dataByte&0x0f;
      var y = dataByte>>4;
      frames[i][j] = [x, y];
    }
  }

  return frames;
}

for (var i = 0; i < animations.length; i++) {
  animations[i] = animationLoader(animations[i]);
}

