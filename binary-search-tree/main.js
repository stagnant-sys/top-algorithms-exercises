let testArray = [1,2,5,3,4,8,7,6,9];

function compareNumbers(a, b) {
  return a - b;
}

function sortedArray(array) {
  return array.sort(compareNumbers);
}

const Node = (value = null, right = null, left = null) => {
  return {
    value,
    right,
    left,
  };
};

const Tree = (arr) => {
  return {
    root: buildTree(arr),
  };
};

function buildTree(arr) {
  // sort array -> use sortedArray(arr) as argument
  // base case
  if (arr.length <= 1)
    return arr;
  // diviser l'array en deux de manière récursive, en divisant l'array en gauche et droite
  let start = 0;
  let end = arr.length;
  let mid = Math.floor((start + end) / 2);
  let newNode = Node(buildTree(arr.splice(mid, 1)), buildTree(arr.splice(start, mid)), buildTree(arr.splice(-mid)));
  /*let root = buildTree(arr.splice(mid, 1));
  let leftTree = buildTree(arr.splice(start, mid));
  let rightTree = buildTree(arr.splice(-mid));
  return { leftTree, rightTree, root };*/
  return newNode;
  // lier les nodes entre eux
}

function divideArray(arr) {
  let start = 0;
  let end = arr.length;
  let mid = Math.floor((start + end) / 2);
  return arr[mid];
}

