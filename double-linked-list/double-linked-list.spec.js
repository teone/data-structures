(function(){
  'use strict';
  
  const DoubleLinkedList = require('./double-linked-list.js');
  const chai = require('chai');
  const expect = chai.expect;
  const spies = require('chai-spies');
  chai.use(spies);

  describe('The Double Linked List data structure', () => {
  
    describe('when created', () => {
      it('should not contain values', () => {
        const myList = new DoubleLinkedList();
        expect(myList.containedValues).to.equal(0);
      });
    });

    describe('when existing', () => {
      let myList;
      beforeEach(() => {
        myList = new DoubleLinkedList();
      });

      it('should add a value to the list', () => {
        myList.add('val_one');
        const list = {
          data: 'val_one',
          previous: null,
          next: null
        }
        expect(myList.head).to.deep.equal(list);
        expect(myList.tail).to.deep.equal(list);
      });


      describe('and have values', () => {
        beforeEach(() => {
          myList
            .add('val_one')
            .add('val_two')
            .add('val_four');
        });

        it('should add a value at the end of the list', () => {

          expect(myList.containedValues).to.equal(3);

          const firstNode = myList.head;
          const secondNode = myList.head.next;
          const thirdNode = myList.tail;

          expect(firstNode.data).to.deep.equal('val_one');
          expect(firstNode.next.data).to.deep.equal('val_two');

          expect(secondNode.data).to.deep.equal('val_two');
          expect(secondNode.previous.data).to.deep.equal('val_one');
          expect(secondNode.next.data).to.deep.equal('val_four');

          expect(thirdNode.data).to.deep.equal('val_four');
          expect(thirdNode.previous.data).to.deep.equal('val_two');
          expect(thirdNode.next).to.deep.equal(null);
        });
        
        it('should get an element', () => {
          const node = myList.head.next;
          expect(myList.get('val_two')).to.deep.equal(node);
        });

        it('should add a value after a specified node', () => {
          myList.addAfter('val_three', 'val_two');

          expect(myList.containedValues).to.equal(4);

          const secondNode = myList.head.next;
          const thirdNode = secondNode.next;
          const fourthNode = myList.tail;

          expect(secondNode.data).to.deep.equal('val_two');
          expect(secondNode.previous.data).to.deep.equal('val_one');
          expect(secondNode.next.data).to.deep.equal('val_three');

          expect(thirdNode.data).to.deep.equal('val_three');
          expect(thirdNode.previous.data).to.deep.equal('val_two');
          expect(thirdNode.next.data).to.deep.equal('val_four');

          expect(fourthNode.data).to.deep.equal('val_four');
          expect(fourthNode.previous.data).to.deep.equal('val_three');
        });

        it('should check if the list contain a value', () => {
          expect(myList.contain('val_two')).to.equal(true);
          expect(myList.contain('val_three')).to.equal(false);
        });

        it('should remove an element', () => {
          myList.remove('val_two');
          expect(myList.contain('val_two')).to.equal(false);
          expect(myList.containedValues).to.equal(2);

          const firstNode = myList.head;
          const secondNode = myList.head.next;

          expect(firstNode.next.data).to.equal('val_four');
          expect(secondNode.previous.data).to.equal('val_one');
        });

        it('should remove the head element', () => {
          myList.remove('val_one');
          expect(myList.contain('val_one')).to.equal(false);
          expect(myList.containedValues).to.equal(2);

          const firstNode = myList.head;
          const secondNode = myList.head.next;

          expect(firstNode.data).to.equal('val_two');
          expect(firstNode.next.data).to.equal('val_four');
          expect(secondNode.previous.data).to.equal('val_two');
        });

        it('should remove the tail element', () => {
          myList.remove('val_four');
          expect(myList.contain('val_four')).to.equal(false);
          expect(myList.containedValues).to.equal(2);

          const firstNode = myList.head;
          const secondNode = myList.tail;

          expect(firstNode.next.data).to.equal('val_two');
          expect(secondNode.previous.data).to.equal('val_one');
        });


        it('should apply a function to the list [Traverse]', () => {
          const fn = v => `_${v}`;
          const spy = chai.spy(fn);
          myList.traverse(spy);
          expect(spy).to.have.been.called.with('val_one');
          expect(spy).to.have.been.called.with('val_two');
          expect(spy).to.have.been.called.with('val_four');
          expect(spy.__spy.calls).to.deep.equal([['val_one'], ['val_two'], ['val_four']]);
          expect(spy).to.have.been.called.exactly(3);
        });

        it('should apply a function to the list starting from tail [Traverse Reverse]', () => {
          const fn = v => `_${v}`;
          const spy = chai.spy(fn);
          myList.traverseReverse(spy);
          expect(spy).to.have.been.called.with('val_one');
          expect(spy).to.have.been.called.with('val_two');
          expect(spy).to.have.been.called.with('val_four');
          expect(spy.__spy.calls).to.deep.equal([['val_four'], ['val_two'], ['val_one']]);
          expect(spy).to.have.been.called.exactly(3);
        });

        it('should return the length of an array', () => {
          expect(myList.length()).to.equal(3);
        });

        it('should have a print method', () => {
          expect(myList.print()).to.equal('[ val_one <-> val_two <-> val_four ]');
        });
      });
    });
  });
})();
