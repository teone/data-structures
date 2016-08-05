'use strict';
class Stack {
  constructor(){
    this.stack = [];
  }
  
  add(val){
    this.stack.push(val);
    return this;
  }

  pop(){
    this.stack.pop();
    return this;
  }

  peek(){
    return this.stack[this.stack.length - 1];
  }

  length(){
    return this.stack.length;
  }

  print(){
    return `[${this.stack.join(', ')}]`;
  }
}

module.exports = Stack;
