console.log("Blackjack 2021");

let rulesModal = document.getElementById("rulesModal")
let rulesBtn = document.getElementById("rulesBtn")
let closeBtn = document.getElementsByClassName("close")

rulesBtn.onclick = function() {
  rulesModal.style.display = "block";
}

// I need to be able to use the close button. Currently, it is unusable!//
closeBtn.onclick = function() {
  rulesModal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == rulesModal) {
    rulesModal.style.display = "none";
  }
}

const varStore = []; //this idea was taken from  <https://codepen.io/eqmvii/pen/GmRmZa> to keep the code clean and readable

varStore.playerCards = document.getElementById('playerCards');
varStore.dealerCards = document.getElementById('dealerCards');
varStore.hitBtn = document.getElementById('hit');
varStore.stayBtn = document.getElementById('stay');
varStore.playBtn = document.getElementById('play');
varStore.textBox = document.getElementById('textBox');
varStore.btns = document.getElementById('gameBtns');
varStore.playerHandtext = document.getElementById('playerHand');
varStore.dealerHandtext = document.getElementById('dealerHand');
varStore.score = document.getElementById('score');
varStore.newgame = document.getElementById('newgame');

// initialize variables
varStore.playerHand = [];
varStore.dealerHand = [];
varStore.deck = [];
varStore.suits = ['<span class="bold">&#9827</span>', '<span class="redcard">&#9830</span>', ' <span class="redcard">&#9829</span>', ' <span class="bold">&#9824</span>'];
varStore.values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
varStore.status = 0;
varStore.wins = 0;
varStore.draws = 0;
varStore.losses = 0;
varStore.games = 0;

function card(suit, value, name){
    this.suit = suit;
    this.value = value;
    this.name = name;
};


let newGame = function () {
    // remove newgame button and show hit/stay buttons
    varStore.newgame.classList.add("hidden");
    varStore.dealerCards.innerHTML = "";
    varStore.dealerCards.innerHTML = "";
    varStore.playerHand = [];
    varStore.dealerHand = [];
    varStore.status = 0;


    varStore.deck = createDeck();

    // Deal two cards to the player and two cards to the dealer
    varStore.playerHand.push(varStore.deck.pop());
    varStore.playerHand.push(varStore.deck.pop());

    // check for player victory
    if (handTotal(varStore.playerHand) === 21)
    {
        varStore.wins += 1;
        varStore.games += 1;
        varStore.status = 1;
        drawHands();
        varStore.textBox.innerHTML = "";
        track();
        alert("BlackJack! You win!")
        varStore.status = 2;
        return;
    }

    varStore.dealerHand.push(varStore.deck.pop());
    varStore.dealerHand.push(varStore.deck.pop());

    // check for dealer victory
    if (handTotal(varStore.dealerHand) === 21)
    {
        varStore.games += 1;
        varStore.losses += 1;
        varStore.status = 1;
        drawHands();
        varStore.textBox.innerHTML = "You lost! The dealer had BlackJack.";
        track();
        varStore.status = 2;
        return;
    }

    // draw the hands if no one won
    drawHands();

    varStore.btns.classList.remove("hidden"); // show hit/stay buttons
    varStore.textBox.innerHTML = "Cards are ready!";

};

let createDeck = function () {
    let deck = [];
    for (let a = 0; a < varStore.suits.length; a++) {
        for (let b = 0; b < varStore.values.length; b++) {
            let cardValue = b + 1;
            let cardTitle = "";
            if (cardValue > 10){
                cardValue = 10;
            }
            if (cardValue != 1) {
                cardTitle += (varStore.values[b] + " of " + varStore.suits[a] + " (" + cardValue + ")");
            }
            else
            {
                cardTitle += (varStore.values[b] + " of " + varStore.suits[a] + " (" + cardValue + " or 11)");
            }
            let newCard = new card(varStore.suits[a], cardValue, cardTitle);
            deck.push(newCard);


        }
    }
    deck = shuffle(deck);
    return deck;
};

let drawHands = function () {
    let htmlswap = "";
    let ptotal = handTotal(varStore.playerHand);
    let dtotal = handTotal(varStore.dealerHand);
    htmlswap += "<ul>";
    for (let i = 0; i < varStore.playerHand.length; i++)
    {
        htmlswap += "<li>" + varStore.playerHand[i].name + "</li>";
    }
    htmlswap += "</ul>"
    varStore.playerCards.innerHTML = htmlswap;
    varStore.playerHandtext.innerHTML = "Player Hand (" + ptotal + ")";
    if (varStore.dealerHand.length == 0)
    {
        return;
    }

    htmlswap = "";
    if (varStore.status === 0)
    {
        htmlswap += "<ul><li>[Hidden Card]</li>";
        varStore.dealerHandtext.innerHTML = "Dealer Hand (" + varStore.dealerHand[1].value + " + hidden)";
    }
    else
    {
        varStore.dealerHandtext.innerHTML = "Dealer Hand (" + dtotal + ")";
    }

    for (let i = 0; i < varStore.dealerHand.length; i++) {

        if (varStore.status === 0)
        {
            i += 1;
        }
        htmlswap += "<li>" + varStore.dealerHand[i].name + "</li>";
    }
    htmlswap += "</ul>"
    varStore.dealerCards.innerHTML = htmlswap;
};

