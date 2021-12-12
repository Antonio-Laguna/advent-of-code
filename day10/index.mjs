import readFile from '../utils/read-file.mjs';

const input = await readFile('day10/input.txt')
  .then(raw => raw.split('\n'))
  .then(array => array.filter(line => !!line));

const IllegalScore = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const AutocompleteScore = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const Closing = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

function parseLine(line) {
  let illegal;
  const starts = [];
  const max = line.length;

  for (let i = 0; i < max && !illegal; i++) {
    const currentChar = line[i];
    const isOpening = typeof Closing[currentChar] !== 'undefined';

    if (isOpening) {
      starts.push(currentChar);
    } else {
      const currentStart = starts[starts.length - 1];
      const correctStart = Closing[currentStart];

      if (correctStart !== currentChar) {
        illegal = currentChar;
      } else {
        starts.pop();
      }
    }
  }

  return [illegal, starts];
}

function solve(input) {
  let illegalScore = 0;
  let autocompleteScores = [];

  input.forEach(line => {
    const [illegal, starts] = parseLine(line);

    if (illegal) {
      illegalScore += IllegalScore[illegal];
    } else {
      const solutionForStart = starts.reverse().map(open => Closing[open]);
      const lineScore = solutionForStart.reduce((accumulated, current) => {
        const score = AutocompleteScore[current];
        return (accumulated * 5) + score
      }, 0);
      autocompleteScores.push(lineScore);
    }
  });

  autocompleteScores = autocompleteScores.sort((a, b) => a - b);
  const middlePoint = Math.floor(autocompleteScores.length / 2);
  const middleScore = autocompleteScores[middlePoint];

  console.log('Illegal score is %d', illegalScore);
  console.log('Middle autocomplete score is %d', middleScore);
}

solve(input)
