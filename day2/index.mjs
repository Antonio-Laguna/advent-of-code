import readFile from '../utils/read-file.mjs';

const input = await readFile('day2/input.txt');
let x = 0;
let depth = 0;
let aim = 0;

input.split('\n').forEach(line => {
  if (!line) {
    return;
  }

  const [instruction,amount] = line.split(' ');
  const number = parseInt(amount, 10);

  switch ( instruction ) {
    case 'forward':
      x += number;
      depth += (number * aim);
      break;
    case 'down':
      aim += number;
      break;
    case 'up':
      aim -= number;
      break;
    default:
      console.log('Uncontrolled instruction %s', instruction);
  }
});

console.log('Horizontal position -> %d\nDepth position -> %d\nMultiplied -> %d', x, depth, x * depth);
