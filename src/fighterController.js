
function CharacterController(props) {
  return {
    fighter: props[0],
    update: function(dt) {}
  }
}

function PlayerController(props) {
  var base = CharacterController(props);
  base.fighter.human = true;
  base.fighter.hitPoints = basePlayerStat.maxHp;
  base.fighter.targetHit = 1;
  base.fighter.typeHit = 2;
  base.fighter.orientation = 1;
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
      if(levelUpScene.active) return this.controlInterface(time, dt);
      if(mainScene.moving){
        this.fighter.speed = 0;
        return;
      }
      var fighter = this.fighter;
      if(fighter.locked) return;
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

          if (this.simpleTurnMode&&fighter.orientation==1) {
            fighter.turnSide();
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
          if(this.simpleTurnMode && fighter.orientation==0){
            fighter.turnSide();
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
    },
    controlInterface: function(time, dt) {
      if(keyMap&keys[inputs.RIGHT]) {
        if(!this.previousStateKey.right){
          this.previousStateKey.right = true;
          levelUpScene.setOption(levelUpScene.indexOption+1);
        }
      } else {
        this.previousStateKey.right = false;
      }

      if(keyMap&keys[inputs.LEFT]) {
        if(!this.previousStateKey.left){
          this.previousStateKey.left = true;
          levelUpScene.setOption(levelUpScene.indexOption-1);
        }
      } else {
        this.previousStateKey.left = false;
      }

      if((keyMap&keys[inputs.PUNCH]) || (keyMap&keys[inputs.KICK])) {
        levelUpScene.applyStat();
        levelUpScene.active = false;
        hudScene.active = true;
        player.locked = false;
      }
    }
  }
  extendFunction(base, controller)
  return controller
}

