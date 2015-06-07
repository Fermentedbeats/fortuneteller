// 1. game begins w/ offering  color pallete
function begin() {
	var btn = document.getElementById("begin");
	btn.addEventListener("click", function() {
		populateColors();
	});
}

function populateColors() {
	var menu = document.getElementById("menu");
	var divs = menu.getElementsByTagName("div");

	// create colors for first-time run
	if (divs.length === 0) {
		for (var i = 0; i < 70; i++) {
			var next = createColorDiv();
			next.className = "colors";
			menu.appendChild(next);
			// drop divs from sky, rotate & bounce
			TweenMax.from(next, 0.5, {opacity:0, scale:0, rotation:360, ease: Bounce.easeOut, y:-600});
		}

		function createColorDiv() {
			var div = document.createElement("div");
			var color = div.style.backgroundColor = assignColor();
			div.addEventListener("click", function() {
				findColorNum(color);
			});
			return div;
		}
		// change button text
		document.getElementById("begin").value = "Screw this, I want better colors";

		createChooseColorHeader();
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

function createChooseColorHeader() {
	var header = document.getElementById("header");
	header.innerHTML = "Choose A Color";
	// slide in title from left
	TweenMax.from(header, 1, {opacity:0, x:-800, ease:Elastic.eastOut}, 0.7);
}

// 2. color is chosen
// find num in hex and apply that to card spins + result
function findColorNum(color) {
	console.log("COLOR IS " + color)
	var colorNum;
	// iterate thru hex chars
	for (var m = 1; m < color.length; m++) {
		// if you have a hex letter instead of a num numTF is false
		var numTF = isNaN(color[m] * 1);
		//if you do have a num, assign it to the var colorNum
		if (!numTF) {
			colorNum = color[m];
			break;
		}
	}
	// if the hex contained no nums, generate a random num
	if (colorNum === undefined) {
		colorNum = Math.floor(Math.random()*6);
	}
	flipCard(colorNum);
}


function flipCard(num) {
	console.log("num is " + num);
}
// 3. choose a num
// apply num to card spins + result

begin();
