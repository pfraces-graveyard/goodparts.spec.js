// # test-js

// Conjunto de tests sobre el comportamiento de JavaScript en diferentes
// entornos
//
// Empezaré testeando el libro 'JavaScript: The Good Parts' bajo `node.js` e
// iré ampliando progresivamente con diferentes libros y entornos

var should = require('should');

// # "JavaScript: The Good Parts" by Douglas Crockford

describe('JavaScript: The Good Parts', function () {

// ## 1. Good Parts
//
// >   JavaScript's functions are first class objects with (mostly) lexical
//     scoping. JavaScript is the first lambda language to go mainstream. Deep
//     down, JavaScript has more in common with List and Scheme than with Java.
//     **It's Lisp in C's clothing.** This makes JavaScript a remarkably
//     powerful language.

// ## 2. Grammar

  describe('2. Grammar', function () {

// ### Reserved words

    describe('Reserved words', function () {

// >   Most of the reserved words are not used in the language.
//     The language does not include some words that should have been reserved
//     but were not, such as `undefined`, `NaN`, and `Infinity`.
//
// >   It is not permitted to name a variable or parameter with a reserved
//     word. Worse, it is not permitted to use a reserved word as the name of
//     an object property in an object literal or following a dot in a
//     refinement.

      it('should throw if used as variables', function () {
        (function () {
          eval("var foo;");
        }).should.not.throw();

        (function () {
          eval("var in;");
        }).should.throw();
      });

      it('should not throw if they are not really reserved', function () {
        (typeof undefined).should.equal('undefined');
        should.exist(NaN);
        should.exist(Infinity);

        (function () {
          eval("var undefined;");
        }).should.not.throw();

        (function () {
          eval("var NaN;");
        }).should.not.throw();

        (function () {
          eval("var Infinity;");
        }).should.not.throw();
      });
      
    });

// ### Numbers

    describe('Numbers', function () {

// >   Unlike most other programming languages, there is no separate integer
//     type, so 1 and 1.0 are the same value.

      it('1 and 1.0 should be strict equals (===)', function () {
        (1).should.be.equal(1.0);
      });

// >   The value `NaN` is a number value that is the result of an operation
//     that cannot produce a normal result. `NaN` is not equal to any value,
//     including itself. You can detect `NaN` with the `isNaN(number)`
//     function.

      it('NaN should not equal to any value, including itself', function () {
        NaN.should.not.be.eql(0);
        NaN.should.not.be.eql(2.5);
        NaN.should.not.be.eql(NaN);
      });

      it('isNaN() should detect a NaN value', function () {
        isNaN(3).should.be.false;
        isNaN(NaN).should.be.true;
      });

      it('a bad conversion to Number should be NaN', function () {
        isNaN(Number('x')).should.be.true;
      });

      it('an imaginary number should be NaN', function () {
        isNaN(Math.sqrt(-2)).should.be.true;
      });

// >   The `Infinity` represents all values greater than
//     `1.79769313486231570e+308`.

      it('a num > 1.79769313486231570e+308 should be Infinity', function () {
        var notSoBig = 1.79769313486231570e+308;
        notSoBig.should.not.be.equal(Infinity);
        notSoBig *= 1.1; /* notSoBig++ does not change the value */
        notSoBig.should.be.equal(Infinity);
      });

      it('Infinity should be Infinity', function () {
        Infinity.should.be.equal(Infinity);
      });

      it('a division by zero should not be NaN', function () {
        isNaN(1/0).should.be.false
      });

      it('a division by zero should be Infinity', function () {
        (1/0).should.be.equal(Infinity);
      });

    });

// ### Strings

    describe('Strings', function () {

// >   Strings are immutable. Once it is made, a string can never be changed.
//     But it is easy to make a new string by concatenating other strings
//     together with the `+` operator

        it('should be immutable', function () {
          var foo = "foo";
          foo[0].should.be.equal('f');
          foo[0] = 'b';
          foo[0].should.be.equal('f');
        });

// >   Two strings containing exactly the same characters in the same order are
//     considered to be the same string

      it('with same characters in same order should be the same', function () {
        "foo".should.be.equal("f" + "o" + "o");
      });

    });

// ### Statements

    describe('Statements', function () {

// >   When used inside a function, the `var` statement defines the function
//     private variables.
//
// >   A block is a set of statements wrapped in curly braces. Unlike many
//     other languages, blocks in JavaScript do not create a new scope, so
//     variables should be defined at the top of the function, not in blocks.

      it('should not have block scope', function () {
        var foo = 1;

        do {
          var foo = 2;
        } while (false);

        foo.should.be.not.equal(1);
      });

      it('should have function scope', function () {
        var foo = 1;

        (function () {
          var foo = 2;
          foo.should.be.equal(2);
        })();

        foo.should.be.equal(1);
      });

// >   Here are the **falsy** values:
//
// >   *   `false`
// >   *   `null`
// >   *   `undefined`
// >   *   The empty string `''`
// >   *   The number `0`
// >   *   The number `NaN`

      it('falsy values should be false', function () {
        false.should.not.be.ok;
        (0).should.not.be.ok;
        ''.should.not.be.ok;

        (!!null).should.not.be.ok;
        (!!undefined).should.not.be.ok;
        NaN.should.not.be.ok;
      });

// >   All other values are **truthy**, including `true`, the string `'false'`,
//     and all objects.

      it('truthy values should be true', function () {
        true.should.be.ok;
        (1).should.be.ok;
        ' '.should.be.ok;

        "false".should.be.ok;
        ({}).should.be.ok;
        [].should.be.ok;
        (function () {}).should.be.ok;
      });

    });

  });
});