let handTotal = function (hand) {
    let total = 0;
    let ace = 0;
    for (let i = 0; i < hand.length; i++) {
        total += hand[i].value;
        if (hand[i].value == 1)
        {
            ace += 1;
        }
    }

    for (let j = 0; j < ace; j++)
    {
        if (total + 10 <= 21)
        {
            total +=10;
        }
    }
    return total;
}

// Shuffle the new deck
let shuffle = (deck)=> {
    let shuffledDeck = [];
    for (let a = 0; a < deck.length; a++){
        let randomCard = Math.floor(Math.random()*deck.length)
        shuffledDeck.push(deck[randomCard]);
    }
    return shuffledDeck;
  }

//Starting Game
varStore.playBtn.addEventListener("click", newGame);

// Hit button
varStore.hitBtn.addEventListener("click", function () {
    // disable if the game is won
    if (varStore.status === 2)
    {
        return;
    }

    varStore.playerHand.push(varStore.deck.pop());
    drawHands();


    let handVal = handTotal(varStore.playerHand);
    if (handVal > 21)
    {
        bust();

        return;
    }
    else if (handVal === 21)
    {
        cheers();

        return;
    }

    varStore.textBox.innerHTML = "Hit or Stay?</p>";
    return;
});

// Stay button
varStore.stayBtn.addEventListener("click", function stayLoop() {
    if (varStore.status === 2)
    {
        return;
    }
    else if (varStore.status === 0)
    {
        varStore.btns.classList.add("hidden");
        let handVal = handTotal(varStore.dealerHand);
        varStore.status = 1;
        drawHands();
        setTimeout(stayLoop, 600);
    }
    else if (varStore.status === 1) {

    let handVal = handTotal(varStore.dealerHand);
    if (handVal > 17 && handVal <= 21) // dealer stays
    {
        drawHands();
        let playerVal = handTotal(varStore.playerHand);
        if (playerVal > handVal)
        {
            cheers();
            return;
        }
        else if (playerVal < handVal)
        {
            bust();
            return;
        }
        else
        {
            tie();
            return;
        }
    }
    if (handVal > 21)
    {
        cheers();
        return;
    }
    else // hit
    {
        varStore.textBox.innerHTML = "Dealer hit!";
        varStore.dealerHand.push(varStore.deck.pop());
        drawHands();
        setTimeout(stayLoop, 800);
        return;
    }
    }
});

let cheers = function () {
    varStore.wins += 1;
    varStore.games += 1;
    let explanation = "";
    varStore.status = 2; // flag that the game is over
    let playerTotal = handTotal(varStore.playerHand);
    let dealerTotal = handTotal(varStore.dealerHand);
    if (playerTotal === 21)
    {
        explanation = "You have BlackJack!";
    }
    else if (dealerTotal > 21)
    {
        explanation = "Dealer BUST!";
    }
    else
    {
        explanation = "You have " + playerTotal + " and the dealer has " + dealerTotal + ".";
    }
    varStore.textBox.innerHTML = "You won!<br>" + explanation + "<br>Press New Game Button";
    track();
}

let bust = function () {
    varStore.games += 1;
    varStore.losses += 1;
    let explanation = "";
    varStore.status = 2; //game over status
    let playerTotal = handTotal(varStore.playerHand);
    let dealerTotal = handTotal(varStore.dealerHand);
    if (playerTotal > 21)
    {
        explanation = "You BUST!";
    }
    varStore.textBox.innerHTML =  "<br>Press 'New Game' to play again.";
    track();
}

let tie = function () {
    varStore.games += 1;
    varStore.draws += 1;
    let explanation = "";
    varStore.status = 2;
    let playerTotal = handTotal(varStore.playerHand);
    varStore.textBox.innerHTML = "You and Dealer TIE! <br>Press 'New Game' to play again.";
    track();
}

// update the win/loss counter
let track = function () {
    varStore.score.innerHTML = "<p>Wins: " + varStore.wins + "<br> Draws: " + varStore.draws + " <br>Losses: " + varStore.losses + "</p>";
    varStore.newgame.classList.remove("hidden");
    varStore.btns.classList.add("hidden");
}

// check the player hand for an ace
let softCheck = function (hand) {
    let total = 0;
    let ace = 0; // track the number of aces in the hand
    for (let i = 0; i < hand.length; i++) {
        total += hand[i].value;
        if (hand[i].value == 1) {
            ace += 1;
        }
    }
    // For each ace in the hand, add 10 if doing so won't cause a bust
    for (let j = 0; j < ace; j++) {
        if (total + 10 <= 21) {
            return true;
        }
    }
    return false;
}
