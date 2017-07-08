Game.performCanvasSetup = function() {
	var options = {
		width: this.w,
		height: this.h,
		fontSize: 14,
		forceSquareRatio:true,
		fontFamily: "Helvetica"
	}
	
	var container = document.getElementById("GameContainer");
	if (!("ROT" in window))
	{
		container.innerHTML = "Error: rot.js has not been loaded.";
		return false;
	}
	if (!ROT.isSupported())
	{
		container.innerHTML = "Error: Your browser does not support rot.js.";
		return false;
	}
	container.innerHTML = "";
	
	this.display = new ROT.Display(options);
	container.appendChild(this.display.getContainer());
	return true;
}