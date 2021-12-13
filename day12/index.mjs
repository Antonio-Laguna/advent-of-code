import readFile from '../utils/read-file.mjs';

const input = await readFile('day12/input.txt')
  .then(raw => raw.split('\n'))
  .then(array => array.filter(line => !!line));

class Node {
  constructor(id) {
    this.id = id;
    this.isRepeatable = id !== 'start' && id !== 'end' && id.toUpperCase() === id;
    this.nodes = [];
  }
}

const nodes = {
  start: new Node('start'),
  end: new Node('end'),
};

input.forEach(pair => {
  const [idA, idB] = pair.split('-');

  if (!nodes[idA]) {
    nodes[idA] = new Node(idA);
  }

  if (!nodes[idB]) {
    nodes[idB] = new Node(idB);
  }

  nodes[idA].nodes.push(nodes[idB]);
  nodes[idB].nodes.push(nodes[idA]);
});


function walkPath(node, paths, currentPath = '') {
  const pathFragment = currentPath ? `${currentPath},${node.id}` : node.id;

  if (node.id === 'end') {
    paths.push(pathFragment);
    return;
  }

  node.nodes.forEach(child => {
    const canWalk = child.isRepeatable || !pathFragment.includes(child.id);

    if (canWalk) {
      walkPath(child, paths, pathFragment);
    }
  });
}

function walkPathWithSmallCaveTwice(node, paths, currentPath = '') {
  let pathFragment = currentPath ? `${currentPath},${node.id}` : node.id;

  if (node.id === 'end') {
    paths.push(pathFragment);
    return;
  }

  node.nodes.forEach(child => {
    if (child.isRepeatable) {
      return walkPathWithSmallCaveTwice(child, paths, pathFragment);
    }

    const isNodeIncluded = pathFragment.includes(child.id);
    const isStartNode = child.id === 'start';

    if (isStartNode) {
      return;
    }

    if (!isNodeIncluded) {
      return walkPathWithSmallCaveTwice(child, paths, pathFragment);
    }

    if (isNodeIncluded && !pathFragment.startsWith('##')) {
      walkPathWithSmallCaveTwice(child, paths, `##${pathFragment}`);
    }
  });
}


function calculatePaths(nodes) {
  const paths = [];
  const pathsWithSmallCaveTwice = [];

  walkPath(nodes.start, paths);
  walkPathWithSmallCaveTwice(nodes.start, pathsWithSmallCaveTwice);

  console.log('There are %d possible paths', paths.length);
  console.log('There are %d possible paths if you enter a small cave at most twice per route', pathsWithSmallCaveTwice.length);
}

calculatePaths(nodes);
