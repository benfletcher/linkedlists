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

var myLL = new LinkedList();
myLL.insert(0, 1)
myLL.insert(1, 2)
myLL.insert(2, 5)
myLL.insert(3, 20)
myLL.insert(4, 25)
myLL.insert(5, 30)
myLL.insert(6, 35)
myLL.insert(7, 40)

console.log(myLL)

LinkedList.prototype.halfway = function () {
  // two pointers, one at double speed, one at single speed
  // when fast pointer reaches the end, slow pointer is at the halfway point
  var slow = this;
  var fast = this.head;
  console.log(this);

  while (fast !== null && fast.next !== null) {
    if (slow === this) {
      slow = this.head;
    } else {
      slow = slow.next;
    }
    fast = fast.next;
    fast = fast.next;
  }

  return slow.value

};