function AIController(props) {
  var base = CharacterController(props);
  var actions = [
    base.fighter.move,
    base.fighter.run,
    base.fighter.jump,
    base.fighter.turnSide,
    base.fighter.punch,
    base.fighter.kick
  ];


  function getDistanceToPlayer(fighter){
    return Math.abs(fighter.x - player.x);
  }
  function getOrientationToPlayer(fighter) {
    return fighter.x - player.x < 0 ? 1: 0;
  }
  function closeDistance(fighter) {
    var distance = getDistanceToPlayer(fighter);
    if(distance>24 && distance<300) {
      var orientation = getOrientationToPlayer(fighter);
      if(fighter.orientation!=orientation){
        fighter.turnSide()
      }
      fighter.move(orientation);
    }
    return distance>=24;
  }
  function punch(fighter) {
    fighter.punch();
    return true;
  }

  function kick(fighter) {
    fighter.kick();
    return true;
  }

  function runToSpecial(fighter) {
    var distance = getDistanceToPlayer(fighter);
    if(distance>270) return false;
    if(!fighter.running)fighter.run();
    fighter.running = true;
    fighter.move();
    return distance>60;
  }

  function runToSpecialAlert(fighter) {
    var distance = getDistanceToPlayer(fighter);
    if(distance>270) return false;
    if(!fighter.running)fighter.run();
    fighter.running = true;
    fighter.move();
    if(distance < 70 && player.velocity>100) {
      fighter.jump();
      return false;
    }
    return distance>60;
  }

  function runToClose(fighter) {
    var distance = getDistanceToPlayer(fighter);
    if(distance>270) return false;
    if(!fighter.running)fighter.run();
    fighter.running = true;
    fighter.move();
    return distance>24;
  }

  function runToCloseAlert(fighter) {
    var distance = getDistanceToPlayer(fighter);
    if(distance>270) return false;
    if(!fighter.running)fighter.run();
    fighter.running = true;
    fighter.move();

    if(distance < 70 && player.velocity>100) {
      fighter.jump();
      return false;
    }

    return distance>24;
  }

  function resetRun(fighter) {
    fighter.running = false;
    return false;
  }

  function takeDistance(fighter){
    var distance = getDistanceToPlayer(fighter);
    if(distance>10 && distance<120) {
      var orientation = getOrientationToPlayer(fighter);
      fighter.move(orientation^1);
    }
    return true;
  }
  function wait(){return true;}

  function alert(fighter) {
    var distance = getDistanceToPlayer(fighter);
    var orientation = getOrientationToPlayer(fighter);
    if(fighter.orientation!=orientation){
      fighter.turnSide();
    }
    if(distance < 60 && player.velocity>100) {
      fighter.jump();
      return false;
    }else if(distance<40){
      fighter.kick();
    }
    return true;
  }

  var basicPuncher = [[closeDistance, 1.5], [wait, 0.1], [punch, 0.5], [wait, 0.1], [takeDistance, 1]];
  var basicKicker =  [[closeDistance, 1.4], [wait, 0.1], [kick, 1], [wait, 0.2], [takeDistance, 0.5]];
  var fasterPuncher = [[closeDistance, 0.2], [punch, 0.1], [kick, 0.1], [wait, 0.3], [closeDistance, 0.1], [runToSpecial, 1], [punch, 0.3], [wait, 1], [closeDistance, 0.1], [punch, 0.5], [takeDistance, 0.8], [resetRun, 0.1], [wait, 0.5]];
  var fasterKicker = [[closeDistance, 0.2], [kick, 0.3], [wait, 0.4], [closeDistance, 0.2], [runToSpecial, 0.6], [closeDistance, 0.1],[kick, 0.3], [wait, 0.6], [closeDistance, 0.1],[kick, 0.5], [takeDistance, 1], [resetRun, 0.1], [wait, 0.6]];
  var jumper = [[alert, 1.5], [punch, 0.3], [closeDistance, 0.2],[wait, 0.2], [punch, 0.3],[takeDistance, 0.4], [wait, 0.3], [closeDistance, 0.5]];
  var aggressive = [[alert, 1.7], [closeDistance, 0.2], [alert, 0.5], [runToClose, 1], [wait, 0.1], [closeDistance, 0.1], [punch, 1], [closeDistance, 0.1],[kick,1], [closeDistance, 0.1], [takeDistance, 0.5], [resetRun, 0.1], [closeDistance, 0.1], [punch, 1]];
  
  var aggressiveA = [[closeDistance, 0.1], [alert, 0.6], [runToCloseAlert, 0.6], [closeDistance, 0.1], [alert, 0.6], [resetRun, 0.1], [runToSpecialAlert, 0.6], [punch, 0.6], [takeDistance, 0.5],[closeDistance, 0.1], [kick, 0.8], [resetRun, 0.1]];
  
  var aggressiveS = [[closeDistance, 0.1], [runToSpecialAlert, 0.6], [closeDistance, 0.1], [kick, 1], [resetRun, 0.1], [closeDistance, 0.1], [runToSpecialAlert, 1], [closeDistance, 0.1], [punch, 1], [resetRun, 0.1]];

  var heuristics = [basicPuncher, basicKicker, fasterPuncher, fasterKicker, jumper, aggressive, aggressiveA, aggressiveS];

  var controller = {
    id: (Math.random()).toString(16),
    time: 0,
    indexAction: 100,
    nextActionTime: 0,
    currentAction: [],
    actionPipeline: heuristics[props[1] || 0],
    programNextAction: function(){
      this.indexAction++;
      if(this.indexAction >= this.actionPipeline.length) {
        this.indexAction = 0;
      }
      this.currentAction = this.actionPipeline[this.indexAction];
      this.nextActionTime = this.currentAction[1];
      this.time = 0;
    },
    update: function(time, dt) {
      if(mainScene.moving){
        this.fighter.speed = 0;
        return;
      }
      if(this.fighter.locked) return;
      this.fighter.speed = 0;
      this.time += dt;
      if(this.time > this.nextActionTime) {
        this.programNextAction();
      }
      var result = this.currentAction[0](this.fighter, dt);
      if(!result) this.programNextAction();
    }
  }
  extendFunction(base, controller)
  return controller
}
