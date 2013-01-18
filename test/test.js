var should = require('should');

// # test-js
//
// Conjunto de tests sobre el comportamiento de JavaScript en diferentes
// entornos
//
// Empezaré testeando el libro 'JavaScript: The Good Parts' bajo `node.js` e
// iré ampliando progresivamente con diferentes libros y entornos


// # "JavaScript: The Good Parts" by Douglas Crockford

describe('JavaScript: The Good Parts', function () {
  describe('Array', function () {
    describe('#indexOf()', function () {
      it('should return -1 when the value is not present', function () {
        [1,2,3].indexOf(5).should.equal(-1);
        [1,2,3].indexOf(0).should.equal(-1);
      });
    });
  });
});
