
function fortuneTellerApp() {

	//global vars
	var cards = ["WEALTH", "FORTUNE", "HAPPINESS", "SORROW", "LOSS", "SHAME", "REGRETS"	, "JOY", "HEALTH", "SUCCESS", "MONEY", "CALM", "RESPECT", "FAMILY", "ADVENTURE"	, "THRILLS", "LOVE", "TIME", "DEEP", "LONGING", "MYSTERY", "INTRIGUE", "	STRANGER", "WISDOM", "CHOICES", "EASY", "HARDSHIP", "PEACE"];
	var imgs = [1,2,3,4,5,6,7,8,9];
	var symbols = ["fa-mars", "fa-heartbeat", "fa-diamond", "fa-motorcycle", "fa-anchor", "fa-bicycle", "fa-cube","fa-heart", "fa-key", "fa-flash", "fa-glass", "fa-headphones", "fa-plug", "fa-music"]
	var round = 1;
	var currentHex = "";
	var colorDivs = document.getElementById("menu").getElementsByTagName("div");
	var header = document.getElementById("header");



// 1. game begins w/ offering  color palette
function begin() {
	var btn = document.getElementById("begin");
	btn.addEventListener("click", function() {
		populateColors();
		var sidebar = document.getElementsByClassName("sidebar");
		sidebar[0].style.display = "none";
	});
}
	// populate color divs and or change colors in existing divs
	function populateColors() {
	// create colors for first-time run
	if (colorDivs.length === 0) {
		for (var i = 0; i < 11; i++) {
			var next = createColorDiv();
			next.className = "colors";
			menu.appendChild(next);

			// drop divs from sky, rotate & bounce
			var randBounce = randNum(1080 - 540);
			TweenMax.from(next, i*.1, {opacity:0, scale:0, rotation:randBounce, ease: Elastic.easeOut, y:randBounce, x:randBounce});
		}

		function createColorDiv() {
			var div = document.createElement("div");
			var color = div.style.backgroundColor = assignColor();
			div.addEventListener("click", function() {
				bounce(div);
				div.style.backgroundColor === "transparent" ? currentHex = div.style.color : currentHex = div.style.backgroundColor 
			});	
			return div;
		}
		// change button text
		document.getElementById("begin").style.visibility = "hidden";
		// document.getElementById("begin").value = "Screw this, I want better colors";
		createChooseColorHeader();
	}
	// else {
	// 	for (var k = 0; k < divs.length; k++) {
	// 		divs[k].style.backgroundColor = assignColor();
	// 		// in place buttons refresh & bounce
	// 		TweenMax.from(divs[k], 0.5, {opacity:0, scale:0, ease: Bounce.easeInOut});

		// }
	// }
	// generate random hex color
}
function assignColor() {
	var hex = "#";
	colorArray = [1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
	for (var j=0; j < 6; j++) {
		var rando = randNum(colorArray.length);
		hex += colorArray[rando];
	}
	currentHex = hex;
	return currentHex;
}
// change title on page to ask for color selection
function createChooseColorHeader() {
	header.innerHTML = "Choose A Color";
	// slide in title from left
	TweenMax.from(header, 2, {opacity:0, x:-800, ease:Elastic.eastInOut}, 0.7);
}

// 2. color is chosen
function bounce(div) {
	// animate elasticity on button when clicked
	TweenMax.from(div, 0.5, {
		opacity:0, 
		scale:0, 
		ease: Bounce.easeInOut,
		onComplete: findColorNum,
	});

}


function findColorNum() {

	console.log("COLOR IS " + currentHex);
	// find num in hex and apply that to card spins + result
	var colorNum;
	// iterate thru hex chars
	for (var m = 1; m < currentHex.length; m++) {
		// if you have a hex letter instead of a num numTF is false
		var numTF = isNaN(currentHex[m] * 1);
		//if you do have a num, assign it to the var colorNum
		if (!numTF) {
			colorNum = currentHex[m];
			break;
		}
	}
	// if the hex contained no nums, generate a random num
	if (colorNum === undefined) {
		colorNum = randNum(6);
	}
	flipCard(colorNum);

}

// spin card when revealing fortune
function flipCard(num) {
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
	tellFortune(num);
}

// replace card with fortune word & pic
function tellFortune(num) {
	for (var n =0; n < 4; n++) {
		var cards = document.getElementsByClassName("cards");
		if (cards[n].id != "assigned") {
			var card = cards[n];
			card.style.border = "6px solid " + currentHex;
			card.style.color = currentHex;
			card.style.textShadow = "2px 2px 4px black";
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
	else if (round === 3) {
		round3();
	}
	else if (round === 4) {
		round4();
	}
	else {
		finish();
	}
}

// affix a fortune word to a card
function fortunes() {
	var num = randNum(cards.length);
	var future = cards[num];
	cards.splice(num, 1);
	return future;
}
//affix background image to fortune card
function fortuneImages() {
	var num = randNum(imgs.length);
	var img = imgs[num];
	imgs.splice(num, 1);
	return "url('imgs/" + img + ".png')";
}
// 3. choose a num, num flips the next fortune
function round2() {
	for (var p = 0; p < colorDivs.length; p++) {
		colorDivs[p].style.backgroundColor = "transparent";
		colorDivs[p].innerHTML = randNum(200);
		colorDivs[p].style.color = assignColor();
		colorDivs[p].style.fontSize = "1.25em";
	}
	// change button text
	// document.getElementById("begin").value = "I want different numbers";
	// slide in new header
	header.innerHTML = "Choose A Number";
	// slide in title from right
	TweenMax.from(header, 1, {opacity:0, x:800, ease:Elastic.eastInOut}, 0.7);
}

function round3() {
	header.innerHTML = "Choose A Shape";
	TweenMax.from(header, 1, {opacity:0, y:-100, ease:Elastic.eastInOut}, 0.7);

	for (var q = 0; q < colorDivs.length; q++) {
		colorDivs[q].innerHTML = "";
		colorDivs[q].style.backgroundColor = assignColor();

		TweenMax.to(colorDivs[q], .75, {
			borderRadius:randShape()
		});
	}

	// slide in new header

	// slide in title from top
}

function round4() {
	// document.getElementById("begin").value = "I want new shapes";
	var header = document.getElementById("header");
	header.innerHTML = "Choose a Symbol";
	// slide in title from right
	TweenMax.from(header, 1, {opacity:0, y:1200, ease:Elastic.eastInOut}, 0.7);

	for (var s = 0; s < colorDivs.length; s++) {
		colorDivs[s].innerHTML = "<i class='fa " + symbols[randNum(symbols.length)] + "'</i>"
		colorDivs[s].style.color = assignColor();
		colorDivs[s].style.backgroundColor = "transparent";
		colorDivs[s].style.fontSize = "1.25em";
	}
}


function finish() {
	var hide = document.getElementById("side");
	hide.style.visibility = "hidden";
	var cont = document.getElementById("board");
	cont.style.width = "1300px";
	TweenMax.to(".cards", 2, {x:50, ease:Elastic.eastInOut, onComplete:blowUp}, 0.7);
	
}

function blowUp() {
	header.innerHTML = "Your Future:";

	var cards = document.getElementsByClassName("assigned");
	for (var n =0; n < 4; n++) {
		cards[n].style.width = "200px";
		cards[n].style.height = "225px";
		cards[n].style.fontSize = "1.5em";
	}
	document.getElementById("board").style.marginLeft = "1%";
	document.getElementById("main").style.marginLeft = "1%";

	var sidebar = document.getElementsByClassName("sidebar");
	sidebar[0].style.display = "inline-block";
	// document.getElementsByClassName("curtain")[0].style.marginLeft = "1em";
	// document.getElementsByClassName("curtain")[0].style.display = "block";

// var newButton = document.createElement('button');
// newButton.id = "newButton";
// document.getElementById("board").appendChild(newButton);
// newButton.innerHTML = "Play Again?";
// newButton.addEventListener("click", fortuneTellerApp());


}

function randShape() {
	var shapes = ["25px","50px","0px 20px","20px 0px","0px 20px 50px","20px 0px 50px","0px 20px 50px 50px","50px 0px 20px 50px","50px 50px 50px 0px","50px 0px 50px 50px"];
	var shapeIndex = Math.floor(Math.random()*shapes.length)
	var shapeMaker = shapes[shapeIndex];
	return shapeMaker
}


function randNum(num) {
	var rand = Math.floor(Math.random()*num);
	return rand;
}

begin();
}

fortuneTellerApp();
