
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
			// drop divs from sky, rotate & bounce
			TweenMax.from(next, 0.5, {opacity:0, scale:0, rotation:360, ease: Bounce.easeOut, y:-600});
		}

		function createColorDiv() {
			var div = document.createElement("div");
			div.style.backgroundColor = assignColor();
			return div;
		}
		// change button text
		document.getElementById("begin").value = "Screw this, I want better colors";

		createHeader();
	}
	else {
		for (var k = 0; k < divs.length; k++) {
			divs[k].style.backgroundColor = assignColor();
			// in place buttons refresh & bounce
			TweenMax.from(divs[k], 0.5, {opacity:0, scale:0, ease: Bounce.easeOut});

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
	// slide in title from left
	TweenMax.from(header, 1, {opacity:0, x:-800, ease:Elastic.eastOut}, 0.7);
}

begin();
