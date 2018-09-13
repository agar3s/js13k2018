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

var basePunchSound = [3,0.38,0.26,0.33,0.81,0.2,0.09,0.62,-0.6799,0.06,0.87,,0.67,0.42,-0.324,,-0.86,-0.88,0.33,-0.78,0.2,0.29,-0.64,0.6];
var punchSounds = mutates(basePunchSound, 3);
var baseHitSound = [3,0.0016,0.1344,,0.1768,0.559,0.0332,-0.4474,-0.0545,0.0188,,-0.0954,,0.1008,-0.0342,,-0.0528,0.0403,0.9406,0.0121,,0.3799,0.0431,0.4];
var hitSound = mutates(baseHitSound, 3);
var jumpSound = audio([0,0.1,0.15,,0.29,0.11,0.04,0.1,0.1,0.25,,0.2199,0.1,0.36,0.26,0.08,0.06,,0.99,0.02,0.16,0.15,-0.72,0.29]);
var powerup = audio([1,,0.3504,,0.3541,0.385,,0.2852,,,,,,,,0.6757,,,1,,,,,0.5]);

