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
var foundationEl = document.getElementById("foundation");
var wasteEl = document.getElementById("waste"); 
var stockEl = document.getElementById("stock"); 

/*----- event listeners -----*/

// waste/stock event listeners
// tableau movement
// tableauEl.addEventListener('dragenter', addTableau); //dragover? maybe?
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
    deal();
    // stageTableau(); // this method will deal cards into the correct columns
    render(); // render will invoke the state of the game
    // displayActive(); // show active cards function?
}

function render() {
    tableauCols.forEach(function(section, tableauColIdx) {
        // build string of divs to set to section's innerHTML
        // debugger;
        var html = '';
        tableau[tableauColIdx].forEach(function(card) {
            html += `<div><img src="${card.isActive ? card.imgLink : 'img/REDBACK.png'}"></div>`;
        });
        section.innerHTML = html;
    });

}

// Keep in mind the function above will handle other data.

class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.isActive = false;
        // this.selected = false;
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
    // rest goes into a stock pile
}

function addTableau(e) {
    if (activeCard.length) {
      var tableauTarget = tableau[e.target.id.charAt(0)];
      if (activeCard[0].rank === 13 && tableauTarget.length === 0) { // the K card on an empty array
        while (activeCard.length > 0) { // If the array length in the column is larger than 0
            tableauTarget.push(activeCard.shift()); //front of the array (display wise...)
        }
      } else {
        var identifySuit = suit.indexOf(activeCard[0].suit) %2 !== suit.indexOf(tableauTarget[tableauTarget.length - 1].suit) % 2; 
        // I think this works because I alternate between red and black...
        var identifyRank = activeCard[0].rank + 1 === tableauTarget[tableauTarget.length - 1].rank;
        // checking that the var is identical to what will come next
        if (identifyRank && identifySuit) {
            console.log(identifyRank, identifySuit); // temporary console log check
        while (activeCard.length > 0) {
            tableauTarget.push(activeCard.shift()); // take from end and transition to front of activeCard array...
        }
        } else {
          console.log("Error adding to the Tableau.");
        }
      }
      render();
      //displayActive(e);
    }
}

function createDeck () {
    for(var s = 0; s < SUITS.length; s++) {
        for (var r = 0; r < RANKS.length; r++) {
            deck.push(new Card( SUITS[s], RANKS[r]));
        }
    }
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