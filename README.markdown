# jasmine-underscore

jasmine-underscore provides two extensions for [Jasmine](http://pivotal.github.com/jasmine/) JavaScript Testing Framework:
  
- matchers implicitly defined by object functions in [Underscore](http://documentcloud.github.com/underscore/)
- a means to write examples into specs
  
## Installation

Simply grab the _jasmine-underscore.js_ from the [latest stable release](https://github.com/downloads/adscott/jasmine-underscore/jasmine-underscore-v1.0.zip) and include it in your Jasmine's test runner file (or add it to _jasmine.yml_ file if you're using Ruby with [jasmine-gem](http://github.com/pivotal/jasmine-gem)). You'll also need [Underscore](http://documentcloud.github.com/underscore/).

## Underscore matchers

Underscore has a number of methods for interrogating state. Any underscore function that is prefixed with 'is' can be used as a matcher:

- `toBeEmpty()`
  - `expect([]).toBeEmpty();`	

- `toBeElement()`
  - `expect(document.body).toBeElement();`	

- `toBeArray()`
  - `expect([1]).toBeArray();`

- `toBeArguments()`
  - `expect(arguments).toBeArguments();`

- `toBeFunction()`
  - `expect(function () {}).toBeFunction();`	

- `toBeString()`
  - `expect('foo').toBeString();`
  	
- `toBeNumber`
  - `expect(2).toBeNumber();`	

- `toBeBoolean()`
  - `expect(false).toBeBoolean();`	

- `toBeDate()`
  - `expect(new Date()).toBeDate();`	

- `toBeRegExp()`
  - `expect(/foo/).toBeRegExp();`

- `toBeNaN()`
  - `expect(NaN).toBeNaN();`	

- `toBeNull()`
  - `expect(null).toBeNull();`	

- `toBeUndefined()`
  - `expect(undefined).toBeUndefined();`

- `toBeCompact()`
  - `expect([1, 2, 3]).toBeCompact();`
  - `expect([0, 1, false, 2, '', 3]).not.toBeCompact();`

- `toBeFlat()`
  - `expect([1, 2, 3, 4]).toBeFlat();`
  - `expect([1, [2], [3, [[[4]]]]]).not.toBeFlat();`

- `toHaveUniqueValues()`
  - `expect([1, 2, 3, 4]).toHaveUniqueValues();`
  - `expect([1, 2, 1, 3, 1, 4]).not.toHaveUniqueValues();`
  
- `toBeWithout(1, 'a', etc..)`
  - `expect([2, 3, 4]).toBeWithout(0, 1);`
  - `expect([1, 2, 1, 3, 1, 4]).not.toBeWithout(0, 1);`
  
- `toInclude(1)`
  - `expect([1, 2, 3, 4]).toInclude(2);`

- `toBeAll`
  - `expect([2, 4, 6]).toBeAll(function (val) { return val%2 == 0; });`
  - `expect([1, 4, 6]).not.toBeAll(function (val) { return val%2 == 0; });`

- `toBeAny`
  - `expect([2, 3, 5]).toBeAny(function (val) { return val%2 == 0; });`
  - `expect([1, 3, 5]).not.toBeAny(function (val) { return val%2 == 0; });`
  
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
