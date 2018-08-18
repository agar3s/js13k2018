var req = new XMLHttpRequest();
req.open('GET', './ninja_run_01', true);
req.responseType = 'arraybuffer';

var points = [];
req.onload = function (event) {
  var arrayBuffer = req.response;
  if (arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteArray.byteLength; i++) {
      var coord = byteArray[i]; //fuck yeah!
      var x = coord&0x0f;
      var y = coord>>4;
      points.push([x, y]);
    }
  }
};

req.send(null)