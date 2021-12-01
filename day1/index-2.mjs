import readFile from '../utils/read-file.mjs';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class Letter {
  constructor(letter) {
    this.letter = letter;
    this.count = 0;
    this.previousLetter = null;
  }

  report(number) {
    this.count += number;
  }

  didIncrement() {
    return this.previousLetter && this.previousLetter.count < this.count;
  }
}

function* getLetter() {
  let index = -1;

  while (true) {
    index++;

    if (typeof LETTERS[index] !== 'string') {
      index = 0;
    }

    yield new Letter(LETTERS[index]);
  }
}

function getIndexesFromIndex(i) {
  const a = i - 2;
  const b = i - 1;
  const c = i;

  if (a >= 0 && b >= 0) {
    return [a, b, c];
  } else if (b >= 0) {
    return [b, c];
  } else {
    return [c];
  }
}

const input = await readFile('day1/input.txt');
const numbers = input.split('\n').filter(line => !!line).map(line => parseInt(line, 10));
const letterGenerator = getLetter();
const letters = [];
let increments = 0;

for (let i = 0; i < numbers.length; i++) {
  const number = numbers[i];
  const indexes = getIndexesFromIndex(i);
  const { value: letter } = letterGenerator.next();
  letters.push(letter);
  letter.previousLetter = letters[i - 1];

  // Most of the cases
  if (indexes.length > 2) {
    const [a, b, c] = indexes;
    const leaving = letters[a];
    const previous = letters[b];
    const current = letters[c];

    leaving.report(number);
    previous.report(number);
    current.report(number);

    if (leaving.didIncrement()) {
      increments++;
    }
  } else {
    if (indexes.length === 2) {
      const previousLetter = letters[0];

      letter.report(number);
      previousLetter.report(number);
    } else {
      letter.report(number);
    }
  }
}

console.log('There were %d increments', increments);
