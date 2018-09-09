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
  {anim: FIGHTER_STATUS_IDS[17], loop: 0, end: 20}, // get hit legs
  {anim: FIGHTER_STATUS_IDS[18], loop: 1},  // knocked down
  {anim: FIGHTER_STATUS_IDS[19], loop: 0, end: 0},  // wake up
  {anim: FIGHTER_STATUS_IDS[20], loop: 0, end: 19}, // defeated
  {anim: FIGHTER_STATUS_IDS[21], loop: 1}, // reserved 1 - anim33
  {anim: FIGHTER_STATUS_IDS[22], loop: 1}, // reserved 2 - anim34
  {anim: FIGHTER_STATUS_IDS[23], loop: 1}, // reserved 3 - anim35
  {anim: FIGHTER_STATUS_IDS[24], loop: 1}, // reserved 4 - anim36
  {anim: FIGHTER_STATUS_IDS[25], loop: 1}, // reserved 5 - anim37
  {anim: FIGHTER_STATUS_IDS[26], loop: 1} // reserved 6 - anim38
];

const VELOCITIES = [60, 160];
const DAMAGE_VALUES = [
  1,    // 0 basic punch
  1.5,  // 1 basic kick
  4.1,    // 2 running punch
  1,    // 3 running kick
  2,    // 4 jump kick
  5     // 5 dragon kick
];

