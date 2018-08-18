var fs = require('fs');


//assuming sprites with 16X16 dimmension
var cols = 16;
var rows = 16;


// byte version..
var createSprite = function(name, byteArray){
  var wstream = fs.createWriteStream('./'+name);
  var buffer = new Buffer(byteArray);
  wstream.write(buffer);
  wstream.end();
};

var createImage = function(name, byteArray){
  var png = new Png(new Buffer(byteArray), ~~(byteArray.length/3), 1);
  png.encode(function(encodedPng){
    fs.writeFileSync('./'+name+'.png', encodedPng.toString('binary'), 'binary');
  });
};

var transformSprite = function(file){
  var spritestream = fs.readFile('./' + file + '.frame', 'utf-8', function(err, data){
    if(err){
      console.log(err);
      return;
    }
    var byteArray = [];
    data = data.replace(/\n/g, '');
    for (var i = 0; i < data.length; i++) {
      var character = data[i];
      if(character==='M'){
        var x = (i%16);
        var y = ~~(i/16);
        byteArray.push((y<<4)+x);
      }
      if(character==='/'){
        break;
      }
    };
    createSprite(file.replace('.frame', ''), byteArray);
  });
};

transformSprite('ninja_run_01');
