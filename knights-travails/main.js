const Node = (root, possibleMoves) => {
  return {
    root,
    possibleMoves,
  };
};

function buildTree(root) {
  const moves = [move([-2, 1], root),move([-1, 2], root),move([1, 2], root),move([2, 1], root),move([-2, -1], root),move([-1, -2], root),move([1, -2], root),move([2, -1], root)];
  const rootNode = Node(root);
  let legalMovesArray = [];
  moves.forEach(el => {
    if (el === null) return;
    legalMovesArray.push(el);
  });
  rootNode.possibleMoves = legalMovesArray;
  return rootNode;

  /*moves.forEach(el => {
    if (el === null) return;
    const newNode = Node(el);
    newNode.possibleMoves = [move([-2, 1], el),move([-1, 2], el),move([1, 2], el),move([2, 1], el),move([-2, -1], el),move([-1, -2], el),move([1, -2], el),move([2, -1], el)];
    return newNode;
  })*;*/
}

const board = [
  [0,1,2,3,4,5,6,7],
  [0,1,2,3,4,5,6,7]
];

function setCoordinates (x, y) {
  return [board[0][x], board[1][y]];
}

function move (arr, currentPosition) {
  if (currentPosition[0] + arr[0] < 8 && currentPosition[1] + arr[1] < 8  && currentPosition[0] + arr[0] >= 0 && currentPosition[1] + arr[1] >= 0) {
    let newX = currentPosition[0] + arr[0];
    let newY = currentPosition[1] + arr[1];
    return [newX, newY];
    /*currentPosition[0] += arr[0];
    currentPosition[1] += arr[1];
    return currentPosition;*/
  } else {
    return null;
  }
}


let testNode = buildTree([0,0]);

/*
possibleMoves['LU'], possibleMoves['UL'], possibleMoves['UR'], possibleMoves['RU'], possibleMoves['LD'], possibleMoves['DL'], possibleMoves['DR'], possibleMoves['RD']
  Créer un arbre qui commence au point de départ donné. Tester chaque déplacement, si valide créer un node avec les nouvelles coordonnées. Recursion pour chaque node.
  Si une position d'arrivée est identique à celle d'un node existant, ignorer
  Si la position d'arrivée est identique à l'objectif, return, sinon continuer sur chaque déplacement possible


possibleMoves (this.root) {
  return [
    move([-2, 1], this.root),
    move([-1, 2], this.root),
    move([1, 2], this.root),
    move([2, 1], this.root),
    move([-2, -1], this.root),
    move([-1, -2], this.root),
    move([1, -2], this.root),
    move([2, -1], this.root)
  ];
}*/