/*----- constants -----*/

const SUITS = ["D", "C", "H", "S"];
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const CARDBACK = `path`

/*----- app's state (variables) -----*/
var deck; 
var tableau; // 7 distribution columns
var foundation; // The unloading decks

var stock;
var waste;
var tableauSections;


/*----- cached element references -----*/

// This is the cached area to reference the items called on in the DOM

var tableauCols = document.querySelectorAll("#tableau section");
var foundationPiles = document.querySelectorAll("#foundation div");
var wasteEl = document.getElementById("waste"); 
var stockEl = document.getElementById("stock"); 

/*----- event listeners -----*/

// waste/stock event listeners
// tableau movement
// tableauEl.addEventListener('dragenter', addTableau); //dragover? maybe?
// wasteEl.addEventListener("click", selectWaste);
stockEl.addEventListener("click", addWaste);
// active play motion?
// click to start deck & RESTART BUTTON

/*----- functions -----*/

function init() {
    deck = [];
    activeCard = []; // this is where the active card in play is stored
    stock = [];
    waste = [];
    tableau = [[], [], [], [], [], [], []];
    foundation = [[], [], [], []];
    createDeck(); // function making the card array correspond with the images
    shuffleDeck(); // function to shuffle deck
    deal(); // Can this put the remainder of stock into the stock pile? Element?
    render(); // render will invoke the state of the game
    // displayActive(); // show active cards function?
}

function addWaste() {
    if (!stock.length) { //issue with image and order - talk to Jim
        stock = [...waste];
        waste = [];
        return
    }
    waste.push(stock.pop());
    displayAvailableWaste();
    console.log(waste);
    settingStockWaste();
}

function displayAvailableWaste() {
    var lastWaste = waste[waste.length - 1];
    lastWaste.isActive = true;
}

function render() {
    tableauCols.forEach(function(section, tableauColIdx) {
        // build string of divs to set to section's innerHTML
        var html = '';
        tableau[tableauColIdx].forEach(function(card) {
            html += `<div><img src="${card.isActive ? card.imgLink : 'img/BLUEBACK.png'}"></div>`;
        });
        section.innerHTML = html;
    });
    foundationPiles.forEach( function(arr, i){
        if(!arr.length){
            foundationPiles[i].setAttribute("style",`background-image: url('img/${i}.png');`);
        } // This is to be changed when the functionality of clicking is enabled.
    })
    settingStockWaste();
    checkWin();
}
function settingStockWaste(){
    if (!stock.length) {
        stockEl.setAttribute("style","background-image:url('img/refresh.png');");
    } else {
        stockEl.setAttribute("style","background-image:url('img/BLUEBACK.png');");
    }
    if (!waste.length) {
        wasteEl.setAttribute("style", "background-image: none;");
    } else if (waste.length) {
        var lastWaste = waste[waste.length - 1];
        wasteEl.setAttribute("style",`background-image:url('${lastWaste.imgLink}');`)
    }
} 

// Keep in mind the function above will handle other data.

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



// function reset(event) {
//     Card.isActive = false;
//     // How I will be stating that nothing is in play anymore. I really want to the init to be set off.
//     AKA When the button is clicked, clear board again...
//     for (let i = 0; i < colArray.length; i++) {
//         colArray[i].src = "img/REDBACK.png"; // unclear if this will work, has to be built out.
//         init();
//     }
// }

// function addWaste(e) {
//     if (!activeCard.length) {
//       if (stock.length === 0) {
//         stock = stock.concat(waste.reverse());
//         waste = [];
//       } else {
//         waste = waste.concat(stock.splice(stock.length - 3).reverse());
//       }
//     }
//     displayActive(e);
//     render();
//   }

init();


// columns should be constructors and loading decks are in arrays





