import readFile from '../utils/read-file.mjs';

const input = await readFile('day7/input.txt')
  .then(raw => raw.split('\n'))
  .then(array => array.filter(line => !!line))
  .then(array => array[0].split(',').map(Number));

function median(numbers) {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

function calculateFuelConsumptionForPosition(crabs, position) {
  let consumption = 0;

  crabs.forEach(crab => {
    consumption += Math.abs(crab - position);
  });

  return consumption;
}

function calculateProgressiveFuelConsumption(number) {
  let sum = 0;

  for (let i = 0; i < number; i++) {
    sum += i + 1;
  }

  return sum;
}

function calculateProgressiveFuelConsumptionForPosition(crabs, position) {
  let totalConsumption = 0;

  crabs.forEach(crab => {
    totalConsumption += calculateProgressiveFuelConsumption(Math.abs(crab - position));
  });

  return totalConsumption;
}

function calculateBestProgressiveFuelPosition(crabs) {
  const average = input.reduce((a, b) => a + b, 0) / input.length;
  const min = Math.floor(average);
  const max = Math.ceil(average);
  let consumption = Infinity;
  let bestPosition = -1;

  for (let i = min; i <= max; i++) {
    const stepConsumption = calculateProgressiveFuelConsumptionForPosition(crabs, i);

    if (stepConsumption < consumption) {
      consumption = stepConsumption;
      bestPosition = i;
    }
  }

  return [bestPosition, consumption];
}


const MEDIAN_POSITION = median(input);
const Day1Consumption = calculateFuelConsumptionForPosition(input, MEDIAN_POSITION);
const [Day2Position, Day2Consumption] = calculateBestProgressiveFuelPosition(input);

console.log('Optimum position %d. Consumption -> %d', MEDIAN_POSITION, Day1Consumption);
console.log('Optimum position %d. Progressive Consumption -> %d', Day2Position, Day2Consumption);
