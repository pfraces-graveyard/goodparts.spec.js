// Testing JavaScript internals.
//
// I will start testing which is said in 'JavaScript: The Good Parts' under
// `node.js`. Future updates will include more readings and more environments.

var should = require('should');

/**
 * Helper functions
 */

/**
 * root()
 *
 * Returns the root object, `window` in the browser, or `global` on the server.
 */
function root () {
  /*
  * return window || global;
  *   in node.js, causes a ReferenceError: window is not defined.
  * return (function () { return this; })();
  *   will be a good solution for code-sharing (node.js/browsers).
  * But actually we are just in node.js, so we can just return global.
  */
  return global;
}

/**
* extend(o)
*
* Creates a new object which prototype points to the object received.
* Simple inheritance abstraction.
*/
function extend (o) {
  var F = function () {};
  F.prototype = o;
  return new F();
}

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
          , bar = extend(new foo()); 

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
          , bar = extend(foo)
          , qux = extend(bar);

        foo.a = 'foo';
        bar.b = 'bar';
        qux.c = 'qux';

        qux.a.should.be.equal('foo');
        qux.b.should.be.equal('bar');
        qux.c.should.be.equal('qux');
        (typeof qux.d).should.be.equal('undefined');
      });

// >   The prototype relationship is a dynamic relationship. If we add a new
//     property to a prototype, that property will immediately be visible in
//     all of the objects that are based on that prototype.

      it('should delegate dynamicaly', function () {
        var foo = {}
          , bar = extend(foo);

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
          , bar = extend(foo);

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
          , bar = extend(foo);

        bar.b = 'bar';
        for (var i in bar) {
          stack.push(i);
        }
        stack.length.should.be.equal(2);
      });

      it('undesirable properties should be filtered', function () {
        var stack = []
          , foo = { a: 'foo' }
          , bar = extend(foo);

        bar.b = 'bar';
        for (var i in bar) {
          if (bar.hasOwnProperty(i)) {
            stack.push(i);
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
          , bar = extend(foo);

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
          , bar = extend(foo);

        bar.a = 'bar';
        bar.should.have.property('a', 'bar');
        
        delete bar.a;
        bar.should.have.property('a', 'foo');
      });
    });
  });

