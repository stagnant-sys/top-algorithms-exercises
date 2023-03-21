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

    insert(value, currentNode = this.root) {
      if (currentNode === null) return Node(value);
      if (currentNode.value === value) return;
      if (value < currentNode.value) {
        currentNode.left = this.insert(value, currentNode.left);
      } else if (value > currentNode.value) {
        currentNode.right = this.insert(value, currentNode.right);
      }
      return currentNode;
    },

    delete(value, currentNode = this.root) {
      // Base case
      if (currentNode === null) return currentNode;
      // Traverse tree with recursion
      if (value < currentNode.value) {
        currentNode.left = this.delete(value, currentNode.left);
      } else if (value > currentNode.value) {
        currentNode.right = this.delete(value, currentNode.right);
      } else { // value found in tree
        if (currentNode.left === null) {
          return currentNode.right;
        } else if (currentNode.right === null) {
          return currentNode.left;
        }
        currentNode.value = this.minValue(currentNode.right);
        currentNode.right = this.delete(currentNode.value, currentNode.right);
      }
      return currentNode;
    },

    minValue(root) {
      let minVal = root.value;
      while (root.left != null) {
        minVal = root.left.value;
        root = root.left;
      }
      return minVal;
    },

    find(value, currentNode = this.root) {
      if (currentNode === null) {
        return 'Error: value not found.';
      }
      if (currentNode.value === value) {
        return currentNode;
      }
      if (value < currentNode.value) {
        currentNode = this.find(value, currentNode.left);
      } else if (value > currentNode.value) {
        currentNode = this.find(value, currentNode.right);
      }
      return currentNode;
    },
  };
};

function buildTree(arr) {
  // Remove duplicate values and sort them
  const cleanData = [...new Set(arr)];
  const sortedDatas = sortedArray(cleanData);
  // Base case
  if (sortedDatas.length === 0) {
    return null;
  }
  // Recursion
  const mid = Math.floor(sortedDatas.length / 2);
  const newNode = Node(sortedDatas[mid]);
  newNode.left = buildTree(sortedDatas.slice(0, mid));
  newNode.right = buildTree(sortedDatas.slice(mid + 1));
  return newNode;
}

/* ----------------------------------------------------------------------------------------------*/

let testArray = [1,2,5,3,4,8,7,6,9,42];
let shortTree = Tree([1,2,3]);
let testTree = Tree(testArray);


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