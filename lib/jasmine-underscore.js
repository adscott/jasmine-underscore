(function () {
  var result, key;
  
  function makeMatcher(functionName, matcherName) {
    jasmine.Matchers.prototype[matcherName] = function () {
      return _(this.actual)[functionName]();
    };
  }

  for (key in _) {
    if (_.hasOwnProperty(key)) {
      result = key.match(/^is(.*)/);
      if (result) {
        makeMatcher(key, 'toBe' + result[1]);
      }
    }
  }

  this.using = function () {
    var self = this, 
      args = _(arguments).toArray(), 
      examples = args.slice(0, args.length - 2),
      block = args[args.length - 1];

    _(examples).each(function (example) {
      block.apply(self, example);
    });
  };
}());
