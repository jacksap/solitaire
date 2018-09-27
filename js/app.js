/*----- constants -----*/

const SUITS = ["D", "C", "H", "S"];
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const CARDBACK = `path`

/*----- app's state (variables) -----*/
var deck; 
var tableau; 
var foundation; 

var stock;
var waste;
var tableauSections;
var selectedCards;
var cardsToTurn;

var staticColIdx; 
var staticRowIdx; 

/*----- cached element references -----*/

var tableauCols = document.querySelectorAll("#tableau section");
var foundationPiles = document.querySelectorAll("#foundation div");
var wasteEl = document.getElementById("waste"); 
var stockEl = document.getElementById("stock"); 
var tableauEl = document.getElementById('tableau');
var resetBtn = document.querySelector('button');
// var foundationEl = document.getElementById('foundation');

/*----- event listeners -----*/
// foundationEl.addEventListener("click", buildFoundation);
tableauEl.addEventListener("click", handleColumnClick);
stockEl.addEventListener("click", addWaste);
resetBtn.addEventListener("click", reset);
/*----- functions -----*/

function init() {
    deck = [];
    activeCard = []; // this is where the active card in play is stored
    stock = [];
    tableau = [[], [], [], [], [], [], []];
    foundation = [[], [], [], []];
    selectedCards = [];
    createDeck(); 
    shuffleDeck();
    deal(); 
    cardsToTurn = stock.length -1;
    render();
    renderStockWaste(true); 
    // displayActive(); // show active cards function?
}

function addWaste() {
    cardsToTurn--;
    stock.push(stock.shift());
    renderStockWaste();
    if (!cardsToTurn) cardsToTurn = stock.length -1;
}

function handleColumnClick() {
    var colIdx = parseInt(event.target.id.charAt(1));
    var rowIdx = parseInt(event.target.id.charAt(3));
    
    if (selectedCards.length) {
        tableau[colIdx] = tableau[colIdx].concat(selectedCards);
        // call the build foundation
        selectedCards = [];
        tableau[staticColIdx].splice(staticRowIdx);
        if (tableau[colIdx][rowIdx].isActive) {
            tableau[colIdx].forEach(function(card){
                card.selected = false;
            });
        }
    } else {
    if(!tableau[colIdx][rowIdx].isActive) return;
        staticColIdx = parseInt(event.target.id.charAt(1));
        staticRowIdx = parseInt(event.target.id.charAt(3));
        selectedCards = tableau[colIdx].slice(rowIdx);
        tableau[colIdx][rowIdx].selected = true;
    };
    console.log(selectedCards);
    render();
}

// function buildFoundation() {
//      if (selectedCards.length = 1) {

//     foundationPiles[i] = foundationPiles[i].concat(selectedCards);
//     } else {
//     }
//     check if it is active, return
//     otherwise add it to the selectedCard[]


function render() {
    tableauCols.forEach(function(section, tableauColIdx) {
        var html = '';
        tableau[tableauColIdx].forEach(function(card, rowIdx) {
            html += `<div ${card.selected ? 'class="selected"' : "" }><img id="c${tableauColIdx}r${rowIdx}" src="${card.isActive ? card.imgLink : 'img/BLUEBACK.png'}"></div>`;
        });
        section.innerHTML = html;
    });
    foundationPiles.forEach( function(arr, i){
        if(!arr.length){
            foundationPiles[i].setAttribute("style",`background-image: url('img/${i}.png');`);
        } 
    })
    checkWin();
}
function renderStockWaste(firstClick){
    if (cardsToTurn) {
        stockEl.setAttribute("style","background-image:url('img/BLUEBACK.png');");
        if (!firstClick) wasteEl.setAttribute("style",`background-image:url('${stock[0].imgLink}');`)   
    } else {
        stockEl.setAttribute("style","background-image:url('img/refresh.png');");
        wasteEl.setAttribute("style", "background-image: none;");
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
      stock.push(deck[randShuffle]);
      deck.splice(randShuffle, 1);
    }
    return stock;
}

function deal() {
    tableau.forEach(function(colArr,colIdx){ 
        for(var i = 0; i <= colIdx; i++) {
            colArr.push(stock.pop());
            if (i === colIdx) colArr[i].isActive = true;
        } 
    }); 
}

function createDeck () {
    for(var s = 0; s < SUITS.length; s++) {
        for (var r = 0; r < RANKS.length; r++) {
            deck.push(new Card( SUITS[s], RANKS[r]));
        }
    }
}

function checkWin() {
    if (foundation[0].length + foundation[1].length + foundation[2].length + foundation[3].length === 52)
    /*{DO SOMETHING ON THE BOARD}*/;
}


// columns should be constructors and loading decks are in arrays

function reset() {
    init();
}

init();


