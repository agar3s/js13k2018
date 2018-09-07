// 0: left, 1: right
const CHARACTER_SIDES = [-1, 1];
const PUNCHS = [13, 14];
const KICKS = [15, 16];

function Fighter(props) {
  var base = Character(props);
  var extended = {
    speed: 120,
    nextPunch: 0,
    nextKick: 0,
    updateData: function() {

    },
    run: function() {

    },
    jump: function() {
      console.log('jump');
      this.setAnimation(23);
    },
    kick: function() {
      if(this.status === 'punching') return;
      this.status = 'punching';
      this.setAnimation(KICKS[this.nextKick])
      this.nextKick++;
      if(this.nextKick==KICKS.length) this.nextKick = 0
    },
    punch: function() {
      if(this.status === 'punching') return;
      this.status = 'punching';
      this.setAnimation(PUNCHS[this.nextPunch])
      this.nextPunch++;
      if(this.nextPunch==PUNCHS.length) this.nextPunch = 0
    },
    catchActor: function() {

    },
    throwActor: function() {

    },
    move: function(side, dt) {
      if(this.status !== 'walking') {
        this.status = 'walking';
        this.setAnimation(17);
      }
      this.dx += CHARACTER_SIDES[side]*this.speed*dt;
      this.x = ~~(this.dx/this.pixelSize)*this.pixelSize;
      this.orientation = side;
    }
  };
  extendFunction(base, extended)
  return extended
}