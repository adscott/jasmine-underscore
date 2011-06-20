# jasmine-underscore

jasmine-underscore provides two extensions for [Jasmine](http://pivotal.github.com/jasmine/) JavaScript Testing Framework:
  
- matchers implicitly defined by object functions in [Underscore](http://documentcloud.github.com/underscore/)
- a means to write examples into specs
  
## Installation

Simply download _jasmine-underscore.js_ from the [master](https://github.com/adscott/jasmine-underscore/raw/master/lib/jasmine-underscore.js) and include it in your Jasmine's test runner file (or add it to _jasmine.yml_ file if you're using Ruby with [jasmine-gem](http://github.com/pivotal/jasmine-gem)). You'll also need [Underscore](http://documentcloud.github.com/underscore/).

## Underscore matchers

Underscore has a number of methods for interrogating state. Any underscore function that is prefixed with 'is' can be used as a matcher:

For example:

- `toBeArray`
  - e.g. `expect([1, 2, 3]).toBeArray()`

## Using examples

Underscore is great for generating examples for specs:

    _([
        [1, 2, 3], 
        [2, 3, 5]
      ]).each(function (vals) {
      
      var first = vals[0];
      var second = vals[1];
      var total = vals[2];
  
      it('should sum ' + first + ' and ' + second, function () {
          expect(sum(first, second)).toEqual(total);
      });
    });

However, this is quite noisy. The `using` keyword can be used to reduce this noise, as shown.

    using([1, 2, 3], [2, 3, 5], function (first, second, total) {
      it('should sum ' + first + ' and ' + second, function () {
          expect(sum(first, second)).toEqual(total);
      });
    });
