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

/*----- constants -----*/
// Value never changes, the cards retain meaning
var suit = ["spades", "hearts", "clubs", "diamonds"];
var rank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
// actual corresponding rank = [A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K];


/*----- app's state (variables) -----*/
var deck; // All cards
var tableau; // 7 distribution columns
var foundation; // The Unloading decks

var stock; // the waste/stock/draw ??
var waste;

/*----- cached element references -----*/

// This is the cached area to reference the items called on in the DOM...

var tableauEl = document.getElementById("tableau"); // set up a tableau
var foundationEl = document.getElementById("foundation"); // set up the cards as foundations
var wasteEl = document.getElementById("waste"); // the drawn cards
var stockEl = document.getElementById("stock"); // the undrawn cards

/*----- event listeners -----*/




/*----- functions -----*/

//function for initializing the game
//everything at zero
function init() {
    deck = [];
    activeCard = []; // this is where the active card in play is stored
    stock = [];
    waste = [];
    tableau = [[], [], [], [], [], [], []];
    foundation = [[], [], [], []];
    makeDeck(); // function making the card array correspond with the images
    shuffleDeck(); // function to shuffle deck
    makeTableau(); // this method will place the cards in the correct column
    render(); // render will invoke the state of the game
   // displayActive(); // do I need a way to show my player is active?
  }