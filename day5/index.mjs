import readFile from '../utils/read-file.mjs';

const input = await readFile('day5/input.txt')
  .then(raw => raw.split('\n'))
  .then(array => array.filter(line => !!line));
const numberRegex = /\d+/g;

function calculateSolution(data, diagonal = false) {
  const points = [];

  const markPoint = (x, y) => {
    if (typeof points[y] === 'undefined') {
      points[y] = [];
    }

    points[y][x] = ( points[y][x] || 0 ) + 1;
  };

  data.forEach(vectorString => {
    const [x1, y1, x2, y2] = vectorString.match(numberRegex).map(Number);
    const horizontal = x1 === x2;
    const vertical = y1 === y2;

    if (horizontal) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        markPoint(x1, y);
      }
    } else if (vertical) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        markPoint(x, y1);
      }
    } else if (diagonal) {
      const deltaX = x1 < x2 ? 1 : -1;
      const deltaY = y1 < y2 ? 1 : -1;
      const iterations = Math.abs(x1 - x2);

      for (let i = 0; i <= iterations; i++) {
        const x = x1 + (deltaX * i);
        const y = y1 + (deltaY * i);
        markPoint(x, y);
      }
    }
  });

  return points.flat().filter(n => n > 1).length;
}

console.log('You got %d points without diagonals', calculateSolution(input, false));
console.log('You got %d points with diagonals', calculateSolution(input, true));
