for(var key in _) {
  var result = key.match(/^is(.*)/);
  if (result) {
	(function (functionName) {
      jasmine.Matchers.prototype['toBe' + result[1]] = function () {
	    return _(this.actual)[functionName]();
      }
    })(key);
  }
}