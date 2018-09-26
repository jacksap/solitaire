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

/*----- cached element references -----*/

var tableauCols = document.querySelectorAll("#tableau section");
var foundationPiles = document.querySelectorAll("#foundation div");
var wasteEl = document.getElementById("waste"); 
var stockEl = document.getElementById("stock"); 
var tableauEl = document.getElementById('tableau');

/*----- event listeners -----*/

tableauEl.addEventListener("click", addTableau);
stockEl.addEventListener("click", addWaste);

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

function addTableau(e) {
    var tableauTarget = tableau[event.target.parentNode.parentNode.id.charAt(0)];
    console.log(tableauTarget);
    // if (selectedCards.length) {
    //     selectedCards.forEach(function(Card){
    //         Card.push(tableauTarget.pop());
    //     });
    
    //     //move selected cards
    //     //to the clicked
    //     //[] in tableau
    // } else {
    //     if(!Card.isActive) return;
    //     
    //     });
    // }
}

function render() {
    tableauCols.forEach(function(section, tableauColIdx) {
        var html = '';
        tableau[tableauColIdx].forEach(function(card) {
            html += `<div ${card.selected ? 'class="selected"' : "" }><img src="${card.isActive ? card.imgLink : 'img/BLUEBACK.png'}"></div>`;
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

init();

// columns should be constructors and loading decks are in arrays

// function reset(event) {
//     Card.isActive = false;
//     // How I will be stating that nothing is in play anymore. I really want to the init to be set off.
//     AKA When the button is clicked, clear board again...
//     for (let i = 0; i < colArray.length; i++) {
//         colArray[i].src = "img/REDBACK.png"; // unclear if this will work, has to be built out.
//         init();
//     }
// }