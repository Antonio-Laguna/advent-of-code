import readFile from '../utils/read-file.mjs';

const input = await readFile('day11/input.txt')
  .then(raw => raw.split('\n'))
  .then(array => array.filter(line => !!line))
  .then(array => array
    .map(line => line.split('').map(Number))
  );

function flashOctopus(i, j, numbers) {
  return [
    [i, j],
    increaseOctopusLight(i - 1, j - 1, numbers),
    increaseOctopusLight(i - 1, j, numbers),
    increaseOctopusLight(i - 1, j + 1, numbers),
    increaseOctopusLight(i, j - 1, numbers),
    increaseOctopusLight(i, j + 1, numbers),
    increaseOctopusLight(i + 1, j - 1, numbers),
    increaseOctopusLight(i + 1, j, numbers),
    increaseOctopusLight(i + 1, j + 1, numbers),
  ].filter(a => a.length);
}

function increaseOctopusLight(i, j, numbers) {
  const octopus = numbers?.[i]?.[j];

  if (typeof octopus === 'number') {
    numbers[i][j]++;

    if (numbers[i][j] === 10) {
      return flashOctopus(i, j, numbers);
    }
  }

  return [];
}

function passDay(numbers) {
  const flashed = new Set();

  numbers.forEach((row, i) => {
    row.forEach((octopus, j) => {
      increaseOctopusLight(i, j, numbers).forEach(array => {
        const increasedPairs = array.flat(Infinity);
        let i = increasedPairs.length;

        while (i) {
          const key = `${increasedPairs[i - 2]},${increasedPairs[i - 1]}`;
          flashed.add(key);

          i = i - 2;
        }
      });
    });
  });

  flashed.forEach(keyPair => {
    const [i,j] = keyPair.split(',').map(Number);
    numbers[i][j] = 0;
  });

  return flashed.size;
}

function countFlashesForTurns(turns, numbers) {
  let flashes = 0;

  for (let i = 0; i < turns; i++) {
    flashes += passDay(numbers);
  }

  console.log('There were %d flashes after %d turns', flashes, turns);
}

function calculateSyncTurn(numbers) {
  let i = 0;

  while (true) {
    const flashedOctopuses = passDay(numbers);

    if (flashedOctopuses === 100) {
      break;
    }

    i++;
  }

  console.log('Octopuses sync on day %d', i + 1);
}

countFlashesForTurns(100, JSON.parse(JSON.stringify(input)));
calculateSyncTurn(JSON.parse(JSON.stringify(input)));
