//setup map generation
Game.map = {};
var mapCallback = function(x, y, value) {
Game.map[x+","+y] = value;
}
Game.generateMap = function() {
	var cellular = new ROT.Map.Cellular(this.w, this.h,{topology: 4, born:[3,4], survive: [2,3,4]});
	cellular.randomize(0.5);
	cellular.create();
	cellular.create();
	cellular.create();
	cellular.set(30, 20, false); //empty spot for the player to start in
	cellular.connect();
	cellular.serviceCallback(mapCallback.bind(this));
}