console.log("BlackJack 21: Let's Play!");
const suits = ['H','S','D','C']
const rank = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
// const value = [2,3,4,5,6,7,8,9,10,10,10,10]
let deck = []

const playerHand = []
const dealerHand = []
let win = 0
let lose = 0

class Card{
  constructor(rank,suit,name){
    this.rank= rank
    this.suit = suit
    this.name = name
  }
}

const newGame = ()=>{
  document.getElementById('newGame').classList.add("hidden")
  document.getElementById('dealerhand').innerHTML = ""
  document.getElementById('playerhand').innerHTML = ""

  let newDeck = newDeck()
  playerHand.push(newDeck.pop())
  playerHand.push(newDeck.pop())

  if(cardTotal(playerhand)===21){
    win +=1
    drawHands()
    return
  }
  dealerHand.push(newDeck.pop())
  dealerHand.push(newDeck.pop())

  if(cardTotal(dealerhand)===21){
    lose +=1
    drawHands()
    return
  }
  drawHands()
  document.getElementById('gameBtns').classList.remove("hidden")
}
let newDeck = () =>{
  let deck = []
  for (let i = 0;i<suits.length;i++){
    for (let j = 0; j< rank.length;j++){
    // console.log(suits[i] + rank[j]);
      let cardName =""
      let cardValue = j +1
      if (cardValue>10) { cardValue = 10 }
      if (cardValue!= 1) { cardName+= rank[j] +suits[i] + cardValue}
      else { cardName+= rank[j]+suits[i]+ cardValue + " or 11" }
      let newCard = new Card (cardValue,suits[i],cardName)
      deck.push(newCard)
      }
    }
    // console.log(deck);

  const shuffle =(deck)=>{
    let shuffledDeck = []
    for (let i = 0; i < deck.length; i++) {
      let randomCard = Math.floor(Math.random() *deck.length)
      shuffledDeck.push(deck[randomCard])
      }
    console.log(shuffledDeck);
    return shuffledDeck
  }
    deck = shuffle(deck)
    return deck
    console.log(deck);
}
