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

function render() {
    tableauCols.forEach(function(section, tableauColIdx) {
        // build string of divs to set to section's innerHTML
        var html = '';
        tableau[tableauColIdx].forEach(function(card) {
            html += `<div><img src="${card.isActive ? card.imgLink : 'img/REDBACK.png'}"></div>`;
        });
        section.innerHTML = html;
    });
    foundationPiles.forEach(function(div,foundationPileIdx) {
        var html = '';
        foundation[foundationPileIdx].forEach(function(card) {
            html += `<img src="${card.isActive ? card.imgLink : 'img/franklin.png'}">`; // do I want card in here at all?
        });
        div.innerHTML = html;
    });
    if (!stock.length) {
        stockEl.setAttribute("style","background-color: white;");
    } else {
        stockEl.setAttribute("style","background-image:url('img/REDBACK.png');");
    }
    // wasteEl.forEach(function(,){

    // })




    checkWin();
}

// Keep in mind the function above will handle other data.

class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.isActive = false;
        this.selected = false;
        this.imgLink = (`../img/${this.suit}${this.rank}.png`)
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

// USE THIS AS A RESET MODEL

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




// Start Game

// Create storage of cards (shuffle)
   // How are they organized?
// Create shuffle loop

// DEAL DECK    
    // Distribute cards in columns and the rest goes into deal deck
        // Last card/stack facing up
        // These may be individual arrays/switch images accordingly. 

// Event listeners for user interactions
    // Click/Drag cards to responsive locations
        // This will require outlining which cards are compatible order wise and opening the return stack decks (A,S,C,D)
    // Alternating colors in descending order. Unlike ASCD chronological and suit based. 
        // RED/BLACK + KQJ10...
        // SUIT + A234...
    // User can click through deal deck for new card options that can then be put in play. 
        // If removed items must stay in order (.splice)
        // Stack of deal cards should have a refresh functionality at the end
    // These should be repeatable functions (loop)

    // Differentiate between VALID and INVALID moves

//Game over
    // User has unloaded all items into suit stacks - win
    // Forfeit because there are no moves left
    // Reset burton 


// How do transition cards and create valid input areas?