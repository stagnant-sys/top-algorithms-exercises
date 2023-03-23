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

    levelOrder(valuesArray = [], queue = [], currentNode = this.root) {
      if (currentNode === null) return;
      // Visit the root
      valuesArray.push(currentNode.value);

      // Traverse to left and right children -> add to queue
      queue.push(currentNode.left);
      queue.push(currentNode.right);

      // Move to next level
      while (queue.length) {
        const level = queue[0];
        queue.shift();
        this.levelOrder(valuesArray, queue, level);
      }

      return valuesArray;
    },

    inorder(valuesArray = [], currentNode = this.root) {
      // Base case
      if (currentNode === null) return;
      // Recursive call on left node if it exists
      this.inorder(valuesArray, currentNode.left);
      // Log value when left node === null
      valuesArray.push(currentNode.value);
      // Recursive call on right node after left nodes are visited
      this.inorder(valuesArray, currentNode.right);
      return valuesArray;
    },

    preorder(valuesArray = [], currentNode = this.root) {
      // Base case
      if (currentNode === null) return;
      // Log value of root node
      valuesArray.push(currentNode.value);
      // Go to left child then right child
      this.preorder(valuesArray, currentNode.left);
      this.preorder(valuesArray, currentNode.right);

      return valuesArray;
    },

    postorder(valuesArray = [], currentNode = this.root) {
      // Base case
      if (currentNode === null) return;
      this.postorder(valuesArray, currentNode.left);
      this.postorder(valuesArray, currentNode.right);
      valuesArray.push(currentNode.value);
      return valuesArray;
    },

    height(currentNode = this.root) {
      if (currentNode === null) return 0;

      let leftHeight = this.height(currentNode.left);
      let rightHeight = this.height(currentNode.right);

      if (leftHeight > rightHeight) {
        return leftHeight + 1;
      } else {
        return rightHeight + 1;
      }
    },

    depth(targetNode, currentNode = this.root, depth = 0) {
      if (currentNode === null) return;
      if (targetNode === currentNode) return depth;

      if (targetNode.value < currentNode.value) {
        depth++;
        currentNode = currentNode.left;
        return this.depth(targetNode, currentNode, depth);
      } else if (targetNode.value > currentNode.value) {
        depth++;
        currentNode = currentNode.right;
        return this.depth(targetNode, currentNode, depth);
      }
    },

    isBalanced(currentNode= this.root) {
      if (currentNode === null) return;
      
      let leftHeight = this.height(currentNode.left);
      let rightHeight = this.height(currentNode.right);
      let heightDiff = Math.abs(leftHeight - rightHeight);
      
      if (heightDiff < 2) return `Balanced tree, maximum height difference is ${heightDiff}`;
      return `Imbalanced tree, maximum height difference is ${heightDiff}`;
    },

    rebalance() {
      // use inorder traversal to create new array from which to build a new tree
      let updatedValuesArray = this.inorder();
      return this.root = buildTree(updatedValuesArray);
    },

    print(node = this.root, prefix = '', isLeft = true) {
      if (node === null) {
         return;
      }
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
      }
      console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
      }
    },
  };
};



/* TEST DATA ----------------------------------------------------------------------------------------------*/

function randomArray(n, upperLimit) {
  let array = [];
  for (let i = 0; i < n; i++) {
    array.push(Math.floor(Math.random() * upperLimit));
  }
  return array;
}

let testArray = randomArray(50, 100);
let testTree = Tree(testArray);