(function(){
  'use strict';
  
  const SingleLinkedList = require('./single-linked-list.js');
  const expect = require('chai').expect;

  describe('The Single Linked List data structure', () => {
  
    describe('when created', () => {
      it('should not contain values', () => {
        const myList = new SingleLinkedList();
        expect(myList.containedValues).to.equal(0);
      });
    });

    describe('when existing', () => {
      let myList;
      beforeEach(() => {
        myList = new SingleLinkedList();
      });

      it('should add a value to the array', () => {
        myList.add('val_one');
        expect(myList.head).to.deep.equal({data: 'val_one', next: null});
        expect(myList.tail).to.deep.equal({data: 'val_one', next: null});
        expect(myList.containedValues).to.equal(1);
      });


      describe('and have values', () => {
        beforeEach(() => {
          myList
            .add('val_one')
            .add('val_two')
            .add('val_four');
        });

        it('should add a value at the end of the list', () => {
          expect(myList.head).to.deep.equal({data: 'val_one', next: {data: 'val_two', next: {data: 'val_four', next: null}}});
          expect(myList.tail).to.deep.equal({data: 'val_four', next: null});
          expect(myList.containedValues).to.equal(3);
        });

        it('should add a value after a specified node', () => {
          myList.addAfter('val_three', 'val_two');
          expect(myList.head).to.deep.equal({data: 'val_one', next: {data: 'val_two', next: {data: 'val_three', next: {data: 'val_four', next: null}}}});
          expect(myList.containedValues).to.equal(4);
        });

        it('should check if the list contain a value', () => {
          expect(myList.contain('val_two')).to.equal(true);
          expect(myList.contain('val_three')).to.equal(false);
        });

        it('should remove an element', () => {
          const newList = {
            data: 'val_one',
            next: {
              data: 'val_four',
              next: null
            }
          };
          myList.remove('val_two');
          expect(myList.head).to.deep.equal(newList);
        });

        it('should remove the head element', () => {
          const newList = {
            data: 'val_two',
            next: {
              data: 'val_four',
              next: null
            }
          };
          myList.remove('val_one');
          expect(myList.head).to.deep.equal(newList);
        });

        it('should remove the tail element', () => {
          const newList = {
            data: 'val_one',
            next: {
              data: 'val_two',
              next: null
            }
          };
          myList.remove('val_four');
          expect(myList.head).to.deep.equal(newList);
        });

        it('should get an element', () => {
          const val = {
            data: 'val_two',
            next: {
              data: 'val_four',
              next: null
            }
          };
          expect(myList.get('val_two')).to.deep.equal(val);
          expect(myList.get('val_three')).to.deep.equal(null);
        });

        it('should apply a function to the list [Traverse]', () => {
          myList.traverse(val => `_${val}`);
          const newList = {
            data: '_val_one',
            next: {
              data: '_val_two',
              next: {
                data: '_val_four',
                next: null
              }
            }
          }
          expect(myList.head).to.deep.equal(newList);
        });

        it('should return the length of an array', () => {
          expect(myList.length()).to.equal(3);
        });

        it('should have a print method', () => {
          expect(myList.print()).to.equal('[ val_one -> val_two -> val_four ]');
        });
      });
    });
  });
})();
