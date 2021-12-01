import readFile from '../utils/read-file.mjs';

const input = await readFile('day1/input.txt');
const numbers = input.split('\n').filter(line => !!line).map(line => parseInt(line, 10));
let increments = 0;

for (let i = 1; i < numbers.length; i++) {
  const current = numbers[i];
  const previous = numbers[i - 1];

  if (current > previous) {
    increments++;
  }
}

console.log('There were %d increments', increments);
