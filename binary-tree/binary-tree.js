'use strict';
class Node {
  constructor(val){
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor(){
    this.root = null;
  }

  add(val){
    const self = this;
    const node = new Node(val);
    if(!this.root){
      this.root = node;
      return this;
    }
    return (function _add(current) {
      if(current.val < node.val){
        if(!current.right){
          current.right = node;
          return self;
        }
        return _add(current.right);
      }
      else if(current.val > node.val){
        if(!current.left){
          current.left = node;
          return self;
        }
        return _add(current.left);
      }
    })(this.root); 
  }

  remove(val){
    const self = this;
    this.root = (function _remove(node) {
      if(val === node.val){
        if(!node.left && !node.right){
          return null;
        }
        else if(!node.left){
          return node.right;
        }
        else if(!node.right){
          return node.left;
        }

        // if the node has 2 children,
        // decide how to move up
      }
      else if(val > node.val && node.right){
        node.right = _remove(node.right);
      }
      else if (val < node.val && node.left) {
        node.left = _remove(node.left);
      }
      return node;

    })(this.root); 
  }

  min(node){
    return (function _min(node) {
      if(node.left){
        return _min(node.left);
      }
      return node.val;
    })(node ? node : this.root); 
  }

  max(node){
    return (function _max(node) {
      if(node.right){
        return _max(node.right);
      }
      return node.val;
    })(node ? node : this.root); 
  }

  print(){
    const newline = new Node('\n');
    let string = '';
    return (function _print(nodes) {

      if(nodes.length === 0){
        return string;
      }
      const node = nodes.shift();
      const nextLine = nodes.indexOf(newline);
      string += node.val.toString();

      if(node !== newline && nextLine !== 0){
        string += ' | ';
      }

      if (node === newline && nodes.length > 0){
        nodes.push(newline);
      }

      if(node.left){
        nodes.push(node.left);
      }
      if (node.right) {
        nodes.push(node.right);
      }
      return _print(nodes);
    })([this.root, newline]);
  }
}

module.exports = BinaryTree;