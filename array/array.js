'use strict';
class Array {
  constructor(){
    this.array = [];
  }
  
  add(val){
    this.array.push(val);
    return this;
  }

  remove(val){
    this.array = this.array.filter(i => i !== val);
    return this;
  }

  search(val){
    let index = this.array.indexOf(val);
    return index !== -1 ? index : null;
  }

  get(index){
    return index !== -1 ? this.array[index] : null; 
  }

  length(){
    return this.array.length;
  }

  print(){
    return `[${this.array.join(', ')}]`;
  }
}

module.exports = Array;
