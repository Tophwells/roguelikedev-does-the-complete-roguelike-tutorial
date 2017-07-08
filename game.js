var Game = {
    display: null,
	
	//size of screen
	screenWidth: 20,
	screenHeight: 20,
	
	mapWidth: 80,
	mapHeight: 80,
	
	xOffset: 0,
	yOffset: 0,
 
    init: function() { //called in index.html when the game loads
		
		var canvasExists = this.performCanvasSetup();
		if (!canvasExists)
		{
			return false;
		}
		this.drawEverything = function() {
			this.xOffset = this.player._x - 10;
			this.yOffset = this.player._y - 10;
			this.drawWholeMap();
			this.player.draw();
		}
		

		this.drawWholeMap = function() {

			var xMin = this.xOffset;
			var yMin = this.yOffset;
			var xMax = this.xOffset + this.screenWidth;
			var yMax = this.yOffset + this.screenHeight;
			
			for (var x = xMin; x < xMax; x++)
			{
				for (var y = yMin; y < yMax; y++)
				{
					if (this.map[x+","+y] == 1) //wall
					{
						this.draw(x, y, " ", "#000", "#fff");
					}
					else if (this.map[x+","+y] == 0) //floor
					{
						this.draw(x, y, ".", "#fff", "#000");
					}
					else if (this.map[x+","+y] == undefined) //out of bounds, or undefined for some reason
					{
						this.draw(x, y, "#", "#fff", "#888");
					}
				}
			}
		}
		
		this.draw = function(x,y,ch,fg,bg) {
			this.display.draw(x-this.xOffset, y-this.yOffset, ch, fg, bg);
		}
		
		
		//generate map
		this.generateMap();
		this.player = new Player(30,20);
		this.drawEverything();

		
		//update loop
		document.addEventListener("keydown", function(e) { //TODO: figure out what the best behaviour is if the user has something on the page selected
			//var a = performance.now();
			var code = e.keyCode;
			if (code == ROT.VK_UP)
				Game.player.move(0,-1);
			if (code == ROT.VK_DOWN)
				Game.player.move(0,1);
			if (code == ROT.VK_LEFT)
				Game.player.move(-1,0);
			if (code == ROT.VK_RIGHT)
				Game.player.move(1,0);
			Game.drawEverything();
			//console.log(performance.now() - a);
		});
    }
}