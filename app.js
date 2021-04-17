// Get all the cards first
let card = document.getElementsByClassName("card")
let cards = [...card]

let card1 = document.getElementsByClassName("card1");
let cards1 = [...card1]

let card2 = document.getElementsByClassName("card2");
let cards2 = [...card2]

let card3 = document.getElementsByClassName("card3");
let cards3 = [...card3]
// console.log(cards1, cards2, cards3)

// console.log(cards);

let moves = 0

// Get the container that holds the cards
const deck = document.getElementById("card-deck");

// Get the rows in which cards are held
const row1 = document.querySelector(".row1");
const row2 = document.querySelector(".row2");
const row3 = document.querySelector(".row3");
// console.log(row1, row2, row3)

// Matched Cards
let matchedCards = document.getElementsByClassName("match");

//Modal
let modal = document.getElementById("popup")

// For opened cards 
var openedCards = [];

// First is to shuffle the cards we have

function shuffle(arr) {
    let currIndex = arr.length, temp, randIndex, valArr =[];

    while(currIndex !== 0) {
        randIndex = Math.floor(Math.random() * currIndex);
        currIndex -= 1;
        temp = arr[currIndex];
        arr[currIndex] = arr[randIndex];
        arr[randIndex] = temp;
    }

    return arr;
    
}

// Shuffe the cards when the page loads

document.body.onload = startGame();

// The function that starts the game and shuffles the cards when the game loads

function startGame() {
    // Reset openCards value
    openedCards = [];

    // Shuffle the cards
    cards1 = shuffle(cards1);
    cards2 = shuffle(cards2);
    cards3 = shuffle(cards3);
    // console.log(cards);

    // Clear out all the classes the cards might have
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        row1.innerHTML = "";
        row2.innerHTML = "";
        row3.innerHTML = "";
        [].forEach.call(cards1, (item) => {
            row1.appendChild(item)
        });
        [].forEach.call(cards2, (item) => {
            row2.appendChild(item)
        });
        [].forEach.call(cards3, (item) => {
            row3.appendChild(item)
        });
        deck.appendChild(row1);
        deck.appendChild(row2);
        deck.appendChild(row3);
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // console.log(cards);
    moves = 0;
}

// Toggle between classes to show the cards

var toggleCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}

// Check for the match between the pair of cards that have been opened
function cardPair() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2) {
        moveCounter();
        if(openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}

// When a mayched pair occurs

function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}

// When an unmatched pair occurs

function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1000);
}

// Function to temporarly disbale the cards
function disable() {
    Array.prototype.filter.call(cards, (card) => {
        card.classList.add("disabled");
    })
}

// Function to enable the cards that are unmatched and diable the ones that are matched
function enable() {
    Array.prototype.filter.call(cards, (card) => {
        card.classList.remove("disabled")
        for(let i = 0; i < matchedCards.length; i++) {
            matchedCards[i].classList.add("disabled")
        }
    })
}

// Count the players moves
function moveCounter() {
    moves++;
}

// When all cards are matched and the game is over
function congratulations() {
    if(matchedCards.length === 18) {
        let score = 0, msg;
        modal.classList.add("show");
        document.getElementById("finalMove").innerHTML = moves;
        if(moves > 1 && moves < 16) {
            score = 30;
            msg = "You got the perfect score, your memory is amazing 😎"
        } else if (moves > 17 && moves < 26) {
            score = 20;
            msg = "You got a decent score, your memory is good 😄"
        } else {
            score = 10;
            msg = "You got the lowest score possible, you have to work on your memory skills 🥲"
        }

        document.getElementById("finalScore").innerHTML = score;
        document.getElementById("finalMsg").innerHTML = msg;
    }
}

// Play again

function playAgain() {
    modal.classList.remove("show")
    startGame();
}

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", toggleCard);
    card.addEventListener("click", cardPair);
    card.addEventListener("click", congratulations);
    console.log(matchedCards)
};