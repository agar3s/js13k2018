#!/bin/bash
# original script from @gre 
# https://github.com/gre/behind-asteroids/blob/master/scripts/concat.sh
echo "// larga vida al #js13k! "
# pre
cat src/pre.js
echo "const DEBUG=false;"

# definitions
cat src/definitions.js

# libs
cat lib/utils.js
cat lib/jsfxr.js
cat lib/audio.js
cat lib/webgl.js
cat lib/keyboardController.js

# shaders
cd dist;
for glsl in *.frag *.vert; do
  name=`echo $glsl | tr '.' '_' | tr '[:lower:]' '[:upper:]'`
  cat $glsl | ../scripts/wrapjs.sh $name
  echo
done
cd ..;

# game
cat src/generatedSprites.js
cat src/spriteLoader.js
cat src/gameObject.js
cat src/sounds.js

cat src/player.js
cat src/canvasRenderer.js
cat src/webglRenderer.js
cat src/effects.js
cat src/gameloop.js
cat src/post.js
