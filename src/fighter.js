// 0: left, 1: right
const CHARACTER_SIDES = [-1, 1];
const PUNCHS = [1, 2];
const KICKS = [3, 4];

const FIGHTER_STATUS_IDS = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];

const FIGHTER_STATUS = [
  {anim: FIGHTER_STATUS_IDS[0], loop: 1},           // idle
  {anim: FIGHTER_STATUS_IDS[1], loop: 0, end: 0},   // punch 01 - ground
  {anim: FIGHTER_STATUS_IDS[2], loop: 0, end: 0},   // punch 02 - ground
  {anim: FIGHTER_STATUS_IDS[3], loop: 0, end: 0},   // kick 01 - ground
  {anim: FIGHTER_STATUS_IDS[4], loop: 0, end: 0},   // kick 02 - ground
  {anim: FIGHTER_STATUS_IDS[5], loop: 1},           // walk - ground
  {anim: FIGHTER_STATUS_IDS[6], loop: 1},           // run 01  - anim18
  {anim: FIGHTER_STATUS_IDS[7], loop: 0, end: 0},   // run 02  - anim19
  {anim: FIGHTER_STATUS_IDS[8], loop: 0, end: 0},   // punch running
  {anim: FIGHTER_STATUS_IDS[9], loop: 0, end: 0},   // kick running
  {anim: FIGHTER_STATUS_IDS[10], loop: 0, end: 11}, // jump start - anim 22
  {anim: FIGHTER_STATUS_IDS[11], loop: 1},          // jump idle  - anim 23
  {anim: FIGHTER_STATUS_IDS[12], loop: 0, end: 0},  // jump land  - anim 24
  {anim: FIGHTER_STATUS_IDS[13], loop: 0, end: 11}, // jump kick
  {anim: FIGHTER_STATUS_IDS[14], loop: 1},          // jump-running kick
  {anim: FIGHTER_STATUS_IDS[15], loop: 0, end: 0},  // get hit face
  {anim: FIGHTER_STATUS_IDS[16], loop: 0, end: 0},  // get hit body
  {anim: FIGHTER_STATUS_IDS[17], loop: 0, end: 18}, // get hit legs
  {anim: FIGHTER_STATUS_IDS[18], loop: 1},          // knocked down
  {anim: FIGHTER_STATUS_IDS[19], loop: 0, end: 0},  // wake up
  {anim: FIGHTER_STATUS_IDS[20], loop: 1}, // defeated
  {anim: FIGHTER_STATUS_IDS[21], loop: 1}, // reserved 1 - anim33
  {anim: FIGHTER_STATUS_IDS[22], loop: 1}, // reserved 2 - anim34
  {anim: FIGHTER_STATUS_IDS[23], loop: 1}, // reserved 3 - anim35
  {anim: FIGHTER_STATUS_IDS[24], loop: 1}, // reserved 4 - anim36
  {anim: FIGHTER_STATUS_IDS[25], loop: 1}, // reserved 5 - anim37
  {anim: FIGHTER_STATUS_IDS[26], loop: 1} // reserved 6 - anim38
];

const VELOCITIES = [80, 160];

function Fighter(props) {
  var base = Character(props);
  var extended = {
    speed: 120,
    nextPunch: 0,
    nextKick: 0,
    status: FIGHTER_STATUS[0],
    statusIndex: 0,
    locked: false,
    stunTime: 0,
    updateData: function(dt) {
      if(this.locked){
        this.stunTime -= dt;
        if(this.stunTime < 0) {
          this.locked = false;
          this.animationEnds();
        }
      }
      if (this.speed) {
        this.dx += CHARACTER_SIDES[this.orientation]*this.speed*dt;
        this.x = ~~(this.dx/this.pixelSize)*this.pixelSize;
      }else{
        if (this.statusIndex==5) {
          this.setAnimation(0);
        } else if(this.statusIndex ===6) {

        }
      }
    },
    run: function() {

    },
    jump: function() {
      if(this.locked) return;
      this.setAnimation(10);
    },
    kick: function() {
      if(this.locked) return;
      // idle kick
      if(this.statusIndex === 3 || this.statusIndex === 4) return;
      if(this.statusIndex !== 0 && this.statusIndex !== 5) return;

      this.setAnimation(KICKS[this.nextKick])
      this.nextKick++;
      this.speed = 0;
      if(this.nextKick === KICKS.length) this.nextKick = 0
    },
    punch: function() {
      if(this.locked) return;
      // idle punch
      if(this.statusIndex === 1 || this.statusIndex === 2) return;
      if(this.statusIndex !== 0 && this.statusIndex !== 5) return;

      this.setAnimation(PUNCHS[this.nextPunch])
      this.nextPunch++;
      this.speed = 0;
      if(this.nextPunch === PUNCHS.length) this.nextPunch = 0
    },
    catchActor: function() {

    },
    throwActor: function() {

    },
    move: function(side) {
      if(this.locked) return;
      if(this.statusIndex !== 5) {
        this.setAnimation(5);
      }
      this.orientation = side;
      this.speed = VELOCITIES[0];
    },
    setAnimation: function(statusIndex) {
      this.statusIndex = statusIndex
      this.status = FIGHTER_STATUS[statusIndex];
      this.animation = animations[this.status.anim];
      this.collisionAnimation = collisionAnimations[this.status.anim];
      this.animIndex = 0;
    },
    animationEnds: function() {
      if(this.status.loop || this.locked) return;
      this.colliding = false;
      this.setAnimation(this.status.end)
    },
    getDamageOn: function(y) {
      if(this.colliding) return
      if(this.locked) return
      this.colliding = true;
      this.hitPoints--;

      var impactOnY = (y - this.y)/this.pixelSize;
      var nextStatus = 0;
      if(this.hitPoints<0) {
        nextStatus = 18;
      }else if(impactOnY <= 6){
        // impact on face
        nextStatus = 15;
        this.stunTime = 0.3;
      }else if(impactOnY <= 11) {
        nextStatus = 16;
        this.stunTime = 0.3;
        // impact on body
      }else {
        // impact on legs
      }
      this.locked = true;
      this.speed = 0;
      this.setAnimation(nextStatus);
    },
  };
  extendFunction(base, extended)
  return extended
}