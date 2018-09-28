/*----- constants -----*/
const SUITS = ["D", "C", "H", "S"];
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
/*----- app's state (variables) -----*/
var deck;
var tableau;
var foundation;
var stock;
var waste;
var tableauSections;
var selectedCards;
var staticColIdx;
var staticRowIdx;
/*----- cached element references -----*/
var tableauCols = document.querySelectorAll("#tableau section");
var foundationPiles = document.querySelectorAll("#foundation div");
var wasteEl = document.getElementById("waste");
var stockEl = document.getElementById("stock");
var tableauEl = document.getElementById('tableau');
var resetBtn = document.querySelector('button');
var foundationEl = document.getElementById('foundation');
var peanuts = document.querySelector('.peanuts');
/*----- event listeners -----*/
wasteEl.addEventListener("click", selectWaste);
foundationEl.addEventListener("click", buildFoundation);
tableauEl.addEventListener("click", handleColumnClick);
stockEl.addEventListener("click", addWaste);
resetBtn.addEventListener("click", reset);
/*----- functions -----*/
function init() {
	deck = [];
	activeCard = []; 
	stock = [];
	waste = [];
	tableau = [
		[],
		[],
		[],
		[],
		[],
		[],
		[]
	];
	foundation = [
		[],
		[],
		[],
		[]
	];
	selectedCards = [];
	createDeck();
	shuffleDeck();
	deal();
	waste = waste.map(function(card) {
		card.isActive = true;
		return card;
	});
	render();
	renderStockWaste(true);
}

function addWaste() {
	if (waste.length) {
		stock.unshift(waste.pop());
	} else {
		waste = stock;
		stock = [];
	}
	renderStockWaste();
}

function handleColumnClick() {
	var colIdx = parseInt(event.target.id.charAt(1));
	var rowIdx = parseInt(event.target.id.substr(3));
	if (selectedCards.length) {
		if (selectedCards[0] === stock[0]) {
			if (validTableauMove(colIdx)) {
				tableau[colIdx] = tableau[colIdx].concat(selectedCards);
				selectedCards = [];
				stock.splice(0, 1);
				if (stock.length) stock.pop(stock.unshift());
			}
			renderStockWaste();
		} else {
			if (validTableauMove(colIdx)) {
				tableau[colIdx] = tableau[colIdx].concat(selectedCards);
				selectedCards = [];
				tableau[staticColIdx].splice(staticRowIdx);
				if (tableau[staticColIdx].length) {
					var lastCardIdx = tableau[staticColIdx].length - 1;
					tableau[staticColIdx][lastCardIdx].isActive = true;
				}
			} else {
				selectedCards = [];
			}
		}
	} else {
		if (!tableau[colIdx][rowIdx].isActive) return; 
		staticColIdx = parseInt(event.target.id.charAt(1));
		staticRowIdx = parseInt(event.target.id.substr(3));
		selectedCards = tableau[colIdx].slice(rowIdx);
		tableau[colIdx][rowIdx].selected = true;
	};
	console.log(selectedCards);
	render();
}

function selectWaste() {
	if (selectedCards.length) {
		selectedCards = [];
	} else {
		selectedCards = [stock[0]]; 
	}
	renderStockWaste();
}

function buildFoundation() {
	if (selectedCards.length === 1) {
		var correctFoundation = event.target.id.charAt(1)
		if (validFoundationMove(correctFoundation)) {
			if (selectedCards[0] === stock[0]) {
				stock.splice(0, 1);
				if (stock.length) stock.pop(stock.unshift());
				renderStockWaste();
			} else {
				tableau[staticColIdx].splice(staticRowIdx);
				var lastCardIdx = tableau[staticColIdx].length - 1; //
				if (lastCardIdx > -1) tableau[staticColIdx][lastCardIdx].isActive = true;
			}
			foundation[correctFoundation].push(selectedCards.pop());
			selectedCards = [];
			render();
		}
	}
}

