
function begin() {
	var btn = document.getElementById("begin");
	btn.addEventListener("click", function() {
		populateColors();
	});
	
}

function populateColors() {
	var menu = document.getElementById("menu");
	var divs = menu.getElementsByTagName("div");

	// set if for first-time run
	if (divs.length === 0) {
		for (var i = 0; i < 63; i++) {
			var next = createColorDiv();
			next.className = "colors";
			menu.appendChild(next);
			TweenLite.from(next, 0.5, {opacity:0, scale:0, ease: Bounce.easeOut});
		}

		function createColorDiv() {
			var div = document.createElement("div");
			div.style.backgroundColor = assignColor();
			return div;
		}
		document.getElementById("begin").value = "Screw this, I want better colors";
		createHeader();
	}
	else {
		for (var k = 0; k < divs.length; k++) {
			divs[k].style.backgroundColor = assignColor();
		}
	}

	function assignColor() {
		var hex = "#";
		colorArray = [1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
		for (var j=0; j < 6; j++) {
			var rando = Math.floor(Math.random()*colorArray.length);
			hex += colorArray[rando];
		}
		return hex;
	}
}

function createHeader() {

	var header = document.getElementById("header");
	header.innerHTML = "Choose A Color";
}

begin();
