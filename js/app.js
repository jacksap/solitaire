/*----- constants -----*/

const SUITS = ["D", "C", "H", "S"];
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];


/*----- app's state (variables) -----*/
var deck; 
var tableau; // 7 distribution columns
var foundation; // The unloading decks

var stock;
var waste;

/*----- cached element references -----*/

// This is the cached area to reference the items called on in the DOM

var tableau = document.getElementById("tableau"); // set up a tableau
var foundation = document.getElementById("foundation"); // set up the cards as foundations
var waste = document.getElementById("waste"); // the drawn cards
var stock = document.getElementById("stock"); // the undrawn cards

/*----- event listeners -----*/

// waste/stock event listeners
// tableau movement
// active play motion?
// click to start deck & RESTART BUTTON

/*----- functions -----*/



//function for initializing the game - empty arrays and initializing the functions
function init() {
    deck = [];
    activeCard = []; // this is where the active card in play is stored
    stock = [];
    waste = [];
    tableau = [[], [], [], [], [], [], []];
    foundation = [[], [], [], []];
    createDeck(); // function making the card array correspond with the images
    shuffleDeck(); // function to shuffle deck
    //createTableau(); // this method will deal cards into the correct columns
    //render(); // render will invoke the state of the game
   // displayActive(); // show active cards function?
  }


class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        // card is active? 
        this.imgLink = (`../img/${this.suit}${this.rank}.png`)
    }
}

function createDeck () {
    for(var s = 0; s < SUITS.length; s++) {
        for (var r = 0; r < RANKS.length; r++) {
            deck.push(new Card( SUITS[s], RANKS[r]));
            // iterate throught the array
        }
    }
}

function shuffleDeck() {
    for (var i = 0; i < 52; i++) {
      var randI = Math.floor(Math.random() * deck.length);
      stock.push(deck[randI]);
      deck.splice(randI, 1);
    }
}


// function makeTableau() {
//     for (t in tableau) { //variable in an object...
//       while (tableau[t].length <= t) {
//         tableau[t].push(stock.pop());
//       }
//     //   tableau[t][t].isActive = true;
//     // }
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