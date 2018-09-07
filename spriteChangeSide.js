var fs = require('fs');
var dir = './assets';

//assuming sprites with 16X16 dimmension
var cols = 16;
var rows = 16;

function main(){
  fs.readdir(dir, function(err, files){
    var sprites = [];
    if (err) throw err;
    files.forEach(function(filename){
      if(filename.indexOf('hero') === -1) return;
      var file = fs.readFileSync(dir+'/'+filename, 'utf-8');
      var rawSprite = file.replace(/\r\n/g, '\n');
      var indexOfAnimation = rawSprite.indexOf('\nAnimation:\n');
      var frames = rawSprite.substring(0, indexOfAnimation).split('//new Frame');
      var animations = rawSprite.substring(indexOfAnimation+12).split(',');
      
      var newFile = '';
      for (var i = 0; i < frames.length; i++) {
        var lines = frames[i].split('\n');
        for (var j = 0; j < lines.length; j++) {
          lines[j] = lines[j].split('').reverse().join('');
        }
        frames[i] = lines.join('\n');
      }
      frames = frames.join('//new Frame');
      newFile = frames + `\nAnimation:\n${animations}`;
      fs.writeFile('./assets/'+filename, newFile, function(err){
        if(err){
          console.log('exception saving file', err);
        }
        console.log(`file ${filename} replaced`)
      })
    });
  });
};

main();