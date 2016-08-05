(function(){
  'use strict';
  
  const Queue = require('./queue.js');
  const expect = require('chai').expect;

  describe('The Queue data structure', () => {
  
    describe('when created', () => {
    
      it('should be an empty list', () => {
        const myQueue = new Queue();
        expect(myQueue.queue).to.deep.equal([]);
      });

    });

    describe('when existing', () => {
      let myQueue;
      beforeEach(() => {
        myQueue = new Queue();
      });

      it('should enqueue a value to the end queue', () => {
        myQueue.enqueue('test');
        expect(myQueue.queue).to.deep.equal(['test']);
        myQueue.enqueue('another_test');
        expect(myQueue.queue).to.deep.equal(['test', 'another_test']);
      });

      describe('and have values', () => {
        beforeEach(() => {
          myQueue
            .enqueue(1)
            .enqueue(2)
            .enqueue(3)
            .enqueue(4);
        });

        it('should dequeue the first inserted element', () => {
          myQueue.dequeue();
          expect(myQueue.queue).to.deep.equal([2,3,4]);
        });

        it('should peek the next element to be dequeue', () => {
          expect(myQueue.peek()).to.equal(1);
        });

        it('should return the length of an array', () => {
          expect(myQueue.length()).to.equal(4);
        });

        it('should have a print method', () => {
          expect(myQueue.print()).to.equal('[1 -> 2 -> 3 -> 4]');
        });
      });
    });
  });
})();
