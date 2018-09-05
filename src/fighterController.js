
function CharacterController(props) {
  return {
    fighter: props[0],
    update: function(dt) {}
  }
}

function PlayerController(props) {
  var base = CharacterController(props);
  var controller = {
    update: function(dt) {
      var fighter = this.fighter;
      // move to the left
      if(keyMap&keys[inputs.LEFT]) {
        fighter.move(0, dt);
      }

      // move to the right
      if(keyMap&keys[inputs.RIGHT]) {
        fighter.move(1, dt);
      }
      
      // I don't know
      if(keyMap&keys[inputs.ENTER]) {
        fighter.orientation ^= 1;
      }
      
      // punch
      if(keyMap&keys[inputs.PUNCH]) {
        fighter.punch();
      }
      
      // kick
      if(keyMap&keys[inputs.KICK]) {
        fighter.kick();
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
    actionPipeline: [['move', 0, 1],['punch', 0, 0.2],['move', 1, 1],['kick', 0, 0.2]],
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
      this.fighter[this.currentAction[0]](this.currentAction[1], dt);
    }
  }
  extendFunction(base, controller)
  return controller
}