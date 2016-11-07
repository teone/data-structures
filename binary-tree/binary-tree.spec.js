(function () {
  'use strict';

  const BynaryTree = require('./binary-tree.js');
  const chai = require('chai');
  const expect = chai.expect;
  const spies = require('chai-spies');
  chai.use(spies);
console.log('test');
  describe('The BynaryTree data structure', () => {
    describe('when created', () => {
      it('should be an empty tree', () => {
        const myTree = new BynaryTree();
        expect(myTree.root).to.equal(null);
      });
    });

    describe('when existing', () => {
      let myTree;
      beforeEach(() => {
        myTree = new BynaryTree();
      });

      it('should add the root node', () => {
        myTree.add(5);
        expect(myTree.root.val).to.equal(5);
        expect(myTree.root.left).to.deep.equal(null);
        expect(myTree.root.right).to.deep.equal(null);
      });

      describe('and contain values', () => {

        beforeEach(() => {
          myTree
          .add(5)
          .add(3)
          .add(2)
          .add(4)
          .add(8)
          .add(9)
          .add(6);
        });

        it('should print the tree', () => {

          const string = myTree.print();
          expect(string).to.equal(`5
3 | 8
2 | 4 | 6 | 9
`);
        });

        it('should return the min value', () => {
          expect(myTree.min()).to.equal(2);
        });

        it('should return the max value', () => {
          expect(myTree.max()).to.equal(9);
        });
      });

      describe('when adding child nodes', () => {
        beforeEach(() => {
          myTree.add(5);
        });

        it('should add smaller values to the left', () => {
          myTree.add(3);
          expect(myTree.root.left.val).to.deep.equal(3);
          myTree.add(2)
          expect(myTree.root.left.left.val).to.deep.equal(2);
          myTree.add(4);
          expect(myTree.root.left.right.val).to.deep.equal(4);
        });

        it('should add bigger values to the right', () => {
          myTree.add(8);
          expect(myTree.root.right.val).to.deep.equal(8);
          myTree.add(9);
          expect(myTree.root.right.right.val).to.deep.equal(9);
          myTree.add(6);
          expect(myTree.root.right.left.val).to.deep.equal(6);
        });
      });

      describe('when removing nodes', () => {
        it('should remove the node if it have no child', () => {
          myTree
            .add(5)
            .add(3);

          myTree.remove(3);
          expect(myTree.root).to.deep.equal({
            val: 5,
            left: null,
            right: null
          });
        });

        it('should move the sub-tree one level up if it has only one child', () => {
          const leftTree = new BynaryTree();
          leftTree
            .add(5)
            .add(4)
            .add(3);
          leftTree.remove(4);
          expect(leftTree.root.val).to.equal(5);
          expect(leftTree.root.left.val).to.equal(3);

          const rightTree = new BynaryTree();
          rightTree
            .add(5)
            .add(6)
            .add(7);
          rightTree.remove(6);
          expect(rightTree.root.val).to.equal(5);
          expect(rightTree.root.right.val).to.equal(7);
        });

        it('should move the tree if it have 2 children', () => {
          expect(false).to.equal(true);
        });
      });
    });
  });
})();