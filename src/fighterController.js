
function CharacterController(props) {
  return {
    fighter: props[0],
    update: function(dt) {}
  }
}

function PlayerController(props) {
  var base = CharacterController(props);
  base.fighter.human = true;
  base.fighter.targetHit = 1;
  base.fighter.typeHit = 2;
  base.lastTime = {
    left: 0,
    right: 0
  };
  base.previousStateKey = {
    left: false,
    right: false
  };

  var controller = {
    update: function(time, dt) {
      var fighter = this.fighter;
      fighter.speed = 0;
      var hitLock = false;
      // punch
      if(keyMap&keys[inputs.PUNCH]) {
        fighter.punch();
        hitLock = fighter.y == 120;
      }
      
      // kick
      if(keyMap&keys[inputs.KICK]) {
        fighter.kick();
        hitLock = fighter.y == 120;
      }

      // move to the left
      if(!hitLock) {
        if(keyMap&keys[inputs.LEFT]) {

          if(!this.previousStateKey.left) {
            if(fighter.orientation==0 && time-this.lastTime.left<300){
              fighter.run();
            }else if(fighter.orientation==1 && time-this.lastTime.left<1000){
              fighter.turnSide();
            }
          }
          
          fighter.move(0);

          this.lastTime.left = time;
          this.previousStateKey.left = true;
          this.previousStateKey.right = true;
        } else {
          this.previousStateKey.left = false;
        }

        // move to the right
        if(keyMap&keys[inputs.RIGHT]) {
          if(!this.previousStateKey.right) {
            if(fighter.orientation==1 && time-this.lastTime.right<300){
              fighter.run();
            } else if(fighter.orientation==0 && time-this.lastTime.right<1000){
              fighter.turnSide();
            }
          }
          fighter.move(1);

          this.lastTime.right = time;
          this.previousStateKey.right = true;
          this.previousStateKey.left = true;
        } else {
          this.previousStateKey.right = false;
        }
      }
      
      // I don't know
      if(keyMap&keys[inputs.ENTER]) {
        fighter.orientation ^= 1;
      }
      
      // jump
      if(keyMap&keys[inputs.JUMP]) {
        fighter.jump();
      }
    }
  }
  extendFunction(base, controller)
  return controller
}

function AIController(props) {
  var base = CharacterController(props);
  var controller = {
    time: 0,
    indexAction: 0,
    nextActionTime: 0,
    currentAction: [],
    actionPipeline: [[base.fighter.move, 0, 0.5],[base.fighter.punch, 0, 1],[base.fighter.move, 1, 0.5],[base.fighter.kick, 0, 1]],
    update: function(time, dt) {
      var fighter = this.fighter;
      this.time += dt;
      if(this.time > this.nextActionTime) {
        this.indexAction++;
        if(this.indexAction >= this.actionPipeline.length) {
          this.indexAction = 0;
        }
        this.currentAction = this.actionPipeline[this.indexAction];
        this.nextActionTime = this.currentAction[2];
        this.time = 0;
      }
      this.currentAction[0].bind(fighter)(this.currentAction[1], dt);
    }
  }
  extendFunction(base, controller)
  return controller
}
