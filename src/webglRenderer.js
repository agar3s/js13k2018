// src/webglRenderer.js
var glprops = {preserveDrawingBuffer: true};
var gl = g.getContext('webgl', glprops) || g.getContext('experimental-webgl', glprops);

// webgl setup
gl.viewport(0, 0, 640, 480);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1.0, -1.0,
  1.0, -1.0,
  -1.0,  1.0,
  -1.0,  1.0,
  1.0, -1.0,
  1.0,  1.0
]), gl.STATIC_DRAW);

var badColorShader = glCreateShader(STATIC_VERT, BADCOLOR_FRAG);
gl.uniform2f(glUniformLocation(badColorShader, 'dim'), 640, 480);