function render() {
	tableauCols.forEach(function(section, tableauColIdx) {
		var html = '';
		tableau[tableauColIdx].forEach(function(card, rowIdx) {
			html += `<div ${selectedCards.includes(card) ? 'class="selected"' : "" }><img id="c${tableauColIdx}r${rowIdx}" src="${card.isActive ? card.imgLink : 'img/BLUEBACK.png'}"></div>`;
		});
		section.innerHTML = html;
	});
	foundationPiles.forEach(function(element, i) {
		if (!foundation[i].length) {
			foundationPiles[i].setAttribute("style", `background-image: url('img/${i}.png');`);
		} else {
			foundationPiles[i].setAttribute("style", `background-image: url('${foundation[i][foundation[i].length - 1].imgLink}');`);
		}
	})
	renderStockWaste();
	checkWin();
}

function renderStockWaste(firstClick) {
	if (waste.length) {
		stockEl.setAttribute("style", "background-image:url('img/BLUEBACK.png');");
	} else if (stock.length) {
		stockEl.setAttribute("style", "background-image:url('img/refresh.png');");
	} else {
		stockEl.setAttribute("style", "visibility: hidden;");
	}
	if (stock.length) {
		wasteEl.setAttribute("style", `background-image:url('${stock[0].imgLink}');`);
		selectedCards.includes(stock[0]) ? wasteEl.setAttribute("class", "selected") : wasteEl.removeAttribute("class");
	} else {
		wasteEl.setAttribute("style", "visibility: hidden;");
	}
}
class Card {
	constructor(suit, rank) {
		this.suit = suit;
		this.rank = rank;
		this.isActive = false;
		this.selected = false;
		this.imgLink = (`img/${this.suit}${this.rank}.png`)
	}
}

function shuffleDeck() {
	for (var i = 0; i < 52; i++) {
		var randShuffle = Math.floor(Math.random() * deck.length);
		waste.push(deck[randShuffle]);
		deck.splice(randShuffle, 1);
	}
	return waste;
}

function deal() {
	tableau.forEach(function(colArr, colIdx) {
		for (var i = 0; i <= colIdx; i++) {
			colArr.push(waste.pop());
			if (i === colIdx) colArr[i].isActive = true;
		}
	});
}

function createDeck() {
	for (var s = 0; s < SUITS.length; s++) {
		for (var r = 0; r < RANKS.length; r++) {
			deck.push(new Card(SUITS[s], RANKS[r]));
		}
	}
}

function validTableauMove(targetColIdx) {
	if (!tableau[targetColIdx].length && selectedCards[0].rank === 13) return true;
	return altColorCheck(selectedCards[0], tableau[targetColIdx][tableau[targetColIdx].length - 1]) && descOrderCheck(selectedCards[0], tableau[targetColIdx][tableau[targetColIdx].length - 1]);
}

function validFoundationMove(correctFoundation) {
	var f = foundation[correctFoundation];
	if (!f.length && selectedCards[0].rank === 1) return true;
	return sameColorCheck(selectedCards[0], f[f.length - 1]) && ascOrderCheck(selectedCards[0], f[f.length - 1]);
}

function altColorCheck(card1, card2) {
	var card1S = SUITS.indexOf(card1.suit);
	var card2S = SUITS.indexOf(card2.suit);
	return card1S % 2 !== card2S % 2;
}

function sameColorCheck(card1, card2) {
	var card1S = SUITS.indexOf(card1.suit);
	var card2S = SUITS.indexOf(card2.suit);
	return card1S % 2 === card2S % 2;
}

function ascOrderCheck(card1, card2) {
	return card1.rank === card2.rank + 1;
}

function descOrderCheck(card1, card2) {
	return card1.rank === card2.rank - 1;
}

function checkWin() {
	if ((foundation[0].length + foundation[1].length + foundation[2].length + foundation[3].length) === 52) {
		peanuts.innerHTML = '<img src="img/win.png">';
		tableauEl.setAttribute("style", "display: flex; background-image: url(img/win.gif); background-repeat: no-repeat; justify-content: center; margin: auto; width: 480px;");
	};
}

function reset() {
	init();
	wasteEl.setAttribute("style", "background-image: none;");
	tableauEl.removeAttribute("style", "display: flex; background-image: url(img/win.gif); background-repeat: no-repeat; justify-content: center; margin: auto; width: 480px;");
	peanuts.innerHTML = '<img src="img/newdeal.png">';
}
init();