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

jest.mock("../app", () => {
  return {
    Deck: {
      cards: [],
      init: jest.fn(),
      shuffle: jest.fn(),
    },
  };
});

describe("Deck", () => {
  describe("init", () => {
    test("should create a deck of 52 cards with correct values", () => {
      const deck = Object.create(Deck);
      deck.init();

      expect(deck.cards.length).toBe(52);

      deck.cards.forEach((card) => {
        expect(card.name).toMatch(
          /(Clubs|Hearts|Diamonds|Spades)-(Ace|2|3|4|5|6|7|8|9|10|Jack|Queen|King)/
        );
      });
    });
  });

  describe("shuffle", () => {
    test("should randomize the card order", () => {
      const deck = Object.create(Deck);
      deck.init();

      const originalDeck = [...deck.cards];

      deck.shuffle();

      expect(deck.cards).not.toEqual(originalDeck);
    });
  });
});
