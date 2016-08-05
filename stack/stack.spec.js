(function(){
  'use strict';
  
  const Stack = require('./stack.js');
  const expect = require('chai').expect;

  describe('The Stack data structure', () => {
  
    describe('when created', () => {
    
      it('should be an empty array', () => {
        const myStack = new Stack();
        expect(myStack.stack).to.deep.equal([]);
      });

    });

    describe('when existing', () => {
      let myStack;
      beforeEach(() => {
        myStack = new Stack();
      });

      it('should add a value to the end stack', () => {
        myStack.add('test');
        expect(myStack.stack).to.deep.equal(['test']);
        myStack.add('another_test');
        expect(myStack.stack).to.deep.equal(['test', 'another_test']);
      });

      describe('and have values', () => {
        beforeEach(() => {
          myStack
            .add(1)
            .add(2)
            .add(3)
            .add(4);
        });

        it('should pop the last inserted element', () => {
          myStack.pop();
          expect(myStack.stack).to.deep.equal([1,2,3]);
        });

        it('should peek the next element to be popped', () => {
          expect(myStack.peek()).to.equal(4);
        });

        it('should return the length of an array', () => {
          expect(myStack.length()).to.equal(4);
        });

        it('should have a print method', () => {
          expect(myStack.print()).to.equal('[1, 2, 3, 4]');
        });
      });
    });
  });
})();
