/*
* original script from @gre
* https://github.com/gre/behind-asteroids/blob/master/src/effects.sh
*/

function setFrameBuffer(param1, param2, shader,time,colors){
  glBindFBO(param1);
  glBindShader(shader);
  gl.uniform1i(glUniformLocation(shader, 'tex'), glBindTexture(param2, 0));
  if(time!=undefined){
    gl.uniform1f(glUniformLocation(shader, 'time'), time);
  }
  if(colors){
    gl.uniform3fv(glUniformLocation(shader, 'colors'),colors);
  }
  gl.drawArrays(gl.TRIANGLES, 0, 6);  
}

function drawPostProcessing (time) {
  glSetTexture(textureGame, c);

  var glitchTime = 1;
  setFrameBuffer(fbo1, textureGame, badColorShader, (time/180)%180, [1, 1, 1]);
 
  // Final draw
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.flush();
}
