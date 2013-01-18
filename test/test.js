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

// `abstract`, `boolean`, `break`, `byte`, `case`, `catch`, `char`, `class`,
// `const`, `continue`, `debugger`, `default`, `delete`, `do`, `double`,
// `else`, `enum`, `export`, `extends`, `false`, `final`, `finally`, `float`,
// `for`, `function`, `goto`, `if`, `implements`, `import`, `in`, `instanceof`,
// `int`, `interface`, `long`, `native`, `new`, `null`, `package`, `private`,
// `protected`, `public`, `return`, `short`, `static`, `super`, `switch`,
// `synchronized`, `this`, `throw`, `throws`, `transient`, `true`, `try`,
// `typeof`, `var`, `volatile`, `void`, `while`, `with`
//
// >   Most of the reserved words in this list are not used in the language.
//     The list does not include some words that should have been reserved but
//     were not, such as `undefined`, `NaN`, and `Infinity`.

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
  });
});
