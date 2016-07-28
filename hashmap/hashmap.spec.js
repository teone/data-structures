(function(){
  'use strict';
  
  const HashMap = require('./hashmap.js');
  const expect = require('chai').expect;

  describe('The HashMap data structure', () => {
    describe('when created', () => {
      it('should have a default size of 10', () => {
        let myHash = new HashMap();
        expect(myHash.size).to.equal(10);
      });

      it('should be possible to specifi a different size', () => {
        let myHash = new HashMap(25);
        expect(myHash.size).to.equal(25);
      });

      describe('the _calculateHash method', () => {
        let myHash;
        beforeEach(() => {
          myHash = new HashMap();
        });
        it('should return unique values', () => {
          const hash1 = myHash._calculateHash('test_key');
          const hash2 = myHash._calculateHash('test_key');
          expect(hash1).to.deep.equal(hash2);
        });
      });

      describe('when existing', () => {
        let myHash;
        beforeEach(() => {
          myHash = new HashMap();
        });
        it('should add an element to the map', () => {
          myHash.add('test_key', 'random value');
          expect(myHash.containedValues).to.equal(1);
        });

        describe('and have values', () => {
          beforeEach(() => {
            myHash
              .add('key_one', 'val_one')
              .add('key_two', 'val_two')
          });

          it('should search an element by key', () => {
            expect(myHash.searchByKey('key_one')).to.deep.equal('val_one');
            expect(myHash.searchByKey('key_three')).to.deep.equal(null);
          });

          it('should search an element by value', () => {
            expect(myHash.searchByValue('val_one')).to.deep.equal('val_one');
            expect(myHash.searchByValue('val_three')).to.deep.equal(null);
          });

          it('should remove an element by key', () => {
            myHash.remove('key_one');
            expect(myHash.containedValues).to.equal(1);
            expect(myHash.searchByKey('key_one')).to.deep.equal(null);
          });

          it('should have a print method', () => {
            expect(myHash.print()).to.equal('{key_one: val_one, key_two: val_two}');
          });
        });
      });
    });
  });
})();