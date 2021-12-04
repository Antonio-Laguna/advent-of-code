import readFile from '../utils/read-file.mjs';

const lineToNumbers = (line) => {
  const cleanedLine = line.replace(/,/g, ' ');
  return cleanedLine.split(' ').filter(n => !!n).map(n => parseInt(n, 10));
};

class BingoCard {
  constructor() {
    this.lines = [];
    this.numbers = [];
    this.matchingNumbers = [];
    this.combinations = [];
    this.won = false;
  }

  addNumbers(line) {
    this.lines.push(line);

    if (this.lines.length === 5) {
      this.parseCard();
    }
  }

  parseCard() {
    this.lines.forEach((line, i) => {
      this.numbers = this.numbers.concat(...line);
      this.combinations.push(line);
      const column = [];

      for (let j = 0; j < 5; j++) {
        column.push(this.lines[j][i]);
      }

      this.combinations.push(column);
    });
  }

  playNumber(number) {
    if (!this.won && this.numbers.includes(number)) {
      this.matchingNumbers.push(number);
    }

    if (this.matchingNumbers.length > 4) {
      this.won = !!this.combinations.find(numbers => numbers.every(n => this.matchingNumbers.includes(n)));
    }
  }

  winningPlay() {
    const lastPlayed = this.matchingNumbers[this.matchingNumbers.length - 1];
    const numbers = this.numbers
      .filter(n => !this.matchingNumbers.includes(n))
      .reduce((a, b) => a + b, 0);

    return lastPlayed * numbers;
  }
}

const input = await readFile('day4/input.txt').then(r => r.split('\n'));
const numbers = lineToNumbers(input.shift());
let cards = [new BingoCard()];
let cardIndex = 0;

input.forEach(line => {
  if (!line) {
    return;
  }

  const currentCard = cards[cardIndex];
  const lineNumbers = lineToNumbers(line);
  currentCard.addNumbers(lineNumbers);

  if (currentCard.lines.length === 5) {
    cardIndex++;
    cards.push(new BingoCard());
  }
});

const winningCards = [];

for (let i = 0; i < numbers.length; i++) {
  const number = numbers[i];

  cards.slice(0).forEach(card => {
    card.playNumber(number);

    if (card.won) {
      winningCards.push(card);
      cards = cards.filter(c => !c.won);
    }
  });
}

console.log(winningCards[winningCards.length - 1].winningPlay());
