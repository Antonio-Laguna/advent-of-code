import readFile from '../utils/read-file.mjs';

const input = await readFile('day2/input.txt');
let x = 0;
let y = 0;

input.split('\n').forEach(line => {
  if (!line) {
    return;
  }

  const [instruction,amount] = line.split(' ');
  const number = parseInt(amount, 10);

  switch ( instruction ) {
    case 'forward':
      x += number;
      break;
    case 'down':
      y += number;
      break;
    case 'up':
      y -= number;
      break;
    default:
      console.log('Uncontrolled instruction %s', instruction);
  }
});

console.log('Horizontal position -> %d\nVertical position -> %d\nMultiplied -> %d', x, y, x * y);