// ## 4. Functions

  describe('4. Functions', function () {

// ### Function Objects

    describe('Function Objects', function () {

// >   Functions in JavaScript are objects. Objects are collections of
//     name/value pairs having a hidden link to a prototype object. Objects
//     produced from object literals are linked to `Object.prototype`. Function
//     objects are linked to `Function.prototype` (which is itself linked to
//     `Object.prototype`). Every function is also created with two additional
//     hidden properties: the function context and the code that implements the
//     function behavior.

      it('functions should inherit from Function', function () {
        var foo = function () {};
        foo.should.not.have.property('bar');
        Function.prototype.bar = 'bar of Function';
        foo.should.have.property('bar', 'bar of Function');
        delete Function.prototype.bar;
      });

      it('Function should inherit from Object', function () {
        var foo = function () {};
        foo.should.not.have.property('bar');
        foo.should.not.have.property('qux');

        Object.prototype.bar = 'bar of Object';
        Function.prototype.qux = 'qux of Function';
        foo.should.have.property('bar', 'bar of Object');
        foo.should.have.property('qux', 'qux of Function');

        /* Function inherits from Object, not vice versa */
        var foz = {};
        foz.should.not.have.property('qux');
        foz.should.have.property('bar', 'bar of Object');

        delete Object.prototype.bar;
        delete Function.prototype.qux;
      });

// >   Every function object is also created with a `prototype` property. Its
//     value is an object with a `constructor` property whose value is **the**
//     function. This is distinct from the hidden link to `Function.prototype`.

      it('functions should have constructor', function () {
        var foo = function () {};
        foo.prototype.should.have.property('constructor');
      });

      it('function constructor should be the function itself', function () {
        var foo = function () {};
        foo.prototype.constructor.should.be.equal(foo);
      });

// >   Since functions are objects, they can be used like any other value.
//     Functions can be stored in variables, objects, and arrays. Functions
//     can be passed as arguments to functions, and functions can be returned
//     from functions. Also, since functions are objects, functions can have
//     methods.
//
// >   The thing that is special about functions is that they can be invoked.

      it('should be invoked from variables', function () {
        function foo () { return 'foo'; }
        var bar = foo;
        bar().should.be.equal('foo');
      });

      it('should be invoked as members', function () {
        function foo () { return 'foo'; }
        var bar = { qux: foo };
        bar.qux().should.be.equal('foo');
      });

      it('should be invoked from arrays', function () {
        function foo () { return 'foo'; }
        var bar = [];
        bar.push(foo);
        bar[0]().should.be.equal('foo');
      });

      it('should be invoked as arguments', function () {
        function foo () { return 'foo'; }
        function bar (x) { x().should.be.equal('foo'); }
        bar(foo);
      });

      it('should be invoked as returning value', function () {
        function foo () { return 'foo'; }
        function bar () { return foo; }
        bar()().should.be.equal('foo');
      });

      it('should be invoked having methods', function () {
        function foo () { return 'foo'; }
        foo.bar = 'bar of foo';
        foo().should.be.equal('foo');
        foo.should.have.property('bar', 'bar of foo');
      });
    });

// ### Function Literal

    describe('Function Literal', function () {

// >   The function can use its name to call itself recursively. If a function
//     is not given a name it is said to be **anonymous**.

      it('should use its name to call itself', function () {
        var foo = function fact (x) {
          if (x === 0 || x === 1) return x;
          return x * fact(x - 1);
        };
        foo(5).should.be.equal(120);
      });

      it('functions should be annonymous', function () {
        (function () { return 'foo'; })().should.be.equal('foo');
      });

// >   A function literal can appear anywhere that an expression can appear.
//     Functions can be defined inside other functions. An inner function of
//     course has access to its parameters and variables. An inner function
//     also enjoys access to the parameters and variables of the functions it
//     is nested within. The function object created by a function literal
//     contains a link to the outer context. This is called **closure**.

      it('should be defined inside other functions', function () {
        (function () {
          function foo () { 
            return 'bar';
          }
          return foo();
        })().should.be.equal('bar');
      });

      it('inner functions should have access to its params', function () {
        (function () {
          function sum2 (x) {
            var two = 2;
            return x + two;
          }
          return sum2(3);
        })().should.be.equal(5);
      });

      it('inner functions shoud have access to outer contexts', function () {
        function foo () {
          var a = 1;
          function bar () {
            var b = 2;
            return a + b;
          }
          return bar();
        }
        foo().should.be.equal(3);
      });
    });

// ### Invocation

    describe('Invocation', function () {

// >   In adition to the declared parameters, every function receives two
//     additional parameters: `this` and `arguments`. The `this` parameter is
//     vary important in object oriented programming, and its value is
//     determined by the **invocation pattern**. There are four patterns of
//     invocation in JavaScript: the **method invocation pattern**, the
//     **function invocation pattern**, the **constructor invocation pattern**,
//     and the **apply invocation pattern**. The patterns differ in how the
//     bonus parameter `this` is initialized.

      it('functions should have a this parameter for free', function () {
        (function () {
          should.exist(this);
        })();
      });

      it('functions should have an arguments parameter for free', function () {
        (function () {
          should.exist(arguments);
        })();
      });

// >   There is no runtime error when the number of arguments and the number of
//     parameters do not match. If there are too many arguments, the extra
//     arguments will be ignored. If there are too few arguments, the
//     `undefined` value will be substituted for the missing values. There is
//     no type checking on the argument values: any type of value can be passed
//     to any parameter.

      it('too few arguments should produce undefined parameters', function () {
        function need2Args (a, b) {
          a.should.be.equal(1);
          (typeof b).should.be.equal('undefined');
        }
        need2Args(1);
      });
    });

// ### The Method Invocation Pattern

    describe('The Method Invocation Pattern', function () {

// >   When a function is stored as a property of an object, we call it a
//     **method**. When a method is invoked, `this` is bound to that object.
//
// >   A method can use `this` to access the object so that it can retrieve
//     values from the object or modify the object. The binding of `this` to
//     the object happens at invocation time. This very late binding makes
//     functions that use `this` highly reusable. Methods that get their object
//     context from `this` are called **public methods**.

      it('this should be bound to the object on methods', function () {
        function getName () {
          return this.whoami;
        }
        var foo = {
          whoami: 'foo'
          , getName: getName
        }
        var bar = {
          whoami: 'bar'
          , getName: getName
        }
        foo.getName().should.be.equal('foo');
        bar.getName().should.be.equal('bar');
      });

      it('should be bound to arrays', function () {
        function getLength () {
          return this.length;
        }
        var foo = [];
        foo.push(getLength);
        foo[0]().should.be.equal(1);

        foo.push('x');
        foo[0]().should.be.equal(2);
      });
    });

// ### The Function Invocation Pattern

    describe('The Function Invocation Pattern', function () {

// >   When a function is not the property of an object, then it is invoked as
//     a function. When a function is invoked with this pattern, `this`is bound
//     to the global object.

      it('function invocation should bound this to global obj', function () {
        function foo () {
          return this;
        }
        foo().should.be.equal(root());
      });

// >   A method cannot employ an inner function to help it do its work because
//     the inner function does not share the method access to the object as its
//     `this` is bound to the wrong value.

      it('function invocation should lose method access to obj', function () {
        var foo = {
          getFoo: function () {
            function bar () {
              return this;
            }
            return bar();
          }
        };
        foo.getFoo().should.not.be.equal(foo);
        foo.getFoo().should.be.equal(root());
      });

// >   There is an easy workaround. If the method defines a variable and
//     assigns it the value of `this`, the inner function will have access to
//     `this` through that variable.

      it('variable should preserve this', function () {
        var foo = {
          getFoo: function () {
            var itself = this;
            function bar () {
              return itself;
            }
            return bar();
          }
        };
        foo.getFoo().should.be.equal(foo);
      });
    });

// ### The Constructor Invocation Pattern

    describe('The Constructor Invocation Pattern', function () {

// >   JavaScript is a **prototypal** inheritance language. That means that
//     objects can inherit properties directly from other objects. The language
//     is class-free.
//
// >   If a function is invoked with the `new` prefix, then a new object will
//     be created with a hidden link to the value of the function `prototype`
//     member, and `this` will be bound to that new object.
//
// >   Functions that are intended to be used with the `new` prefix are called
//     **constructors**. By convention, they are kept in variables with a
//     capitalized name.

      it('this should be bound to new object', function () {
        function Create () {
          this.whoami = 'foo';
        }
        var qux = new Create();
        qux.should.have.property('whoami', 'foo');
      });
    });

// ### The Apply Invocation Pattern

    describe('The Apply Invocation Pattern', function () {

// >   The `apply` method _[of any function]_ lets us construct an array of
//     arguments to use to invoke a function. It also lets us choose the value
//     of `this`.

      it('should use an array as arguments', function () {
        function sum (x, y) {
          return x + y;
        }
        sum.apply(null, [3, 4]).should.be.equal(7);
      });

      it('should change the value of this', function () {
        function getName () {
          return this.whoami;
        }
        var foo = { whoami: 'foo' };
        getName.apply(foo).should.be.equal('foo');
      });
    });

// ### Arguments

    describe('Arguments', function () {

// >   A bonus parameter that is available to functions when they are invoked
//     the `arguments` array. It gives the function access to all of the
//     arguments that were supplied with the invocation, including excess
//     arguments that were not assigned to parameters. This makes it possible
//     to write functions that take an unspecified number of parameters.
//
// >   Because of a design error, `arguments` is not really an array. It is an
//     array-like object. `arguments` has a `length` property, but it lacks all
//     of the array methods.

      it('should have length property', function () {
        (function () {
          arguments.should.have.property('length', 3);
        })('foo', 'bar', 'qux')
      });

      it('should have not Array.prototype methods', function () {
        (function () {
          arguments.should.not.have.property('push');
        })();
      });

      it('should include excess arguments', function () {
        function sum () {
          var total = 0;
          for (var i = 0; i < arguments.length; i++) {
            total += arguments[i];
          }
          return total;
        }
        sum(1, 2, 3, 4).should.be.equal(10);
      });
    });

// ### Return

    describe('Return', function () {

// >   A function always return a value. If the `return` value is not
//     specified, then `undefined` is returned.

      it('should return undefined whith no return value', function () {
        function foo () { return };
        (typeof foo()).should.be.equal('undefined');
      });

      it('should return undefined whith no return statement', function () {
        function foo () {};
        (typeof foo()).should.be.equal('undefined');
      });

// >   If the function was invoked with the `new` prefix and the `return` value
//     is not an object, then `this` (the new object) is returned instead.

      it('new should return this if not return an object', function () {
        function Foo () {
          this.whoami = 'foo';
          return 3;
        }
        (new Foo()).should.not.be.eql(3);
        (new Foo()).should.have.property('whoami', 'foo');
      });
      
      it('new should return object if return an object', function () {
        function Foo () {
          this.whoami = 'foo';
          return {
            whoami: 'bar'
          };
        }
        (new Foo()).should.have.property('whoami', 'bar');
      });
    });

// ### Exceptions

    describe('Exceptions', function () {

// >   The `throw` statement interrupts execution of the function. It should be
//     given an `exception` object containing a `name` property that identifies
//     the type of the exception, and a descriptive `message` property. You can
//     also add other properties.
//
// >   The `exception` object will be delivered to the `catch` clause of a
//     `try` statement.

      it('should contain name and message', function () {
        var catched = true;
        try {
          var foo;
          foo.bar;
          catched = false;
        } catch (e) {
          e.should.have.property('name', 'TypeError');
          e.should.have.property('message');
        }
        catched.should.be.true;
      });
      
      /* in node.js, throw can be given with any kind of object */
      it('should contain other properties', function () {
        var catched = true;
        try {
          throw { whoami: 'foo' };
          catched = false;
        } catch (e) {
          e.should.not.have.property('name');
          e.should.have.property('whoami', 'foo');
        }
        catched.should.be.true;
      });
    });

// ### Closure

    describe('Closure', function () {

// >   

    });
  });
});
