
var collisionAnimations = [];

function animationLoader (animationData) {
  var frames = [];
  var previousFrame = [];
  var frame = [];

  var indexCollider = 0;
  for (var i = 0; i < animationData.length; i+=2) {
    var dataByte = parseInt(animationData[i]+animationData[i+1], 16);
    if (dataByte==2) {
      indexCollider = i+2;
      break;
    }
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
  // check frames with collisions

  var indexFrame = 0;
  previousFrame = [];
  frame = [];
  var colliderFrames = [];
  for (var i = indexCollider; i < animationData.length; i+=2) {
    var dataByte = parseInt(animationData[i]+animationData[i+1], 16);
    if (dataByte==1) {
      colliderFrames.push(JSON.parse(JSON.stringify(frame)));
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
  colliderFrames.push(frame);

  

  for (var i = 0; i < frames.length; i++) {
    for (var j = 0; j < frames[i].length; j++) {
      var dataByte = frames[i][j];
      var x = dataByte&0x0f;
      var y = dataByte>>4;
      frames[i][j] = [x, y];
    }
  }

  for (var i = 0; i < colliderFrames.length; i++) {
    for (var j = 0; j < colliderFrames[i].length; j++) {
      var dataByte = colliderFrames[i][j];
      var x = dataByte&0x0f;
      var y = dataByte>>4;
      frames[i].push([x, y, 1]);
    }
  }

  return frames;
}

for (var i = 0; i < animations.length; i++) {
  animations[i] = animationLoader(animations[i]);
  collisionAnimations.push([])

  // frames
  for (var j = 0; j < animations[i].length; j++) {
    // frame
    collisionAnimations[i].push([])
    for (var k = 0; k < animations[i][j].length; k++) {
      var coords = animations[i][j][k];
      if(coords[2]==1) collisionAnimations[i][j].push([coords[0], coords[1]])
    }
  }
}

