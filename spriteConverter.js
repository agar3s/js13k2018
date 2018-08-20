var fs = require('fs');
var dir = './assets';

//assuming sprites with 16X16 dimmension
var cols = 16;
var rows = 16;

function main(cb){
  fs.readdir(dir, function(err, files){
    var sprites = [];
    if (err) throw err;
    files.forEach(function(filename){
      if(filename.indexOf('.sprite') === -1) return;
      var file = fs.readFileSync(dir+'/'+filename, 'utf-8');
      var res = processFile(filename, file);
      //sprites = sprites.concat(processFile(filename, file));
    });

    //var result = joinSprites(sprites);
    return cb('nothing yet');
  });
};

function copyArray(array){
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    newArray.push(array[i]);
  };
  return newArray;
}

function isEmptyLayer(sprite){
  var sum = 0;
  for (var i = 0; i < sprite.frames.length; i++) {
    sum+=sprite.frames[i].length;
  };
  return !sprite.key && !sum;
}

function processFile(name, rawSprite){
  rawSprite = rawSprite.replace(/\r\n/g, '\n');
  var indexOfAnimation = rawSprite.indexOf('\nAnimation:\n');
  var frames = rawSprite.substring(0, indexOfAnimation).split('//new Frame');
  var animations = rawSprite.substring(indexOfAnimation+12).split(',');
  
  return processSprite(name, copyArray(frames), animations);
};

function saveSprite(name, byteArray){
  var wstream = fs.createWriteStream('./assets/'+name);
  var buffer = new Buffer(byteArray);
  wstream.write(buffer);
  wstream.end();
}

function processSprite(name, frames, animations){
  for (var i = 0; i < frames.length; i++) {
    frames[i] = encodeFrame(frames[i]);
  };
  
  var animres = buildDiffArray(frames, animations);
  
  var fullAnimation = [];
  animres.forEach(function(data){
    fullAnimation = fullAnimation.concat([...data]).concat([0x01]);
  });
  fullAnimation.splice(fullAnimation.length-1, 1);
  saveSprite(name.replace('.sprite', '.bs'), fullAnimation);

  return {
    name: name.replace('.sprite', ''),
    key: frames[0],
    frames: animres
  };
}

function encodeFrame(frame){
  var byteArray = [];
  var encoded = '';
  var data = frame.replace(/\n/g, '');
  for (var i = 0; i < data.length; i++) {
    var character = data[i];
    if(character==='M'){
      var x = (i%cols);
      var y = ~~(i/rows);
      byteArray.push((y<<4)+x);
    }
    if(character==='/'){
      break;
    }
  };
  

  return byteArray;

};

function buildDiffArray(encodedFrames, animations){
  var diffArray = [];
  var arrangedFrames = [];
  for (var i = 0; i < animations.length; i++) {
    arrangedFrames.push(encodedFrames[animations[i]]);
  };
  // starting frame
  diffArray.push(arrangedFrames[0]);
  for (var j = 1; j < arrangedFrames.length; j++) {
    var diffElement = [];
    for (var k = arrangedFrames[j].length - 1; k >= 0; k--) {
      if(arrangedFrames[j-1].indexOf(arrangedFrames[j][k])==-1){
        diffElement.push(arrangedFrames[j][k]);
      }
    };
    for (var k = arrangedFrames[j-1].length - 1; k >= 0; k--) {
      if(arrangedFrames[j].indexOf(arrangedFrames[j-1][k])==-1){
        diffElement.push(arrangedFrames[j-1][k]);
      }
    };
    diffArray.push(diffElement);
  };
  return diffArray;
};


function joinSprites(sprites){
  var keyFrames = {};
  var frames = [''];
  var animations = {};

  for (var i = 0; i < sprites.length; i++) {
    var sprite = sprites[i];
    if(!keyFrames[sprite.key]){
      keyFrames[sprite.key] = sprite.name;
    };
    var kf = sprite.name;
    var f = [];
    for (var j = 0; j < sprite.frames.length; j++) {
      var nFrame = sprite.frames[j];
      var index = frames.indexOf(nFrame);
      
      if(index==-1){
        frames.push(nFrame);
        index = frames.length - 1;
      }
      f.push(index);
    };

    animations[sprite.name] = {
      kf: keyFrames[sprite.key],
      f: f
    }
  };

  return asTemplate(keyFrames, frames, animations);
}

function asTemplate(keyFrames, frames, animations){
  var variablesAsCode = '';
  var keyCodes = Object.keys(keyFrames);
  for (var i = 0; i < keyCodes.length; i++) {
    var value = keyCodes[i];
    var name = keyFrames[value];
    variablesAsCode+= "var "+name+" = '"+ value.replace(/\\/g, "\\\\").replace(/'/g, "\\'")+"';\n"
  };
  var framesAsCode = 'var frames = [\n';
  for (var i = 0; i < frames.length; i++) {
    framesAsCode += "  '"+frames[i].replace(/\\/g, "\\\\").replace(/'/g, "\\'")+"', // "+i+'\n'
  };
  framesAsCode += '];\n';

  var animationsAsCode = 'var animations = {\n'
  var animationKeys = Object.keys(animations);
  for (var i = 0; i < animationKeys.length; i++) {
    var key = animationKeys[i];
    var value = animations[key];
    animationsAsCode += '  ' + key + ': {\n';
    animationsAsCode += '    kf: ' + value.kf + ',\n';
    animationsAsCode += '    f: [' + value.f + ']\n';
    animationsAsCode += '  },\n';
  };
  animationsAsCode += '};'

  return variablesAsCode + '\n' + framesAsCode + '\n' + animationsAsCode;
}

main(function(script){
  fs.writeFile('./src/generatedSprites.js', script, function(err){
    if(err){
      console.log('exception:', err);
      return;
    }
    console.log('file created');
  });
});