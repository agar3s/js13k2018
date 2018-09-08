// src/tiles.js

function Tile(props) {
  var base = Sprite([props[0], props[1], 41]);
  base.frame = base.animation[props[2]];
  base.color = '#ddfed9';
  base.pixelSize = 2;
  var extended = {
    update: function(){}
  }
  extendFunction(base, extended);
  return extended;
}

