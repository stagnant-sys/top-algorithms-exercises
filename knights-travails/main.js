const Node = (coord) => {
  return {
    coord,
    possibleMoves() {
      return {
        LU: move([-2, 1], this.coord),
        UL: move([-1, 2], this.coord),
        UR: move([1, 2], this.coord),
        RU: move([2, 1], this.coord),
        LD: move([-2, -1], this.coord),
        DL: move([-1, -2], this.coord),
        DR: move([1, -2], this.coord),
        RD: move([2, -1], this.coord),
      };
    },
  };
};

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


let testNode = Node([0,0]);

/*
possibleMoves['LU'], possibleMoves['UL'], possibleMoves['UR'], possibleMoves['RU'], possibleMoves['LD'], possibleMoves['DL'], possibleMoves['DR'], possibleMoves['RD']
  Créer un arbre qui commence au point de départ donné. Tester chaque déplacement, si valide créer un node avec les nouvelles coordonnées. Recursion pour chaque node.
  Si une position d'arrivée est identique à celle d'un node existant, repartir depuis ce node
*/