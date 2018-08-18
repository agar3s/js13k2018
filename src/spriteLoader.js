var req = new XMLHttpRequest();
//req.open('GET', './ninja_run_01', true);
req.open('GET', './ninja_run_animation', true);
req.responseType = 'arraybuffer';

var frames = [];
var previousFrame = [];
req.onload = function (event) {
  var arrayBuffer = req.response;
  if (arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer);
    var frame = []
    for (var i = 0; i < byteArray.byteLength; i++) {
      var dataByte = byteArray[i]; //fuck yeah!
      if (dataByte==1) {
        frames.push(JSON.parse(JSON.stringify(frame)));
        previousFrame = frame;
        //frame = previousFrame;
      } else {
        var index = previousFrame.indexOf(dataByte);
        if(index==-1){
          frame.push(dataByte);
        } else {
          index  = frame.indexOf(dataByte);
          frame.splice(index, 1);
          console.log('remove', dataByte)
        }
        /*
        var x = dataByte&0x0f;
        var y = dataByte>>4;
        frame.push([x, y]);
        */
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

};

req.send(null)