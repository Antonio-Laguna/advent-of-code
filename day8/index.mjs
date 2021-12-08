import readFile from '../utils/read-file.mjs';

const input = await readFile('day8/input.txt')
  .then(raw => raw.split('\n'))
  .then(array => array.filter(line => !!line));

const SEGMENTS_0 = 'abcefg';
const SEGMENTS_1 = 'cf';
const SEGMENTS_2 = 'acdeg';
const SEGMENTS_3 = 'acdfg';
const SEGMENTS_4 = 'bcdf';
const SEGMENTS_5 = 'abdfg';
const SEGMENTS_6 = 'abdefg';
const SEGMENTS_7 = 'acf';
const SEGMENTS_8 = 'abcdefg';
const SEGMENTS_9 = 'abcdfg';
const COMMON_SIGNALS_LENGTH = [
  SEGMENTS_1.length,
  SEGMENTS_4.length,
  SEGMENTS_7.length,
  SEGMENTS_8.length,
];

function countEasyDigits(input) {
  let count = 0;

  input.forEach(line => {
    const [,numbers] = line.split(' | ');
    const amount = numbers.split(' ')
      .filter(numberSignal => COMMON_SIGNALS_LENGTH.includes(numberSignal.length))
      .length;

    count += amount;
  });

  return count;
}

function decodeConfig(config, numbers) {
  const chunks = config.split(' ');
  const signals = new Array(10);

  signals[1] = chunks.find(signal => signal.length === SEGMENTS_1.length);
  signals[4] = chunks.find(signal => signal.length === SEGMENTS_4.length);
  signals[7] = chunks.find(signal => signal.length === SEGMENTS_7.length);
  signals[8] = chunks.find(signal => signal.length === SEGMENTS_8.length);
  // 3 and 7 share all but two segments
  signals[3] = chunks.find(signal => {
    if (signal.length !== SEGMENTS_3.length) {
      return false;
    }

    return signal.split('').filter(letter => !signals[7].includes(letter)).length === 2;
  });
  // 5 and 4 share all but two segments
  signals[5] = chunks.find(signal => {
    if (signal.length !== SEGMENTS_5.length || signal === signals[3]) {
      return false;
    }

    return signal.split('').filter(letter => !signals[4].includes(letter)).length === 2;
  });
  // Now we can rule out number 2
  signals[2] = chunks.find(signal => signal.length === SEGMENTS_2.length && signal !== signals[3] && signal !== signals[5]);
  // 1 and 6 only share one segment
  signals[6] = chunks.find(signal => {
    if (signal.length !== SEGMENTS_6.length) {
      return false;
    }

    return signal.split('').filter(letter => !signals[1].includes(letter)).length === SEGMENTS_6.length - 1;
  });
  // 9 and 4 share all but two segments
  signals[9] = chunks.find(signal => {
    if (signal.length !== SEGMENTS_9.length || signal === signals[6]) {
      return false;
    }

    return signal.split('').filter(letter => !signals[4].includes(letter)).length === 2;
  });
  // Now we can rule out number 0
  signals[0] = chunks.find(signal => signal.length === SEGMENTS_0.length && signal !== signals[6] && signal !== signals[9]);
  const orderedSignals = signals.map(signal => signal.split('').sort().join(''));

  let finalNumber = '';

  numbers.split(' ').forEach(number => {
    const orderedNumber = number.split('').sort().join('');
    finalNumber = `${finalNumber}${orderedSignals.indexOf(orderedNumber)}`;
  });

  return parseInt(finalNumber, 10);
}

function countDigits(input) {
  let count = 0;

  input.forEach(line => {
    const [config,numbers] = line.split(' | ');
    count += decodeConfig(config, numbers);
  });

  return count;
}

console.log('There are %d instances of 1,4,7 or 8', countEasyDigits(input));
console.log('The sum is %d', countDigits(input));