function Fighter(props) {
  var base = Character(props);
  var extended = {
    speed: 0,
    nextPunch: 0,
    nextKick: 0,
    status: FIGHTER_STATUS[0],
    statusIndex: 0,
    locked: false,
    freezeTime: 0,
    brakeSpeed: 0,
    baseSpeed: 0,
    previousSpeed: 0,
    speedY: 0,
    damageToApply: 0,
    onDamageTime: 0,
    continousComboDamage: 0,
    nextFlash: 0,
    removeMeNextTime: false,
    drawFrame: function() {
      if(this.hitPoints<0){
        var countdown = ~~(this.freezeTime*100);
        if(countdown<this.nextFlash) {
          this.nextFlash = countdown*0.8;
          return;
        }
      }

      for (var i = 0; i < this.frame.length; i++) {
        var coords = this.frame[i];
        graphics.fillStyle = this.color
        if(this.orientation == 1){
          graphics.fillRect(coords[0]*this.pixelSize, coords[1]*this.pixelSize, this.pixelSize, this.pixelSize);
          addPixelToCollisionMatrix(this.x + coords[0]*this.pixelSize, this.y +coords[1]*this.pixelSize, this.id, this.typeHit);
        }else{
          graphics.fillRect(14*this.pixelSize - coords[0]*this.pixelSize, coords[1]*this.pixelSize, this.pixelSize, this.pixelSize);
          addPixelToCollisionMatrix(this.x + 14*this.pixelSize - coords[0]*this.pixelSize, this.y +coords[1]*this.pixelSize, this.id, this.typeHit);
        }
      }
    },
    updateData: function(dt) {
      if(this.locked){
        this.freezeTime -= dt;
        if(this.freezeTime < 0) {
          this.locked = false;
          this.brakeSpeed = 0;
          this.baseSpeed = 0;
          this.speed = 0;

          if(this.hitPoints<0) {
            this.freezeTime = 2;
            this.locked = true;
            this.nextFlash = 180;
            if (this.removeMeNextTime) {
              return mainScene.remove(this);
            }
            this.removeMeNextTime = true;
          } else {
            this.animationEnds();
          }

        }
      }

      if(this.baseSpeed) {
        this.baseSpeed += this.brakeSpeed*dt;
        this.speed = this.baseSpeed;
      }

      if (this.y != 120) {
        this.speedY += 2500*dt;
        this.dy += this.speedY*dt;
        this.y = ~~(this.dy/this.pixelSize)*this.pixelSize;
        if(this.y>=120) {
          this.y = 120;
          this.speedY = 0;
          if(this.statusIndex!=18){
            this.setAnimation(12);
          }else {
            this.brakeSpeed = 0;
            this.baseSpeed = 0;
            this.speed = 0;
            this.typeHit = this.typeHit ^ 3;
            this.targetHit = this.targetHit ^ 3;
            this.setAnimation(20, true, 1);
          }
        }
      }


      if (this.speed) {
        this.dx += this.speed*dt;
        if(this.dx < -10){
          this.dx = -10;
        }else if(this.dx > mainScene.maxWidth-40){
          this.dx = mainScene.maxWidth-40;
        }
        this.x = ~~(this.dx/this.pixelSize)*this.pixelSize;
      } else {
        if (this.statusIndex==5) {
          this.setAnimation(0);
        } else if(this.statusIndex ===6) {
          this.setAnimation(7);
        }
        this.velocity = 0;
      }
    },
    jump: function() {
      if(this.locked) return;
      if(this.y != 120) return
      this.setAnimation(10);
      this.speedY -= 650;
      this.y -= this.pixelSize;
      play(jumpSound);
    },
    hit: function(animationIndex, damageValueIndex){
      if(this.locked) return true;
      var soundIndex = ~~(Math.random()*3);
      // running? super kick
      if(this.velocity === VELOCITIES[1]) {
        this.baseSpeed = CHARACTER_SIDES[this.orientation]*VELOCITIES[1]*0.8;
        this.brakeSpeed = -this.baseSpeed*0.1;
        if(this.y!=120) {
          this.setAnimation(14, true);
          this.damageToApply =  DAMAGE_VALUES[5];
        } else {
          this.setAnimation(animationIndex, true);
          this.damageToApply =  DAMAGE_VALUES[damageValueIndex];
        }
        play(punchSounds[soundIndex]);
        return true;
      }
      // jump kick
      if (this.y!=120) {
        this.setAnimation(13, true);
        play(punchSounds[soundIndex]);
        this.damageToApply =  DAMAGE_VALUES[4];
        return true;
      }

      return false;
    },
    kick: function() {
      if(this.hit(9, 2)) return;

      // idle kick
      if(this.statusIndex === 3 || this.statusIndex === 4) return;
      if(this.statusIndex !== 0 && this.statusIndex !== 5) return;

      this.setAnimation(KICKS[this.nextKick]);
      this.nextKick++;
      this.speed = 0;
      this.damageToApply =  DAMAGE_VALUES[1];
      if(this.nextKick === KICKS.length) this.nextKick = 0
      play(punchSounds[~~(Math.random()*3)]);
    },
    punch: function() {
      if(this.hit(8, 2)) return;

      // idle punch
      if(this.statusIndex === 1 || this.statusIndex === 2) return;
      if(this.statusIndex !== 0 && this.statusIndex !== 5) return;

      this.setAnimation(PUNCHS[this.nextPunch]);
      this.nextPunch++;
      this.speed = 0;
      this.damageToApply =  DAMAGE_VALUES[0];
      play(punchSounds[~~(Math.random()*3)]);
      if(this.nextPunch === PUNCHS.length) this.nextPunch = 0
    },
    move: function(side) {
      if(this.locked) return;
      if((this.statusIndex !==5&&this.statusIndex !=6&&this.statusIndex!=7)&&this.y==120) {
        this.setAnimation(5);
      }
      this.velocity = this.velocity!=0?this.velocity:VELOCITIES[0];
      this.speed = CHARACTER_SIDES[side]*this.velocity;
    },
    run: function() {
      this.setAnimation(6);
      this.velocity = VELOCITIES[1];
    },
    turnSide: function() {
      this.orientation ^= 1;
    },
    setAnimation: function(statusIndex, lock, freezeTime) {
      this.statusIndex = statusIndex
      this.status = FIGHTER_STATUS[statusIndex];
      this.animation = animations[this.status.anim];
      this.collisionAnimation = collisionAnimations[this.status.anim];
      this.animIndex = 0;
      if (lock) {
        this.freezeTime = freezeTime || this.animation.length/20;
        this.locked = true;
      }
    },
    animationEnds: function() {
      if(this.status.loop || this.locked) return;
      this.colliding = false;
      this.setAnimation(this.status.end)
    },
    setDamage: function(damage, y, kickerOrientation) {
      if(this.colliding) return false;
      if(this.locked) return false;
      if(this.statusIndex===18) return false;
      this.colliding = true;

      var impactOnY = (y - this.y)/this.pixelSize;
      var nextStatus = 0;
      var factor = 1;
      var throwHit = false;
      var throwHeight = 0;
      var throwDistance = 1;

      if(impactOnY <= 6){
        // impact on face
        nextStatus = 15;
        factor = 2;
      }else if(impactOnY <= 11) {
        nextStatus = 16;
        // impact on body
        factor = 1;
      }else {
        nextStatus = 17;
        // impact on legs
        factor = 0.6;
        throwHit = true;
        throwHeight = 100;
        throwDistance = 0.5;
      }
      
      play(hitSound[~~(Math.random()*3)]);
      // check damage on combo      
      if(+new Date() - this.onDamageTime < 350) {
        // connect combo
        this.continousComboDamage++;
        factor += this.continousComboDamage*0.1;
        if(this.continousComboDamage>3 && factor*damage>2){
          throwHit = true;
          throwHeight = 200;
        }
      }else {
        this.continousComboDamage = 0;
      }
      if(factor*damage>4) {
        throwHeight = 100;
        throwHit = true;
        throwDistance = 2;
      }
      this.onDamageTime = + new Date();

      // calculate damage
      this.hitPoints -= factor*damage;

      if(this.hitPoints<0) {
        throwHit = true;
        throwHeight = 300;
      }

      if (throwHit) {
        nextStatus = 18;
        this.baseSpeed = -CHARACTER_SIDES[kickerOrientation]*VELOCITIES[1]*throwDistance;
        this.brakeSpeed = -this.baseSpeed*2;
        this.speedY -= 200 + throwHeight;
        this.y -= this.pixelSize;
        this.setAnimation(nextStatus, true, 1);
        this.typeHit = this.typeHit ^ 3;
        this.targetHit = this.targetHit ^ 3;
      } else {
        this.speed = 0;
        this.setAnimation(nextStatus, true);
      }

      if(!this.human) {
        enemyId.setText(this.id);
        enemyId.color = this.color;
        enemyPunched = this;
      }
      return true;
    },
    damage: function(target, y) {
      var orientation = this.x > target.x ? 1: 0;
      return target.setDamage(this.damageToApply || 2, y, orientation);
    }
  };
  extendFunction(base, extended)
  return extended
}