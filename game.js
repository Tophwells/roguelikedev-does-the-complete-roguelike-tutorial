var Game = {
    display: null,
 
	w: 40,
	h: 30,
 
    init: function() { //called in index.html when the game loads
		
		var canvasExists = this.performCanvasSetup();
		if (!canvasExists)
		{
			return false;
		}
		this.drawEverything = function() {
			this.drawWholeMap();
			this.player.draw();
		}
		this.drawWholeMap = function() {
			for (var x = 0; x < this.w; x++)
			{
				for (var y = 0; y < this.h; y++)
				{
					if (this.map[x+","+y]) //wall
					{
						this.display.draw(x, y, " ", "#000", "#fff");
					}
					else //floor
					{
						this.display.draw(x, y, ".", "#fff", "#000");
					}
				}
			}
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