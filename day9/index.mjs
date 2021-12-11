import readFile from '../utils/read-file.mjs';

const input = await readFile('day9/input.txt')
  .then(raw => raw.split('\n'))
  .then(array => array.filter(line => !!line))
  .then(array => array.map(numbers => [...numbers].map(Number)));

function isLowPoint(x, i, j, numbers) {
  if (x === 9) {
    return false;
  }

  const left = typeof numbers[j]?.[i - 1] !== 'undefined' ? numbers[j][i - 1] : Infinity;
  const right = typeof numbers[j]?.[i + 1] !== 'undefined' ? numbers[j][i + 1] : Infinity;
  const top = typeof numbers[j - 1]?.[i] !== 'undefined' ? numbers[j - 1][i] : Infinity;
  const bottom = typeof numbers[j + 1]?.[i] !== 'undefined' ? numbers[j + 1][i] : Infinity;

  return Math.min(x, left, right, top, bottom) === x;
}

function getLowPoints() {
  const lowpoints = [];

  input.forEach((line, j) => {
    line.forEach((number, i) => {
      if (isLowPoint(number, i, j, input)) {
        lowpoints.push({
          number,
          j,
          i,
          basin: getBasinForPoint(j, i, input)
        });
      }
    });
  });

  return lowpoints;
}

function checkBasinPoint(j, i, input, points) {
  const point = input?.[j]?.[i];
  const key = `${j},${i}`;

  if (point > 8 || typeof point === 'undefined') {
    return;
  }

  if (points.includes(key)) {
    return;
  }

  points.push(key);

  checkBasinPoint(j, i - 1, input, points);
  checkBasinPoint(j, i + 1, input, points);
  checkBasinPoint(j - 1, i, input, points);
  checkBasinPoint(j + 1, i, input, points);
}

function getBasinForPoint(j, i, input) {
  const basinPoints = [];

  checkBasinPoint(j, i, input, basinPoints);

  return basinPoints;
}

function calculateSolution(input) {
  const lowPoints = getLowPoints(input).sort((a, b) => b.basin.length - a.basin.length);
  const largestBasins = lowPoints.slice(0, 3);

  const riskLevel = lowPoints.reduce((a, b) => a + b.number + 1, 0);
  const basinScore = largestBasins.reduce((a, b) => a * b.basin.length, 1);

  console.log('The risk level is %d', riskLevel);
  console.log('The basin score is %d', basinScore);
}

calculateSolution(input)
