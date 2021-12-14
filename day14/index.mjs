import readFile from '../utils/read-file.mjs';

const input = await readFile('day14/input.txt')
  .then(raw => raw.split('\n'))
  .then(array => array.filter(line => !!line));

const template = input.shift();
const compounds = {};

input.forEach(line => {
  const [compound, element] = line.split(' -> ');
  compounds[compound] = element;
});

function mixPolymer(polymer, compounds, amount) {
  const count = { [polymer[0]]: 1 };
  const mixedCompounds = {};

  for (let i = 1; i < polymer.length; ++i) {
    const char = polymer[i];
    const compoundKey = polymer[i - 1] + polymer[i];

    if (typeof count[char] === 'undefined') {
      count[char] = 0;
    }

    if (typeof mixedCompounds[compoundKey] === 'undefined') {
      mixedCompounds[compoundKey] = 0;
    }

    count[char]++;
    mixedCompounds[compoundKey]++;
  }

  console.log('Mixing the polymer for %d times', amount);

  for (let i = 0; i < amount; ++i) {
    const newCompounds = {};

    for (const compound in compounds) {
      if (mixedCompounds[compound]) {
        const element = compounds[compound];

        const compoundLeft = compound[0] + element;
        const compoundRight = element + compound[1];
        const compoundCount = mixedCompounds[compound];
        mixedCompounds[compound] = 0;

        if (typeof count[element] === 'undefined') {
          count[element] = 0;
        }

        count[element] = count[element] + compoundCount || compoundCount;
        newCompounds[compoundLeft] = newCompounds[compoundLeft] + compoundCount || compoundCount;
        newCompounds[compoundRight] = newCompounds[compoundRight] + compoundCount || compoundCount;
      }
    }

    for (const compound in newCompounds) {
      mixedCompounds[compound] = mixedCompounds[compound] + newCompounds[compound] || newCompounds[compound];
    }
  }

  const max = Math.max(...Object.values(count));
  const min = Math.min(...Object.values(count));

  console.log('The difference is %d', max - min);
  console.log();
}

mixPolymer(template, compounds, 10);
mixPolymer(template, compounds, 40);
