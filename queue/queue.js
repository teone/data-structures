'use strict';
class Queue {
  constructor(){
    this.queue = [];
  }
  
  enqueue(val){
    this.queue.push(val);
    return this;
  }

  dequeue(){
    this.queue.shift();
    return this;
  }

  peek(){
    return this.queue[0];
  }

  length(){
    return this.queue.length;
  }

  print(){
    return `[${this.queue.join(' -> ')}]`;
  }
}

module.exports = Queue;
