// the frequency is the sixth value index 5

function mutates(sound,mutations){
  var sounds = [];
  for (var i = 0; i < mutations; i++) {
    var newSound = sound.slice();
    newSound[5] = (i-mutations/2)*0.05 + sound[5];
    sounds.push(audio(newSound))
  }
  return sounds;
}

var basePunchSound = [3,0.04,0.08,0.12,0.1777,0.41,0.05,-0.4399,0.28,,,-0.4399,,,,0.02,,,1,,0.18,0.1,,0.5];
var punchSounds = mutates(basePunchSound, 3);

