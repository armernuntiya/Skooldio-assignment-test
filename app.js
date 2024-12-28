const readline = require("readline-sync");

const Card = {
  name: String,
  value: Number,
};

const Deck = {
  cards: [],
  init: function () {
    cards = [];
    const suit = ["Clubs", "Hearts", "Diamonds", "Spades"];
    const symbol = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];

    suit.forEach((s) => {
      symbol.forEach((v) => {
        let card = Object.create(Card);
        card.name = `${s}-${v}`;
        if (v === "Ace") {
          card.value = 1;
        } else if (v === "Jack" || v === "Queen" || v === "King") {
          card.value = 0;
        } else {
          card.value = Number(v);
        }
        this.cards.push(card);
      });
    });
    this.shuffle();
  },
  shuffle: function () {
    this.cards.sort(() => Math.random() - 0.5);
  },
  draw: function () {
    return this.cards.pop();
  },
};

const Player = {
  name: String,
  chips: 0,
  hand: [],
  draw: function (deck) {
    this.hand.push(deck.draw());
  },
  showHand: function () {
    let hand = this.hand.map((card) => card.name).join(", ");
    console.log(`${this.name} got ${hand}`);
  },
  score: function () {
    return this.hand.reduce((acc, card) => (acc + card.value) % 10, 0);
  },
};

function inputBet() {
  let inputBet = readline.question();
  while (isNaN(inputBet) || Number(inputBet) <= 0) {
    console.log("Invalid input, please put positive number");
    inputBet = readline.question();
  }
  return Number(inputBet);
}

function inputPlay() {
  let inputPlay = readline.question().toLowerCase();
  while (inputPlay !== "yes" && inputPlay !== "no") {
    console.log("Invalid input, please put Yes or No");
    inputPlay = readline.question().toLowerCase();
  }
  return inputPlay;
}

function playRound(player, dealer, bet) {
  if (player.score() > dealer.score()) {
    console.log("You won!!!, received ", bet, " chips");
    player.chips += bet;
  } else if (player.score() == dealer.score()) {
    console.log("You tie, no received any chips");
  } else {
    console.log("You lost, lost ", bet, " chips");
    player.chips -= bet;
  }
}

function main() {
  let play = "yes";
  let bet = 0;

  let player = Object.create(Player);
  player.name = "You";

  let dealer = Object.create(Player);
  dealer.name = "The dealer";

  let deck = Object.create(Deck);

  while (play === "yes") {
    console.log("Please put your bet");
    bet = inputBet();

    deck.init();

    player.hand = [];
    dealer.hand = [];

    player.draw(deck);
    player.draw(deck);

    dealer.draw(deck);
    dealer.draw(deck);

    playRound(player, dealer, draw, bet);

    console.log("Wanna play more (Yes/No)?");
    play = inputPlay;
  }
  console.log("You got total ", player.chips, " chips");
}

main();

module.exports = { main, inputBet, playRound, Player, Deck };
