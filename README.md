# Mocha bdd w/ should

    $ npm install -g mocha
    $ npm install should
    $ mkdir test
    $ npm install should
    $ $EDITOR test/test.js

```javascript
var should = require('should');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    });
  });
});
```

    $ mocha

> .
>
> 1 test complete (1ms)
