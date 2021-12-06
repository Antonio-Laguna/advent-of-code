import readFile from '../utils/read-file.mjs';

const input = await readFile('day6/input.txt')
  .then(raw => raw.split('\n'))
  .then(array => array.filter(line => !!line))
  .then(array => array[0].split(',').map(Number));

const MAX_TIMER = 8;
const TIMER_AFTER_BREED = 6;

function simulateDays(daysAmount, input) {
  const fishes = input.slice(0);
  let fishCount = new Array(MAX_TIMER + 1).fill(0);

  fishes.forEach(fish => {
    fishCount[fish]++;
  })

  for (let day = 0; day < daysAmount; day++) {
    const newCount = new Array(MAX_TIMER + 1).fill(0);

    fishCount.forEach((fishCount, i) => {
      if (fishCount) {
        if (i > 0) {
          newCount[i - 1] += fishCount;
        } else {
          newCount[TIMER_AFTER_BREED] += fishCount;
          newCount[MAX_TIMER] += fishCount;
        }
      }
    });

    fishCount = newCount;
  }

  return fishCount.reduce((a, b) => a + b, 0);
}

console.log('There are %d fishes after %d days', simulateDays(80, input), 80);
console.log('There are %d fishes after %d days', simulateDays(256, input), 256);
