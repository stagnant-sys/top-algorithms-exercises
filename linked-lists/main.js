const Node = (nodeValue = null, nextNode = null) => {
  return {
    value: nodeValue,
    next: nextNode
  };
};

const LinkedList = () => {
  return {
    head: null,

    append(value) {
      const lastNode = Node(value, null);
      if (!this.head) {
        this.head = lastNode;
      } else {
        let tail = this.head;
        while (tail.next !== null) {
          tail = tail.next;
        }
        tail.next = lastNode;
      }
    },

    prepend(value) {
      const firstNode = Node(value, this.head);
      this.head = firstNode;
    },

    size() {
      if (!this.head) return 0;
      let counter = 1;
      let currentNode = this.head;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
        counter++;
      }
      return counter;
    },

    tail() {
      let tail = this.head;
      while (tail.next !== null) {
        tail = tail.next;
      }
      return tail;
    },

    at(index) {
      let currentNode = this.head;
      for (let i = 0; i < index; i++) {
        currentNode = currentNode.next;
      }
      return currentNode;
    },

    pop() {
      if (!this.head) throw new Error('The list is empty!');
      let currentNode = this.head;
      for (let i = 0; i < this.size() - 2; i++) {
        currentNode = currentNode.next;
      }
      currentNode.next = null;
    },

    contains(value) {
      let currentNode = this.head;
      while (currentNode.value !== value && currentNode.next) {
        currentNode = currentNode.next;
      }
      if (currentNode.value === value) return true;
      return false;
    },

    find(value) {
      let index = 0;
      let currentNode = this.head;
      for (let i = 0; i < this.size(); i++) {
        if (currentNode.value === value) return index;
        currentNode = currentNode.next;
        index++;
      }
      return null;
    },

    toString() {
      let string = this.head.value;
      let currentNode = this.head.next;
      if (!this.head.next) return string;
      for (let i = 0; i < this.size() - 1; i++) {
        string += ` -> ${currentNode.value}`;
        currentNode = currentNode.next;
      }
      string += ' -> NULL';
      return string;
    },

    insertAt(value, index) {
      let currentNode = this.head;
      if (index === 0) {
        this.prepend(value);
      }
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.next;
      }
      let insertedNode = Node(value, currentNode.next);
      currentNode.next = insertedNode;
    },

    removeAt(index) {
      if (index === 0) {
        this.head = this.head.next;
        // If removing the last node, define the new tail node
      } else if (index === this.size() - 1) {
        targetNode = this.head;
        for (let i = 0; i < index -1; i++) {
          console.log('working');
          targetNode = targetNode.next;
        }
        console.log(targetNode);
      }
      // Get node before the index
      let previousNode = this.head;
      for (let i = 0; i < index - 1; i++) {
        previousNode = previousNode.next;
      }
      // Get node after the index
      let nextNode = this.head;
      for (let i = 0; i < index + 1; i++) {
        nextNode = nextNode.next;
      }
      previousNode.next = nextNode;
    }
  };
};

let list = LinkedList();
list.append('zero');
list.append('un');
list.append('deux');
list.append('trois');
list.append('quatre');