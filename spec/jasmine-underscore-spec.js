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
  
    it('should be NaN', function () {
      expect(NaN).toBeNaN();	
    });
  
    it('should be null', function () {
      expect(null).toBeNull();	
    });
  
    it('should be undefined', function () {
      expect(undefined).toBeUndefined();	
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


