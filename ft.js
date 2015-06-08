
//global vars

var cards = ["WEALTH", "FORTUNE", "HAPPINESS", "SORROW", "LOSS", "SHAME", "REGRETS", "JOY", "HEALTH", "SUCCESS", "MONEY", "CALM", "RESPECT", "FAMILY", "ADVENTURE", "THRILLS", "LOVE", "TIME", "DEEP", "LONGING", "MURDER", "INTRIGUE", "STRANGER", "WISDOM", "CHOICES", "EASY", "HARD"];
var imgs = [1,2,3,4,5,6,7,8,9];


// 1. game begins w/ offering  color pallete
function begin() {
	var btn = document.getElementById("begin");
	btn.addEventListener("click", function() {
		populateColors();
	});
}
// populate color divs and or change colors in existing divs
function populateColors() {
	var menu = document.getElementById("menu");
	var divs = menu.getElementsByTagName("div");

	// create colors for first-time run
	if (divs.length === 0) {
		for (var i = 0; i < 10; i++) {
			var next = createColorDiv();
			next.className = "colors";
			menu.appendChild(next);
			// drop divs from sky, rotate & bounce
			var randBounce = Math.floor(Math.random()*1080 - 540)
			TweenMax.from(next, 1, {opacity:0, scale:0, rotation:randBounce, ease: Elastic.easeOut, y:randBounce, x:randBounce});
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
			TweenMax.from(divs[k], 0.5, {opacity:0, scale:0, ease: Bounce.easeInOut});

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
	flipCard(colorNum, color);
}


function flipCard(num, color) {
	TweenMax.set(".board", {transformPerspective: 600});
	TweenMax.staggerFrom(".cards", 1.5, {
		rotationX: 40 * num,
		rotationY: 180 * num,
		z: 100,
		ease:Back.easeInOut,
		repeatDelay:0.2, 
		// onComplete: tellFortune(num, color),
		// onCompleteParams:[num, color]
		// transformPerspective:300,
		// transformOrigin: "left 20%"
	});
	tellFortune(num, color);
}

function tellFortune(num, color) {
	for (var n =0; n < 4; n++) {
		var cards = document.getElementsByClassName("cards");
		if (cards[n].id != "assigned") {
			var card = cards[n];
			card.style.border = "6px solid " + color;
			card.style.color = color;
			card.style.textShadow = "2px 2px 5px #000000";

			card.innerHTML = fortunes(); 
			card.style.backgroundImage = fortuneImages(num);
			card.style.backgroundSize = "150%";
			card.setAttribute("class", "assigned");
			break;
		}
	}
}




function fortunes() {

	var num = Math.floor(Math.random()*cards.length);
	var future = cards[num];
	cards.splice(num, 1);
	console.log(future);
	console.log(cards);
	return future;
}


function fortuneImages(num) {
	var num = Math.floor(Math.random()*num);
	var img = imgs[num];
	imgs.splice(num, 1);
	return "url('imgs/" + img + ".png')";
}




// 3. choose a num
// apply num to card spins + result

begin();
