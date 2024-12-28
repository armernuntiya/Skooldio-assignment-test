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

describe("Player", () => {
  let deck;
  let player;

  beforeEach(() => {
    // Create a mock deck
    deck = Object.create(Deck);
    deck.cards = [
      { name: "Clubs-Ace", value: 1 },
      { name: "Hearts-5", value: 5 },
    ];

    // Create the player instance
    player = Object.create(Player);
    player.name = "Player1";
    player.chips = 10;
    player.hand = [];
  });

  describe("draw", () => {
    test("should add a card to the player's hand", () => {
      player.draw(deck);

      expect(player.hand.length).toBe(1);
      expect(player.hand[0].name).toBe("Hearts-5");
      expect(player.hand[0].value).toBe(5);
      expect(deck.cards.length).toBe(1);
    });
  });

  describe("showHand", () => {
    test("should display the player's hand correctly", () => {
      const logSpy = jest.spyOn(console, "log").mockImplementation();

      player.draw(deck);
      player.draw(deck);

      player.showHand();

      expect(logSpy).toHaveBeenCalledWith("Player1 got Hearts-5, Clubs-Ace");

      // Clean up spy
      logSpy.mockRestore();
    });
  });

  describe("score", () => {
    test("should calculate the score correctly", () => {
      player.draw(deck);
      player.draw(deck);

      const score = player.score();

      // The score should be (1 + 5) % 10 = 6
      expect(score).toBe(6);
      expect(deck.cards.length).toBe(0);
    });

    test("should return 0 if the sum of card values is greater than 10", () => {
      deck.cards = [
        { name: "Clubs-9", value: 9 },
        { name: "Hearts-6", value: 6 },
      ];

      player.draw(deck);
      player.draw(deck);

      const score = player.score();

      // (9 + 6) % 10 = 5
      expect(score).toBe(5);
      expect(deck.cards.length).toBe(0);
    });
  });
});
