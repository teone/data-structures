'use strict';
class Node {
  constructor(val){
    this.data = val;
    this.next = null;
    this.previous = null;
  }
}

class DoubleLinkedList {
  constructor(){
    this.head = null;
    this.tail = null;
    this.containedValues = 0;
  }

  add(val){
    const node = new Node(val);
    if(!this.head){
      this.head = node;
      this.tail = node;
    }
    else{
      node.previous = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.containedValues++;
    return this;
  }

  addAfter(val, after){
    const node = new Node(val);
    const parentNode = this.get(after);
    
    parentNode.next.previous = node;
    node.previous = parentNode;
    node.next = parentNode.next;
    parentNode.next = node;

    this.containedValues++;
    return this;
  }

  get(val){
    return (function _get(node){
      if(node.data === val){
        return node;
      }
      else if(!node.next){
        return null;
      }
      return _get(node.next);
    })(this.head);
  }

  remove(val){
    const node = this.get(val);
    const previousNode = node.previous;
    const nextNode = node.next;

    if(previousNode){
      previousNode.next = nextNode;
    }
    else{
      // it is the head
      this.head = nextNode;
    }

    if(nextNode){
      nextNode.previous = previousNode;
    }
    else{
      // it is the tail
      this.tail = previousNode;
    }

    this.containedValues--;
    return this;
  }

  traverse(fn){
    const _this = this;
    return (function _traverse(node){
      node.data = fn(node.data);
      if(!node.next){
        return _this;
      }
      return _traverse(node.next);
    })(this.head);
  }

  traverseReverse(fn){
    const _this = this;
    return (function _traverse(node){
      node.data = fn(node.data);
      if(!node.previous){
        return _this;
      }
      return _traverse(node.previous);
    })(this.tail); 
  }

  contain(val){
    return !!this.get(val);
  }

  length(){
    return this.containedValues;
  }

  print(){
    return (function printNextVal(string, node){
      if(!node.next) {
        return `${string}${node.data} ]`;
      }
      const chunk = `${string}${node.data} <-> `;
      return printNextVal(chunk, node.next);
    })('[ ', this.head);
  }
}

module.exports = DoubleLinkedList;