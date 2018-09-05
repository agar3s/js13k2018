
const DEBUG = true; // eslint-disable-line no-unused-vars

var _fps_ = new Stats();
var _processing_ = new Stats();
var _memory_ = new Stats();
var _enemies_ = new Stats();
var enemiesPanel = _enemies_.addPanel( new Stats.Panel( 'enemies', '#ff8', '#221' ) );
_fps_.dom.style.left = '0px';
_fps_.dom.style.top = '250px';
_processing_.dom.style.left = '100px';
_processing_.dom.style.top = '250px';
_memory_.dom.style.left = '200px';
_memory_.dom.style.top = '250px';
_enemies_.dom.style.left = '300px';
_enemies_.dom.style.top = '250px';
_fps_.showPanel(0);
_processing_.showPanel(1);
_memory_.showPanel(2);
_enemies_.showPanel(3);
document.body.appendChild(_fps_.dom);
document.body.appendChild(_processing_.dom);
document.body.appendChild(_memory_.dom);
document.body.appendChild(_enemies_.dom);
