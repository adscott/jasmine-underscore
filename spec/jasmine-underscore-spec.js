describe('jasmine-underscore', function () {
	
  describe('matchers',function () {
    it('should be empty', function () {
      expect([]).toBeEmpty();	
    });

    it('should be a DOM element', function () {
      expect(document.body).toBeElement();	
    });

    it('should be an array', function () {
      expect([1]).toBeArray();
    });

    it('should be an arguments array', function () {
      expect(arguments).toBeArguments();	
    });

    it('should be a function', function () {
      expect(function () {}).toBeFunction();	
    });

    it('should be a string', function () {
      expect('foo').toBeString();	
    });

    it('should be a number', function () {
      expect(2).toBeNumber();	
    });

    it('should be a boolean', function () {
      expect(false).toBeBoolean();	
    });
  
    it('should be a date', function () {
      expect(new Date()).toBeDate();	
    });
    
    it('should be a RegExp', function () {
      expect(/foo/).toBeRegExp();
    });
  
    it('should be NaN', function () {
      expect(NaN).toBeNaN();	
    });
  
    it('should be null', function () {
      expect(null).toBeNull();	
    });
  
    it('should be undefined', function () {
      expect(undefined).toBeUndefined();	
    });
    
    it('should be compact', function () {
      expect([1, 2, 3]).toBeCompact();
      expect([0, 1, false, 2, '', 3]).not.toBeCompact();
    });
    
    it('should be flatten', function () {
      expect([1, 2, 3, 4]).toBeFlat();
      expect([1, [2], [3, [[[4]]]]]).not.toBeFlat();
    });
    
    it('should be uniq', function () {
      expect([1, 2, 3, 4]).toHaveUniqueValues();
      expect([1, 2, 1, 3, 1, 4]).not.toHaveUniqueValues();
    });
    
    it('should be without', function () {
      expect([2, 3, 4]).toBeWithout(0, 1);
      expect([1, 2, 1, 3, 1, 4]).not.toBeWithout(0, 1);
    });
    
    it('should include', function () {
      expect([1, 2, 3, 4]).toInclude(2);
    });
  });
  
  describe('negated matchers', function () {
    it('should not be boolean', function () {
      expect('foo').not.toBeBoolean();
    });
  });
  
  describe('using', function () {
    describe('with arrays', function () {
      using([1, 2, 3], [2, 3, 5], function (first, second, total) {
    
        it('should sum ' + first + ' and ' + second, function () {
          expect(first + second).toEqual(total);
        });
    
      });
    });
  
    describe('with instances', function () {
      using('Hello', 'Hello Adam', 'Hello Bob', function (greeting) {
  
        it('should have [' + greeting + '] starting with hello', function () {
          expect(greeting).toMatch(/^Hello/);
        });
  
      });
  
      using([1, 2], [3, 4], function (array) {
    
        it('should have a length of 2 for [' + array[0] + ', ' + array[1] + ']', function () {
          expect(array.length).toEqual(2);
        });
    
      });
    });

    describe('with parameter count mismatch', function () {
      it('should throw an exception', function () {
        var f = function () {
          using([1, 2, 3], [1, 2], function (foo, bar, baz) {});
        };
    
        expect(f).toThrow('Parameter count mismatch');
      });
    });
  });
});


