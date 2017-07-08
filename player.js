Player = function(x, y) {
	this._x = x;
	this._y = y;
}
Player.prototype.draw = function() {
	Game.display.draw(this._x, this._y, "@", "#fff");
}

Player.prototype.move = function(xDelta, yDelta) {
	if (Math.abs(xDelta) + Math.abs(yDelta) != 1) //can't move more than one tile at a time
		return;
	
	var newX = this._x + xDelta;
	var newY = this._y + yDelta;
	if (newX < 0 || newX >= Game.w || newY < 0 || newY >= Game.h) //can't move out of bounds
		return;
	if (Game.map[newX+","+newY]) //can't move into a wall (this implies moving *out* of a wall is fine, but that should never happen)
		return;
	this._x = newX;
	this._y = newY;
	
}