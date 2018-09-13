
function Pickable(props) {
  var base = Sprite([props[0], props[1], 30]);
  base.frame = base.animation[props[2]];
  base.pixelSize = 1;
  base.color = '#9bbc0f';
  base.type = 'pickable';
  base.colliding = false;
  base.collisionAnimation = collisionAnimations[30];
  base.collisionFrame = base.collisionAnimation[props[2]];
  base.targetHit = 3;
  var extended = {
    updateFrame: function(dt){},
    setHitArea: function() {
      addHitPixelToCollisionMatrix(this.x, this.y, this.id, this.targetHit);
      addHitPixelToCollisionMatrix(this.x+4, this.y+4, this.id, this.targetHit);
      addHitPixelToCollisionMatrix(this.x+8, this.y-4, this.id, this.targetHit);
      addHitPixelToCollisionMatrix(this.x+12, this.y+4, this.id, this.targetHit);
      addHitPixelToCollisionMatrix(this.x+16, this.y-4, this.id, this.targetHit);
    },
    update: function(dt) {
      this.collided = this.colliding;
      this.setHitArea();
    }
  };
  extendFunction(base, extended);
  return extended;
}

function Heart(props) {
  var base = Pickable([props[0], props[1], 6]);
  var extended = {
    affectFighter: function(fighter) {
      fighter.incrementHp(15);
      play(powerup);
    }
  };
  extendFunction(base, extended);
  return extended;
}

function Disquette(props) {
  var base = Pickable([props[0], props[1], 7]);
  var extended = {
    affectFighter: function(fighter) {
      //fighter.incrementHp(15);
      play(powerup);
      mainScene.displayLevelUpScene()
    }
  };
  extendFunction(base, extended);
  return extended;
}
