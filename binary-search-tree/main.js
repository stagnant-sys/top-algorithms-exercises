function compareNumbers(a, b) {
  return a - b;
}

function sortedArray(array) {
  return array.sort(compareNumbers);
}

const Node = (value = null, left = null, right = null) => {
  return {
    value,
    left,
    right,
  };
};

const Tree = (arr) => {
  return {
    root: buildTree(arr),

    insert(value) {
      if (this.root.length === 0) {
        const newNode = Node(value);
        this.root = newNode;
      }
      if (value < this.root.value) {
        this.root.left = this.insert(value);
      } else if (value > this.root.value) {
        this.root.right = this.insert(value);
      }
      return this.root;
    },
  };
};


function buildTree(arr) {
  // Remove duplicate values and sort them
  const cleanData = [...new Set(arr)];
  const sortedDatas = sortedArray(cleanData);
  // base case
  if (sortedDatas.length <= 1)
    return sortedDatas; 
  // diviser l'array en deux de manière récursive, en divisant l'array en gauche et droite
  let start = 0;
  let end = sortedDatas.length;
  let mid = Math.floor((start + end) / 2);
  let newNode = Node(buildTree(sortedDatas.splice(mid, 1)), buildTree(sortedDatas.splice(start, mid)), buildTree(sortedDatas.splice(-mid)));
  /*let root = buildTree(arr.splice(mid, 1));
  let leftTree = buildTree(arr.splice(start, mid));
  let rightTree = buildTree(arr.splice(-mid));
  return { leftTree, rightTree, root };*/
  return newNode;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
     return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let testArray = [1,2,5,3,4,8,7,6,9];
let testTree = Tree(testArray);