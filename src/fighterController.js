
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
  var controller = {
    update: function(dt) {
      var fighter = this.fighter;
      fighter.speed = 0;
      var hitLaunched = false;
      // punch
      if(keyMap&keys[inputs.PUNCH]) {
        fighter.punch();
        hitLaunched = true;
      }
      
      // kick
      if(keyMap&keys[inputs.KICK]) {
        fighter.kick();
        hitLaunched = true;
      }

      // move to the left
      if(!hitLaunched) {
        if(keyMap&keys[inputs.LEFT]) {
          fighter.move(0);
        }

        // move to the right
        if(keyMap&keys[inputs.RIGHT]) {
          fighter.move(1);
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
    actionPipeline: [['move', 0, 1],['punch', 0, 1],['move', 1, 1],['kick', 0, 1]],
    update: function(dt) {
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
      fighter[this.currentAction[0]](this.currentAction[1], dt);
    }
  }
  extendFunction(base, controller)
  return controller
}
