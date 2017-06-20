var Game = {
    display: null,
 
    init: function() {
		var w = 60;
		var h = 40;
		
		//perform canvas setup
		var options = {
			width: w,
			height: h,
			fontSize: 14,
			forceSquareRatio:false
		}
		
		container = document.getElementById("GameContainer");
		if (!("ROT" in window))
		{
			container.innerHTML = "Error: rot.js has not been loaded.";
			return;
		}
		if (!ROT.isSupported())
		{
			container.innerHTML = "Error: Your browser does not support rot.js.";
			return;
		}
		container.innerHTML = "";
		
        this.display = new ROT.Display(options);
        container.appendChild(this.display.getContainer());
		
		//setup player
		var Player = function(x, y) {
			this._x = x;
			this._y = y;
			this._draw();
		}
		Player.prototype._draw = function() {
			Game.display.draw(this._x, this._y, "@", "#ff0");
		}
		
		//setup map generation
		this.map = [];
		for (var x = 0; x < w; x++)
		{
			this.map[x] = []; 
		}
		var mapCallback = function(x, y, value) {
        this.map[x][y] = value;
		}
		this.generateMap = function() {
			var cellular = new ROT.Map.Cellular(w, h,{topology: 4, born:[3,4], survive: [2,3,4]});
			cellular.randomize(0.5);
			cellular.create();
			cellular.create();
			cellular.create();
			cellular.set(30, 30, false); //empty spot for the player to start in
			cellular.connect();
			cellular.serviceCallback(mapCallback.bind(this));
		}
		this.drawWholeMap = function() {
			for (var x = 0; x < w; x++)
			{
				for (var y = 0; y < h; y++)
				{
					if (this.map[x][y]) //wall
					{
						this.display.draw(x, y, " ", "#000000", "#ffffff");
					}
					else //floor
					{
						this.display.draw(x, y, ".", "#ffffff", "#000000");
					}
				}
			}
		}
		
		
		//generate map
		this.generateMap();
		this.drawWholeMap();
		this.player = new Player(30,30);
    }
}