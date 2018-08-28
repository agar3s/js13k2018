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
      sprites.push(res);
    });

    var result = joinSprites(sprites);
    return cb(result);
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
  fs.writeFile('./assets/'+name, byteArray.join(''), function (err){
    if(err){
      console.log('exception:', err);
      return;
    }
    console.log('file created');
  });
  
}

function processSprite(name, frames, animations){
  for (var i = 0; i < frames.length; i++) {
    frames[i] = encodeFrame(frames[i]);
  };
  
  var animres = buildDiffArray(frames, animations);
  
  var fullAnimation = [];
  animres.main.forEach(function(data){
    fullAnimation = fullAnimation.concat([...data]).concat(['01']);
  });
  fullAnimation.splice(fullAnimation.length-1, 1);
  fullAnimation = fullAnimation.concat(['02'])
  animres.collision.forEach(function(data){
    fullAnimation = fullAnimation.concat([...data]).concat(['01']);
  });
  fullAnimation.splice(fullAnimation.length-1, 1);
  //saveSprite(name.replace('.sprite', '.bs'), fullAnimation);

  return {
    name: name.replace('.sprite', ''),
    frames: fullAnimation
  };
}

function encodeFrame(frame){
  var mainFrameByteArray = [];
  var collisionFrameByteArray = [];
  var encoded = '';
  var data = frame.replace(/\n/g, '');
  for (var i = 0; i < data.length; i++) {
    var character = data[i];
    if(character==='M' || character==='C'){
      var x = (i%cols);
      var y = ~~(i/rows);
      //encode the value as an hexadecimal code 
      // yx
      var code = ((y<<4)+x).toString(16);
      if(code.length==1) code = `0${code}`

      if(character==='M') {
        mainFrameByteArray.push(code);
      }else {
        collisionFrameByteArray.push(code);
      }
    }
    if(character==='/'){
      break;
    }
  };
  

  return {
    main: mainFrameByteArray,
    collision: collisionFrameByteArray
  }

};

function buildDiffArray(encodedFrames, animations){
  var diffMainArray = [];
  var diffCollisionArray = [];
  var arrangedMainFrames = [];
  var arrangedCollisionFrames = [];
  console.log(encodedFrames)
  for (var i = 0; i < animations.length; i++) {
    arrangedMainFrames.push(encodedFrames[animations[i]].main);
    arrangedCollisionFrames.push(encodedFrames[animations[i]].collision);
  };
  // starting frame
  diffMainArray.push(arrangedMainFrames[0]);
  diffCollisionArray.push(arrangedCollisionFrames[0]);
  for (var j = 1; j < arrangedMainFrames.length; j++) {
    var diffMainElement = [];
    var diffCollisionElement = [];
    for (var k = arrangedMainFrames[j].length - 1; k >= 0; k--) {
      if(arrangedMainFrames[j-1].indexOf(arrangedMainFrames[j][k])==-1){
        diffMainElement.push(arrangedMainFrames[j][k]);
      }
    };
    for (var k = arrangedMainFrames[j-1].length - 1; k >= 0; k--) {
      if(arrangedMainFrames[j].indexOf(arrangedMainFrames[j-1][k])==-1){
        diffMainElement.push(arrangedMainFrames[j-1][k]);
      }
    };
    // check collider frames
    for (var k = arrangedCollisionFrames[j].length - 1; k >= 0; k--) {
      if(arrangedCollisionFrames[j-1].indexOf(arrangedCollisionFrames[j][k])==-1){
        diffCollisionElement.push(arrangedCollisionFrames[j][k]);
      }
    };
    for (var k = arrangedCollisionFrames[j-1].length - 1; k >= 0; k--) {
      if(arrangedCollisionFrames[j].indexOf(arrangedCollisionFrames[j-1][k])==-1){
        diffCollisionElement.push(arrangedCollisionFrames[j-1][k]);
      }
    };

    diffMainArray.push(diffMainElement);
    diffCollisionArray.push(diffCollisionElement);
  };
  return {
    main: diffMainArray,
    collision: diffCollisionArray
  };
};


function joinSprites (sprites) {
  var keyFrames = {};
  var frames = [''];
  var animations = {};

  var code = '// src/generatedSprites.js \n// sprites generated with npm run build-sprites\n';
  var lastCode = [];
  for (var i = 0; i < sprites.length; i++) {
    var sprite = sprites[i];
    code += `\nvar ${sprite.name} = '${sprite.frames.join('')}';`
    lastCode.push(sprite.name);
  };
  code+=`\nvar animations = [${lastCode}];\n`;

  return code;
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