describe('jasmine-underscore', function () {
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


