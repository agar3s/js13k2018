#!/bin/bash
# original script from @gre 
# https://github.com/gre/behind-asteroids/blob/master/scripts/concat.sh
echo "// larga vida al #js13k! "
# pre
cat src/pre.js

# game
cat src/player.js
cat src/canvasRenderer.js
cat src/gameloop.js
cat src/post.js
