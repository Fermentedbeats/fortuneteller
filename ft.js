
function fortuneTellerApp() {
//global vars

var cards = ["WEALTH", "FORTUNE", "HAPPINESS", "SORROW", "LOSS", "SHAME", "REGRETS", "JOY", "HEALTH", "SUCCESS", "MONEY", "CALM", "RESPECT", "FAMILY", "ADVENTURE", "THRILLS", "LOVE", "TIME", "DEEP", "LONGING", "MYSTERY", "INTRIGUE", "STRANGER", "WISDOM", "CHOICES", "EASY", "HARDSHIP", "PEACE"];
var imgs = [1,2,3,4,5,6,7,8,9];
var round = 1;


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
		for (var i = 0; i < 11; i++) {
			var next = createColorDiv();
			next.className = "colors";
			menu.appendChild(next);
			// assign shape to divs
			TweenMax.to(next, .75, {
 		   		borderRadius:"0px 20px"
			});


			// drop divs from sky, rotate & bounce
			var randBounce = Math.floor(Math.random()*1080 - 540)
			TweenMax.from(next, i*.3, {opacity:0, scale:0, rotation:randBounce, ease: Elastic.easeOut, y:randBounce, x:randBounce});
		}

		function createColorDiv() {
			var div = document.createElement("div");
			var color = div.style.backgroundColor = assignColor();
			div.addEventListener("click", function() {
				findColorNum(color, div);
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
	// generate random hex color
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
// change title on page to ask for color selection
function createChooseColorHeader() {
	var header = document.getElementById("header");
	header.innerHTML = "Choose A Color";
	// slide in title from left
	TweenMax.from(header, 2, {opacity:0, x:-800, ease:Elastic.eastInOut}, 0.7);
}

// 2. color is chosen
function findColorNum(color, div) {
	// animate elasticity on button when clicked
	TweenMax.from(div, 0.5, {opacity:0, scale:0, ease: Bounce.easeInOut});

	console.log("COLOR IS " + color)
	// find num in hex and apply that to card spins + result
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

// spin card when revealing fortune
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

// replace card with fortune word & pic
function tellFortune(num, color) {
	for (var n =0; n < 4; n++) {
		var cards = document.getElementsByClassName("cards");
		if (cards[n].id != "assigned" && cards[n].id != "lr") {
			var card = cards[n];
			card.style.border = "6px solid " + color;
			card.style.color = color;
			card.style.textShadow = "2px 2px 4px #000000";
			card.innerHTML = fortunes(); 
			card.style.backgroundImage = fortuneImages();
			card.style.backgroundSize = "150%";
			card.setAttribute("class", "assigned");
			round += 1;
			break;
		}
	}
			if (round === 2) {
				round2();
			}
			else {
				round3();
			}
}

// affix a fortune word to a card
function fortunes() {
	var num = Math.floor(Math.random()*cards.length);
	var future = cards[num];
	cards.splice(num, 1);
	return future;
}
//affix background image to fortune card
function fortuneImages() {
	var num = Math.floor(Math.random()*imgs.length);
	var img = imgs[num];
	imgs.splice(num, 1);
	return "url('imgs/" + img + ".png')";
}
// 3. choose a num, num flips the next fortune
function round2() {

	var menu = document.getElementById("menu");
	var colorDivs = menu.getElementsByTagName("div");
	for (var p = 0; p < colorDivs.length; p++) {
		colorDivs[p].style.backgroundColor = "black";
		colorDivs[p].innerHTML = randNum();
		colorDivs[p].style.color = assignColor();
		colorDivs[p].style.borderRadius = "50%";
		colorDivs[p].style.fontSize = "1.25em";
	}
	// change button text
	document.getElementById("begin").value = "I want different numbers";
	// slide in new header
    var header = document.getElementById("header");
	header.innerHTML = "Choose A Number";
	// slide in title from right
	TweenMax.from(header, 2, {opacity:0, x:800, ease:Elastic.eastInOut}, 0.7);
}

function round3() {
	var menu = document.getElementById("menu");
	var colorDivs = menu.getElementsByTagName("div");
	for (var q = 0; q < colorDivs.length; q++) {
		colorDivs[q].style.backgroundImage = "imgs/cardLowRes.png";
		colorDivs[q].innerHTML = "";
		colorDivs[q].style.border = "1px solid grey";
		TweenMax.to(colorDivs[q], .75, {
 		   		borderRadius:randShape()
			});
	}
	// change button text
	document.getElementById("begin").value = "I want new shapes";
	// slide in new header
    var header = document.getElementById("header");
	header.innerHTML = "Choose A Shape";
	// slide in title from right
	TweenMax.from(header, 2, {opacity:0, x:800, ease:Elastic.eastInOut}, 0.7);
	round4();
}

function round4() {
	document.getElementById("begin").value = "I want new shapes";

}

function randShape() {
	var shapes = ["25px","50px","0px 20px","20px 0px","0px 20px 50px","20px 0px 50px","0px 20px 50px 50px","50px 0px 20px 50px","50px 50px 50px 0px","50px 0px 50px 50px"];
	var shapeIndex = Math.floor(Math.random()*shapes.length)
	var shapeMaker = shapes[shapeIndex];
	return shapeMaker
}


function randNum() {
  var rand = Math.floor(Math.random()*200);
  return rand;
}

begin();
}

fortuneTellerApp();
