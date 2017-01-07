var LinkedList = function() {
    this.length = 0;
    this.head = null;
};

LinkedList.prototype.insert = function(index, value) {
    if (index < 0 || index > this.length) {
        throw new Error('Index error');
    }

    var newNode = {
        value: value
    };

    if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
    }
    else {
        // Find the node which we want to insert after
        var node = this._find(index - 1);
        newNode.next = node.next;
        node.next = newNode;
    }

    this.length++;
};

// just a copy of the 'insert()' method except this one will create a
// problematic 'cyclical' list if the node is inserted at the end of the list
// no attempt was made to refactor this since it wasn't really part of the
// exercises.
LinkedList.prototype.cycle = function(index, value) {
    if (index < 0 || index > this.length) {
        throw new Error('Index error');
    }

    var newNode = {
        value: value
    };

    if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
    }
    else {
        // Find the node which we want to insert after
        var node = this._find(index - 1);

        // if inserting at the end of the list, link new node back to
        // arbitrary node near beginning of list
        if (node.next === null) {
          newNode.next = this.head.next.next;
        } else {
          newNode.next = node.next;
        }
        node.next = newNode;
    }

    this.length++;
};

LinkedList.prototype._find = function(index) {
    var node = this.head;
    for (var i=0; i<index; i++) {
        node = node.next;
    }
    return node;
};

LinkedList.prototype.get = function(index) {
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }

    return this._find(index).value;
};

LinkedList.prototype.remove = function(index) {
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }

    if (index === 0) {
        this.head = this.head.next;
    }
    else {
        // Find the node before the one we want to remove
        var node = this._find(index - 1);
        node.next = node.next.next;
    }

    this.length--;
};

LinkedList.prototype.halfway = function () {
  // two pointers, one at double speed, one at single speed
  // when fast pointer reaches the end, slow pointer is at the halfway point
  if (!this.head) {
    return null;
  }

  var slow = this.head;
  var fast = this.head.next;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};

var cycleLL = new LinkedList();
cycleLL.insert(0, 0)
cycleLL.insert(1, 1)
cycleLL.insert(2, 2)
cycleLL.insert(3, 20)
cycleLL.insert(4, 25)
cycleLL.insert(5, 30)
cycleLL.insert(6, 35)
cycleLL.insert(7, 40)
cycleLL.cycle(8, 'uh-oh')


var myLL = new LinkedList();
myLL.insert(0, 1)
myLL.insert(1, 2)
myLL.insert(2, 5)
myLL.insert(3, 20)
myLL.insert(4, 25)
myLL.insert(5, 30)
myLL.insert(6, 35)
myLL.insert(7, 40)

// Write an algorithm to find the third element from the end of a linked list
// without using the .length property
LinkedList.prototype.thirdElement = function() {

  if (!this.head || !this.head.next || !this.head.next.next) {
    return 'list too short';
  }

  var slow = this.head;
  var fast = this.head.next.next.next;

  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
};

// Write an algorithm to reverse a linked list
LinkedList.prototype.reverse = function () {
// create a new LL (this will be returned)
// take the first item from original list and add it to new list
// take item by item from original list and add to beginning of new list
  if (this.length <= 1) {
    return this;
  }
  var newLL = new LinkedList();
  var oldList = this.head;

  while (oldList) {
    newLL.insert(0, oldList.value)
    oldList = oldList.next;
  }

  return newLL;
};

// detect and fix cyclical list problem
LinkedList.prototype.cycleCheck = function () {
  //if LL had a cycle and there were two pointers, they would overlap at some point
  //if no length then return index error
  if (!this.length) return 'index error';
  var slow = this.head;
  var fast = this.head;
  var cycleDetected = false;

  while(fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      cycleDetected = true;
      break;
    }
  }
  if (!cycleDetected) return 'no cycle detected';

  // Next step of Floyd's Warshall -- determine loop length
  var counter = 0;
  do {
    counter++;
    slow = slow.next;
    fast = fast.next.next;
  } while (fast !== slow);

  // console.log(counter);

  // Next step: find beginning of loop
  // move fast to head; increment it by 1 instead of 2
  // where fast and slow meet is start of loop
  slow = this.head;
  do {
    slow = slow.next;
    fast = fast.next;
  } while (slow !== fast);

  console.log(slow.value);

  // Next step: advance the pointer by counter - 1 steps
  // That's end of loop
  // fix last pointer to point at null
  for (let i = 0; i < counter-1; i++) {
    slow = slow.next;
  }

  slow.next = null;

  return 'cyclical problem corrected'
};

// don't run this on a cyclical list!
LinkedList.prototype.output = function () {
  var output = "";
  var list = this.head;
  while (list) {
    output += list.value + ', ';
    list = list.next;
  }
  return output;
}
