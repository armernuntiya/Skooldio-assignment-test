// const { inputBet, playRound } = require("../app");

// const Player = {
//   name: String,
//   chips: 0,
//   hand: [],
//   draw: function (deck) {
//     this.hand.push(deck.draw());
//   },
//   showHand: function () {
//     let hand = this.hand.map((card) => card.name).join(", ");
//     console.log(`${this.name} got ${hand}`);
//   },
//   score: function () {
//     return this.hand.reduce((acc, card) => (acc + card.value) % 10, 0);
//   },
// };

// describe("Game Logic Tests", () => {
//   test("Bet should return a valid bet", () => {
//     readline.question.mockReturnValue("10");

//     const bet = placeBet();
//     expect(bet).toBe(10);
//   });

//   test("placeBet should retry for invalid bet", () => {
//     readline.question
//       .mockReturnValueOnce("string")
//       .mockReturnValueOnce("0")
//       .mockReturnValueOnce("-5")
//       .mockReturnValueOnce("15");

//     const bet = placeBet();
//     expect(bet).toBe(15);
//   });

//   test("playRound should update player chips after winning", () => {
//     const player = Object.create(Player);
//     player.chips = 10;
//     player.hand = [
//       { name: "Diamonds-5", value: 5 },
//       { name: "Spades-4", value: 4 },
//     ];

//     const dealer = Object.create(Player);

//     dealer.hand = [
//       { name: "Clubs-3", value: 3 },
//       { name: "Hearts-7", value: 7 },
//     ];

//     const bet = 5;

//     playRound(player, dealer, deck, bet);

//     expect(player.chips).toBe(15);
//     expect(player.score).toBe(9);
//     expect(dealer.score).toBe(0);
//   });

//   test("playRound should not change chips on a tie", () => {
//     const player = Object.create(Player);
//     player.chips = 10;
//     player.hand = [
//       { name: "Clubs-3", value: 3 },
//       { name: "Hearts-7", value: 7 },
//     ];

//     const dealer = Object.create(Player);
//     dealer.hand = [
//       { name: "Diamonds-5", value: 5 },
//       { name: "Spades-5", value: 5 },
//     ];

//     const bet = 5;

//     playRound(player, dealer, deck, bet);

//     expect(player.chips).toBe(10);
//     expect(result.playerScore).toBe(0);
//     expect(result.dealerScore).toBe(0);
//   });

//   test("playRound should update player chips after losing", () => {
//     const player = Object.create(Player);
//     player.chips = 10;
//     player.hand = [
//       { name: "Clubs-3", value: 3 },
//       { name: "Hearts-7", value: 7 },
//     ];
//     const dealer = Object.create(Player);
//     dealer.hand = [
//       { name: "Diamonds-5", value: 5 },
//       { name: "Spades-4", value: 4 },
//     ];

//     const bet = 5;

//     playRound(player, dealer, bet);

//     expect(player.chips).toBe(15);
//     expect(player.score).toBe(0);
//     expect(dealer.score).toBe(9);
//   });
// });
