(function(){
  'use strict';
  
  const Set = require('./set.js');
  const expect = require('chai').expect; 

  describe('The Set data structure', () => {
    describe('when created', () => {
      it('should have a size of 0', () => {
        let mySet = new Set();
        expect(mySet.containedValues).to.equal(0);
      });

      describe('when existing', () => {
        let mySet;
        beforeEach(() => {
          mySet = new Set();
        });

        it('should add a new value', () => {
          mySet.add('val_one');
          expect(mySet.values[0]).to.deep.equal('val_one');
          expect(mySet.containedValues).to.equal(1);
        });

        describe('and have values', () => {
          let anotherSet;
          let subSet;
          beforeEach(() => {

          anotherSet = new Set();
          subSet = new Set();

            mySet
              .add('val_one')
              .add('val_two')

            anotherSet
              .add('val_one')
              .add('val_three')
              .add('val_four');

            subSet
              .add('val_one')
              .add('val_four');
          });

          it('should not add an existing value', () => {
            mySet.add('val_one');
            const res = mySet.values.filter(i => i == 'val_one');
            expect(res.length).to.deep.equal(1); 
            expect(mySet.containedValues).to.equal(2);
          });

          it('should remove a value', () => {
            mySet.remove('val_one');
            expect(mySet.containedValues).to.equal(1);
          });

          it('should check if the set contain a value', () => {
            expect(mySet.contains('val_one')).to.equal(true);
            expect(mySet.contains('val_four')).to.equal(false);
          });

          it('should merge two set (union)', () => {
            const union = mySet.union(anotherSet);
            expect(union.containedValues).to.equal(4);
            expect(union.contains('val_one')).to.equal(true);
            expect(union.contains('val_two')).to.equal(true);
            expect(union.contains('val_three')).to.equal(true);
            expect(union.contains('val_four')).to.equal(true);
          });

          it('should merge two set (intersect)', () => {
            const intersection = mySet.intersect(anotherSet);
            expect(intersection.containedValues).to.equal(1);
            expect(intersection.contains('val_one')).to.equal(true);
            expect(intersection.contains('val_two')).to.equal(false);
            expect(intersection.contains('val_three')).to.equal(false);
            expect(intersection.contains('val_four')).to.equal(false);
          });

          it('should subtract two set (difference)', () => {
            const difference = mySet.difference(anotherSet);
            expect(difference.containedValues).to.equal(1);
            expect(difference.contains('val_one')).to.equal(false);
            expect(difference.contains('val_two')).to.equal(true);
            expect(difference.contains('val_three')).to.equal(false);
            expect(difference.contains('val_four')).to.equal(false);
          });

          it('should check if it is a subset', () => {
            expect(subSet.isSubset(anotherSet)).to.equal(true);
            expect(subSet.isSubset(mySet)).to.equal(false);
          });

          it('should return the length of a set', () => {
            expect(mySet.length()).to.equal(2);
            expect(anotherSet.length()).to.equal(3);
            expect(subSet.length()).to.equal(2);
          });

          it('should print a set', () => {
            expect(mySet.print()).to.equal('[val_one, val_two]');
          });
        });
      });
    });
  });
})();