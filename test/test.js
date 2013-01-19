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

        /* notSoBig++ does not alter its value */
        notSoBig *= 1.1;
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
          return foo;
        })().should.be.equal(2);

        foo.should.be.equal(1);
      });

      it('without var, outer scope should be used', function () {
        var foo = 1;

        (function () {
          foo = 2;
          return foo;
        })().should.be.equal(2);

        foo.should.be.not.equal(1);
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

// ## 3. Objects

  describe('3. Objects', function () {

    /**
    * from()
    *
    * Inheritance. Simple enough for our testing purposes
    *
    * In the book, Object is augmented with a create() method, which do the
    * same of this function, so I will follow its variable names
    **/
    function from (obj) {
      var F = function () {};
      F.prototype = obj;
      return new F();
    };

// ### Retrieval

    describe('Retrieval', function () {

// >   Values can be retrieved from an object by wrapping a string expression
//     in `[]`. If the string expression is literal, and if it is a legal
//     JavaScript name and not a reserved word, then the dot notation can be
//     used instead. The dot notation is preferred because it is more compact
//     and reads better.

      it('retrieval should be done with dot notation', function () {
        var foo = { whoami: 'foo' };
        (foo.whoami === 'foo').should.be.true;
      });

      it('should use square brackets with expressions', function () {
        var foo = { 'foo man choo': 'that is me!' };

        (function () {
          eval("foo.'foo man choo';");
        }).should.throw();

        (function () {
          eval("foo['foo man choo'];");
        }).should.not.throw();

        var fooRealName = 'foo ' + 'man ' + 'choo';
        foo['foo ' + 'man ' + 'choo'].should.be.equal('that is me!');
        foo[fooRealName].should.be.equal('that is me!');
      });

// >   Attempting to retrieve values from `undefined` will throw a `TypeError`
//     exception. This can be guarded against with the `&&`operator

      it('properties of an undefined should throw', function () {
        var foo;

        /* foo.should.be.a('undefined') throws */
        (typeof foo).should.equal('undefined');

        (function () { foo.bar; }).should.throw();
        (function () { foo && foo.bar; }).should.not.throw();
      });

      it('properties of a null should throw', function () {
        var foo = null;
        (function () { foo.bar; }).should.throw();
      });

      it('properties of defined entities should not throw', function () {
        var foo = 1;
        (function () { foo.bar; }).should.not.throw();
        foo = 'x';
        (function () { foo.bar; }).should.not.throw();
      });
    });

// ### Update

    describe('Update', function () {
    
// >   A value in an object can be updated by assignment. If the property name
//     already exists in the object, the property value is replaced. If the
//     object does not already have that property name, the object is
//     **augmented**

      it('should augment with undefined properties', function () {
        var foo = {};
        foo.should.not.have.property('bar');

        foo.bar = 'x';
        foo.should.have.property('bar', 'x');
      });
    });

// ### Reference

    describe('Reference', function () {

// >   Objects are passed around by reference. They are never copied

      it('should be passed by reference in assignment', function () {
        var foo = {}
          , bar = {};

        foo.should.not.be.equal(bar);
        foo.qux = 'x';
        bar.should.not.have.property('qux');

        foo = bar;
        foo.should.be.equal(bar);
        foo.qux = 'qux of foo';
        bar.should.have.property('qux', 'qux of foo');
      });

      it('should be passed by reference in functions', function () {
        var foo = {};

        (function (bar) {
          bar.qux = 'qux of bar';
        })(foo);

        foo.should.have.property('qux', 'qux of bar');
      });
    });

// ### Prototype

    describe('Prototype', function () {

// >   Every object is linked to a prototype object from which it can inherit
//     properties. All objects created from object literals are linked to
//     `Object.prototype`, an object that comes standard with JavaScript

      it('should exist Object.prototype', function () {
        should.exist(Object);
        Object.should.have.property('prototype');
      });

      it('only functions should have prototype property', function () {
        ({}).should.not.have.property('prototype');
        (function () {}).should.have.property('prototype');
      });

      it('should be linked to Object.prototype by default', function () {
        var foo = {};
        foo.should.not.have.property('bar');
        Object.prototype.bar = 'bar of Object';
        foo.should.have.property('bar', 'bar of Object');

        /* Augmenting Object.prototype causes subsequent tests to fail */
        delete Object.prototype.bar;
      });

// >   When you make a new object , you can select the object that should be
//     its prototype. The mechanism that JavaScript provides to do this is
//     messy and complex, but it can be significantly simplified.

      it('prototype should be applied with the new operator', function () {
        var foo = function () {};
        foo.prototype.whoami = 'foo';
        foo.should.not.have.property('whoami');
        (new foo()).should.have.property('whoami', 'foo');
      });

      it('prototype object should point to any object', function () {
        var foo = function () {};
        foo.prototype.whoami = 'foo';

        var bar = function () {};
        bar.should.not.have.property('whoami');
        bar.prototype = new foo();

        /* remember: prototype should be applied with the new operator */
        bar.should.not.have.property('whoami');

        (new bar).should.have.property('whoami', 'foo');
      });

// >   The prototype link has no effect on updating. When we make changes to an
//     object, the object prototype is not touched.

      it('on object update, its prototype should not be touched', function () {
        var foo = function () {}
          , bar = from(new foo()); 

        foo.prototype.whoami = 'foo';
        bar.should.have.property('whoami', 'foo');
        bar.whoami = 'bar';
        bar.should.have.property('whoami', 'bar');
        foo.prototype.should.have.property('whoami', 'foo');
      });

// >   The prototype link is used only on retrieval. If we try to retrieve a
//     property value from an object, and if the object lacks the property
//     name, then JavaScript attempts to retrieve the property value from the
//     prototype object. And if that object is lacking the property, then it
//     goeas to its prototype, and so on until the process finally bottoms out
//     with `Object.prototype`. If the desired property exists nowhere in the
//     prototype chain, then the result is the `undefined` value. This is
//     called **delegation**.

      it('on retrieve, should delegate', function () {
        var foo = {}
          , bar = from(foo)
          , qux = from(bar);

        foo.a = 'foo';
        bar.b = 'bar';
        qux.c = 'qux';

        /* qux.should.be.eql({ a: 'foo', b: 'bar', c: 'qux' }) fails,
          maybe mocha uses hasOwnProperty() in eql() */
        qux.should.have.ownProperty('c');
        qux.should.not.have.ownProperty('b');
        qux.should.not.have.ownProperty('a');
        
        qux.a.should.be.equal('foo');
        qux.b.should.be.equal('bar');
        qux.c.should.be.equal('qux');
        (qux.d === undefined).should.be.true;
      });

// >   The prototype relationship is a dynamic relationship. If we add a new
//     property to a prototype, that property will immediately be visible in
//     all of the objects that are based on that prototype.

      it('should delegate dynamicaly', function () {
        var foo = {}
          , bar = from(foo);

        bar.should.not.have.property('whoami');
        foo.whoami = 'foo';
        bar.should.have.property('whoami', 'foo');
      });
    });

// ### Reflection

    describe('Reflection', function () {

// >   `hasOwnProperty` method returns `true` if the object has a particular
//     property. It does not look at the prototype chain.

      it('hasOwnProperty should be true only for existing props', function () {
        var foo = { a: 'foo' };
        foo.hasOwnProperty('a').should.be.true;
        foo.hasOwnProperty('b').should.be.false;
      });

      it('should not look at the prototype chain', function () {
        var foo = { a: 'foo' }
          , bar = from(foo);

        bar.b = 'bar';
        bar.should.have.property('a', 'foo');
        bar.hasOwnProperty('a').should.be.false;
        bar.hasOwnProperty('b').should.be.true;
      });
    });

// ### Enumeration

    describe('Enumeration', function () {

// >   The `for in` statement can loop over all of the property names in an
//     object. The enumeration will include all of the properties, so it is
//     necessary to filter out the values you don't want. The most common
//     filters are the `hasOwnProperty` method and using `typeof` to exclude
//     functions
//
// >   There is no guarantee on the order of the names, so be prepared for the
//     names to appear in any order.

      it('for..in should loop over all properties', function () {
        var stack = []
          , foo = { a: 'foo' }
          , bar = from(foo);

        bar.b = 'bar';
        for (var i in bar) {
          stack.push(i);
        }
        stack.length.should.be.equal(2);

        /* filter example */
        stack = [];
        for (var j in bar) {
          if (bar.hasOwnProperty(j)) {
            stack.push(j);
          }
        }
        stack.length.should.be.equal(1);
      });
    });

// ### Delete

    describe('Delete', function () {

// >   The `delete` operator can be used to remove a property from an object.
//     It will remove a property from the object if it has one. It will not
//     touch any of the objects in the prototype linkage.
//
// >   Removeing a property from an object may allow a property from the
//     prototype linkage to shine through.

      it('delete should delete a property', function () {
        var foo = { a: 'foo' };
        foo.should.have.property('a');
        delete foo.a;
        foo.should.not.have.property('a');
      });

      it('should delete only own properties', function () {
        var foo = { a: 'foo' }
          , bar = from(foo);

          bar.b = 'bar';
          bar.should.have.property('a', 'foo');
          bar.should.have.property('b', 'bar');
          
          delete bar.a;
          delete bar.b;
          bar.should.have.property('a', 'foo');
          bar.should.not.have.property('b');
      });

      it('should shine properties from prototype linkage', function () {
        var foo = { a: 'foo' }
          , bar = from(foo);

        bar.a = 'bar';
        bar.should.have.property('a', 'bar');
        
        delete bar.a;
        bar.should.have.property('a', 'foo');
      });
    });
  });
});
