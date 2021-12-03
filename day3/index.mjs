import readFile from '../utils/read-file.mjs';

const input = await readFile('day3/input.txt');
const [firstNumber] = input.split('\n');
const numbers = new Array(firstNumber.length).fill(0);

input.split('\n').forEach(line => {
  if (line) {
    let i = line.length;

    while (i--) {
      let outcome = 0;

      if (line[i] === '0') {
        outcome = -1;
      } else {
        outcome = 1;
      }

      numbers[i] += outcome;
    }
  }
});

const [gamma, epsilon] = numbers.reduce((previous, current) => {
  const [g, e] = previous;
  const a = current > 0 ? '1' : '0';
  const b = current > 0 ? '0' : '1';
  return [`${g}${a}`, `${e}${b}`]
}, ['', '']);

const gammaRate = parseInt(gamma, 2);
const epsilonRate = parseInt(epsilon, 2);

console.log('Gamma rate is %d', gammaRate);
console.log('Epsilon rate is %d', epsilonRate);
console.log('Consumption rate is %d', gammaRate * epsilonRate);
