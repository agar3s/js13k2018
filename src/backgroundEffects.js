
var currentBackground = '#000';
function drawBackground() {
  graphics.save();
  graphics.clearRect(0, 0, 320, 240);
  graphics.fillStyle = currentBackground;
  graphics.fillRect(0, 0, 320, 240);
  graphics.restore();
}

var flashEffect = [0.015, '#fff', 0, 0];
function flash(color) {
  flashEffect = [0.02, color, 0, 1];
  currentBackground = color;
}

function updateBackgroud(dt) {
  if(flashEffect[3] === 0) return;
  flashEffect[2] += dt;
  if(flashEffect[2] >= flashEffect[0]) {
    flashEffect[3] = 0;
    currentBackground = '#000';
  }
}
