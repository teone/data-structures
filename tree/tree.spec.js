(function () {
  'use strict';

  const Tree = require('./tree.js');
  const chai = require('chai');
  const expect = chai.expect;
  const spies = require('chai-spies');
  chai.use(spies);

  describe('The Tree data structure', () => {
    describe('when created', () => {
      it('should be an empty tree', () => {
        const myTree = new Tree();
        expect(myTree.root).to.equal(null);
      });
    });

    describe('when existing', () => {
      let myTree;
      beforeEach(() => {
        myTree = new Tree();
      });

      it('should add the root node', () => {
        myTree.add('root');
        expect(myTree.root.val).to.equal('root');
        expect(myTree.root.children).to.deep.equal([]);
      });

      it('should throw if trying to add multiple root nodes', () => {
        myTree.add('root');
        function add(){
          myTree.add('another_root');
        }
        expect(add).to.throw();
      });

      it('should add a child node', () => {
        myTree
          .add('root')
          .add('child1', 'root');

        const child1 = {
          val: 'child1',
          children: []
        }
        expect(myTree.root.val).to.equal('root');
        expect(myTree.root.children).to.deep.equal([child1]);
      });

      describe('and have values', () => {
        beforeEach(() => {
          myTree.add('root')
          .add('child1', 'root')
          .add('child2', 'root')
          .add('sub1-child1', 'child1')
        });

        it('should get a node given the value [BFS]', () => {
          const node = myTree.getBfs('root');
          expect(node.val).to.equal('root');

          const child1 = myTree.getBfs('child1');
          expect(child1.val).to.equal('child1');

          const sub1Child1 = myTree.getBfs('sub1-child1');
          expect(sub1Child1.val).to.equal('sub1-child1');
          expect(sub1Child1.children).to.deep.equal([]);
        });

        it('should remove the root element', () => {
          myTree.remove('root');
          expect(myTree.root).to.equal(null);
        });

        it('should remove a child element', () => {
          myTree.remove('child1');
          const tree = {
            val: 'root',
            children: [
              {
                val: 'child2',
                children: []
              }
            ]
          };
          expect(myTree.root).to.deep.equal(tree);
        });

        it('should remove an element at the bottom of the tree', () => {
          myTree.remove('sub1-child1');
          const tree = {
            val: 'root',
            children: [
              {
                val: 'child1',
                children: []
              },
              {
                val: 'child2',
                children: []
              }
            ]
          };
          expect(myTree.root).to.deep.equal(tree);
        });

        it('should check if the tree contains an element', () => {
          expect(myTree.contains('root')).to.equal(true);
          expect(myTree.contains('sub1-child1')).to.equal(true);
          expect(myTree.contains('missing')).to.equal(false);
        });

        it('should traverse BFS', () => {
          const fn = v => `_${v}`;
          const spy = chai.spy(fn);
          myTree.traverseBfs(spy);
          expect(spy).to.have.been.called.with('root');
          expect(spy).to.have.been.called.with('child1');
          expect(spy).to.have.been.called.with('child2');
          expect(spy).to.have.been.called.with('sub1-child1');
          expect(spy.__spy.calls).to.deep.equal([['root'], ['child1'], ['child2'], ['sub1-child1']]);
          expect(spy).to.have.been.called.exactly(4);
        });

        it('should taverse DFS', () => {
          const fn = v => `_${v}`;
          const spy = chai.spy(fn);
          myTree.traverseDfs(spy);
          expect(spy).to.have.been.called.with('root');
          expect(spy).to.have.been.called.with('child1');
          expect(spy).to.have.been.called.with('child2');
          expect(spy).to.have.been.called.with('sub1-child1');
          expect(spy.__spy.calls).to.deep.equal([['sub1-child1'], ['child2'], ['child1'], ['root']]);
          expect(spy).to.have.been.called.exactly(4);
        });

        it('should print the tree', () => {
          const tree = myTree.print();
          expect(tree).to.equal(`root
child1 | child2
sub1-child1`);
        });
      });
    });
  });
})(); 