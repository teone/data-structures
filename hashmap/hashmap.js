'use strict';
class HashMap {
  constructor(size){
    this.values = {};
    this.containedValues = 0;
    this.size = size || 10;
  }

  _calculateHash(key){
    const keys = '1234567890abcdefgihklmnopqrstuvwyz_-?!';
    return key.split('').reduce(
      (key, item) => key + keys[keys.indexOf(item)]
    ,'');
  }

  add(key, val){
    const hash = this._calculateHash(key);
    this.values[hash] = val;
    this.containedValues++;
    return this;
  }

  remove(key){
    const hash = this._calculateHash(key);
    delete this.values[hash];
    this.containedValues--;
    return this;
  }

  searchByKey(key){
    const hash = this._calculateHash(key);
    return this.values[hash] || null;
  }

  searchByValue(val){
    return Object.keys(this.values).reduce((current, k) => this.values[k] === val ? val : current, null);
  }

  print(){
    return Object.keys(this.values).reduce((string, k, i) => {
      string += `${k}: ${this.values[k]}`;
      string += i === Object.keys(this.values).length - 1 ? '}' : ', ';
      return string;
    }, '{');
  }
}

module.exports = HashMap;