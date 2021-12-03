import readFile from '../utils/read-file.mjs';

const input = await readFile('day3/input.txt').then(l => l.split('\n').filter(l => !!l));

function filterByBite(numbers, i) {
  const ones = [];
  const zeroes = [];

  numbers.forEach(number => {
    if (number[i] === '1') {
      ones.push(number);
    } else {
      zeroes.push(number);
    }
  });

  const mostCommon = ones.length > zeroes.length ? ones : zeroes;
  const leastCommon = ones.length > zeroes.length ? zeroes : ones;

  return [mostCommon, leastCommon];
}

function gasFinder(numbers, keeper) {
  let oxygenNumbers = numbers.slice(0);
  const max = numbers[0].length;
  let i = 0;

  while (i < max && oxygenNumbers.length > 1) {
    const [most, least] = filterByBite(oxygenNumbers, i);

    if (most.length !== least.length) {
      oxygenNumbers = keeper === '1' ? most : least;
    } else {
      oxygenNumbers = oxygenNumbers.filter(n => n[i] === keeper);
    }

    i++;
  }

  if (oxygenNumbers.length !== 1) {
    throw new Error(':(');
  }

  return parseInt(oxygenNumbers[0], 2);
}

const oxygen = gasFinder(input, '1');
const co2 = gasFinder(input, '0');

console.log('Oxigen ->', oxygen);
console.log('C02 ->', co2);
console.log('Life Support Rating ->', oxygen * co2);
