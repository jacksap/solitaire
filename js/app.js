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

var tableauEl = document.getElementById("tableau");
var foundationEl = document.getElementById("foundation");
var wasteEl = document.getElementById("waste"); 
var stockEl = document.getElementById("stock"); 

/*----- event listeners -----*/

// waste/stock event listeners
// tableau movement
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
    // deal();
    createDeck(); // function making the card array correspond with the images
    // shuffleDeck(); // function to shuffle deck
    // stageTableau(); // this method will deal cards into the correct columns
    render(); // render will invoke the state of the game
    // displayActive(); // show active cards function?
}

function render() {
    var tableauSections = tableauEl.children;
    var i = 0; // do I need a identifying value for this column defining the value or something -- image wise...
    for (col in tableau) {
        while(tableauSections[col].firstChild){
            tableauSections[col].removeChild(tableauSections[col].firstChild);
        }
        var idx = 0; // again... do I need a identifying value for this column defining the value or something -- image wise
        for (card in tableau[col]) {
            if (tableau[col][card].isActive) {
                tableauSections[col].innerHTML = `${tableauSections[col].innerHTML}<div><img src="img/$[this.suit]$[this.rank].png"></div>`;
                tableauSections[col].lastChild.style.backgroundImage =
                "url(" + tableau[col][card].imgLink + ")"; //how do I define this?
            } else {
            tableauSections[col].innerHTML = `${tableauSections[col].innerHTML}<div><img src="img/REDBACK.png"></div>`;
                tChildren[col].lastChild.setAttribute(//"style",;"
                );
            }
        idx++;
        }
    i++;
}
}
// }
// }
// }

class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.isActive = false;
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
    tableau.forEach(function(colArr,colIdx){ 
        for(var i = 0; i <= colIdx; i++) {
            colArr.push(stock.pop);
            if (i === colIdx) colArr[i].isActive = true;
        } // when the constructor ran - it then started the fE function
    });    
}

function createDeck () {
    for(var s = 0; s < SUITS.length; s++) {
        for (var r = 0; r < RANKS.length; r++) {
            deck.push(new Card( SUITS[s], RANKS[r]));
        }
    }
}

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