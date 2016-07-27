(function(){
  'use strict';
  
  const Array = require('./array.js');
  const expect = require('chai').expect;

  describe('The Array data structure', () => {
  
    describe('when created', () => {
    
      it('should be an empty array', () => {
        const myArray = new Array();
        expect(myArray.array).to.deep.equal([]);
      });

    });

    describe('when existing', () => {
      let myArray;
      beforeEach(() => {
        myArray = new Array();
      });

      it('should add a method to the array', () => {
        myArray.add('test');
        expect(myArray.array).to.deep.equal(['test']);
      });

      describe('and have values', () => {
        beforeEach(() => {
          myArray
            .add(1)
            .add(2)
            .add(3)
            .add(4);
        });

        it('should remove an element', () => {
          myArray.remove(1);
          expect(myArray.array).to.deep.equal([2,3,4]);
        });

        it('should find the index of an element', () => {
          expect(myArray.search(3)).to.equal(2);
          expect(myArray.search(6)).to.equal(null);
        });

        it('should get an element', () => {
          expect(myArray.get(2)).to.equal(3);
          expect(myArray.get(6)).to.equal(undefined);
        });

        it('should return the length of an array', () => {
          expect(myArray.length()).to.equal(4);
        });

        it('should have a print method', () => {
          expect(myArray.print()).to.equal('[1, 2, 3, 4]');
        });
      });
    });
  });
})();
