'use strict';
class Node {
  constructor(val){
    this.val = val;
    this.children = [];
  }
}

class Tree {
  constructor(){
    this.root = null;
  }

  add(val, parent){
    const node = new Node(val);
    if(!this.root){
      this.root = node;
    }
    else if(!parent){
      throw new Error('Root node already defined!')
    }
    else if(parent) {
      const parentNode = this.getBfs(parent);
      parentNode.children.push(node);
    }
    return this;
  }

  // get Breadth-first search
  getBfs(val){
    return (function _getBfs(nodes){
      if(nodes.length === 0){
        return null;
      }
      const node = nodes.shift();
      if(node.val === val){
        return node;
      }
      return _getBfs(nodes.concat(node.children));
    })([this.root]);
  }

  remove(val){
    if(this.root.val === val){
      this.root = null;
    }
    else{
      const _this = this;
      return (function _remove(nodes){
        const node = nodes.shift();
        const remaining = nodes;
        for(let i = 0; i < node.children.length; i++){
          if(node.children[i].val === val){
            node.children.splice(i, 1);
            return _this;
          }
          else {
            remaining.push(node.children[i]);
          }
        }
        return _remove(nodes.concat(remaining));
      })([this.root]);
    }
    return this;
  }

  contains(val){
    return this.getBfs(val) ? true : false;
  }

  traverseBfs(fn){
    const _this = this;
    return (function _getBfs(nodes){
      if(nodes.length === 0){
        return this;
      }
      const node = nodes.shift();
      if(fn){
        fn(node.val);
      }
      return _getBfs(nodes.concat(node.children));
    })([this.root]);
  }

  traverseDfs(fn){
    const _this = this;
    return (function _getBfs(nodes){
      if(nodes.length === 0){
        return this;
      }
      const node = nodes.shift();
      _getBfs(nodes.concat(node.children));
      if(fn){
        fn(node.val);
      }
    })([this.root]);
  }

  print(){
    let thisLevel = 0;
    const addNodeLevel = (n) => {
      n.level = thisLevel;
      return n;
    }
    return (function _getBfs(tree, nodes){
      if(nodes.length === 0){
        return tree;
      }

      const node = nodes.shift();
      const nextNodeLevel = nodes[0] ? nodes[0].level : null;

      if(node.val){
        tree += node.val;
      }
      if(node.level === nextNodeLevel){
        tree += ' | ';
      }
      else if(node.children.length > 0 || nodes.length > 0) {
        tree += '\n'
      }
      thisLevel = node.level + 1;
      const childNodes = nodes.concat(node.children.map(addNodeLevel));

      return _getBfs(tree, childNodes);
    })('', [this.root].map(addNodeLevel), 0); 
  }
}

module.exports = Tree;