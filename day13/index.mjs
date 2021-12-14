import readFile from '../utils/read-file.mjs';

const input = await readFile('day13/input.txt')
  .then(raw => raw.split('\n'))
  .then(array => array.filter(line => !!line));

const instructions = [];
const points = [];
let maxX = 0;
let maxY = 0;

function countPaperDots(paper) {
  return paper.flat().filter(n => n > 0).length;
}

input.forEach(line => {
  if (line.startsWith('fold')) {
    return instructions.push(line);
  } else {
    const [x, y] = line.split(',').map(Number);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    points.push([x,y]);
  }
});

const paper = new Array(maxY + 1).fill(null).map(() => new Array(maxX + 1).fill(0));

points.forEach(([x, y]) => {
  paper[y][x] = 1;
});

function horizontalFold(paper, foldY) {
  const newPaper = JSON.parse(JSON.stringify(paper));

  for (let y = foldY + 1; y < paper.length; y++) {
    const line = paper[y];

    line.forEach((point, x) => {
      if (point > 0) {
        const newY = (foldY * 2) - y;
        newPaper[newY][x] = 1;
      }
    });
  }

  return newPaper.slice(0, foldY);
}

function verticalFold(paper, foldX) {
  const newPaper = JSON.parse(JSON.stringify(paper));

  newPaper.forEach((line, y) => {
    for (let x = foldX + 1; x < line.length; x++) {
      const point = newPaper[y][x];

      if (point > 0) {
        const newX = (foldX * 2) - x;
        newPaper[y][newX] = 1;
      }
    }

    newPaper[y] = newPaper[y].slice(0, foldX);
  });

  return newPaper;
}

function followInstructions(instructions, paper) {
  let foldingPaper = paper;

  instructions.forEach(instruction => {
    const foldingFunction = instruction.includes('y') ? horizontalFold : verticalFold;
    const [,amount] = instruction.split('=').map(Number);
    console.log(instruction.replace('fold', 'folding'));
    foldingPaper = foldingFunction(foldingPaper, amount);
    console.log('There are now %d dots', countPaperDots(foldingPaper));
  });

  // Printing result on screen
  foldingPaper.forEach(line => {
    const chars = line.map(number => number > 0 ? '#' : '.');
    console.log(...chars);
  });
}

followInstructions(instructions, paper);
