function begin() {
	var btn = document.getElementById("begin");
	btn.addEventListener("click", populateColors());
}

function populateColors() {
	var menu = document.getElementById("menu");

	for (var i = 0; i < 63; i++) {
		var next = createColorDiv();
		next.className = "colors";
		menu.appendChild(next);
	}
	function createColorDiv() {
		var div = document.createElement("div");
		var color = assignColor();
		div.style.backgroundColor = color;
		return div;
	}
	function assignColor() {
		var hex = "#";
		colorArray = [1,5,9,"f"];
		for (var j=0; j < 6; j++) {
			var rando = Math.floor(Math.random()*colorArray.length);
			hex += colorArray[rando];
		}
		return hex;
	}
}


begin();
