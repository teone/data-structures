'use strict';
class Node {
  constructor(val){
    this.data = val;
    this.next = null;
  }
}

class SingleLinkedList {
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
      this.tail.next = node;
      this.tail = node;
    }
    this.containedValues++;
    return this;
  }

  addAfter(val, after){
    const node = new Node(val);
    const parentNode = this.get(after);
    if(parentNode){
      node.next = parentNode.next;
      parentNode.next = node;
    }
    this.containedValues++;
    return this;
  }

  get(val){
    return (function _get(val, node){
      if(node.data === val){
        return node;
      }
      else if (node.next){
        return _get(val, node.next);
      }
      return null;
    })(val, this.head);
  }

  remove(val){
    const _this = this;
    const node = this.get(val);
    if(!node){
      return this;
    }
    return (function removeVal(prev, curr){
      if(curr.data === val){
        prev.next = curr.next
        if(curr.data === _this.head.data){
          _this.head = curr.next;
        }
        return _this;
      }
      return removeVal(curr, curr.next);
    })(this.head, this.head);
  }

  traverse(fn){
    const _this = this;
    return(function _traverse(node){
      node.data = fn(node.data);
      if(!node.next){
        return _this;
      }
      return _traverse(node.next);
    })(this.head);
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
      const chunk = `${string}${node.data} -> `;
      return printNextVal(chunk, node.next);
    })('[ ', this.head);
  }

}

module.exports = SingleLinkedList;