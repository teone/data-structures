'use strict';

class Set {
  constructor(){
    this.values = [];
    this.containedValues = 0
  }

  add(val){
    if(!~this.values.indexOf(val)){
      this.values.push(val);
      this.containedValues++;
    }
    return this;
  }

  remove(val){
    if(~this.values.indexOf(val)){
      this.values.splice(this.values.indexOf(val), 1);
      this.containedValues--;
    }
    return this;
  }

  contains(val){
    return this.values.indexOf(val) !== -1;
  }

  union(set){
    const union = new Set();
    const values = set.values.concat(this.values);
    values.forEach(v => {
      union.add(v);
    });
    return union;
  }

  intersect(set){
    const intersection = new Set();
    this.values.forEach(v => {
      if(set.contains(v)){
        intersection.add(v);
      }
    });
    return intersection;
  }

  difference(set){
    const difference = new Set();
    this.values.forEach(v => {
      if(!set.contains(v)){
        difference.add(v);
      }
    })
    return difference;
  }

  isSubset(set){
    return this.values.every(v => set.contains(v));
  }

  length(){
    return this.values.length;
  }

  print(){
    return `[${this.values.join(', ')}]`;
  }
}

module.exports = Set;