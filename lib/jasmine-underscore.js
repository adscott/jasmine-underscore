(function () {
  var result, key;

  for (key in _) {
    result = key.match(/^is(.*)/);
    if (result) {
      (function (functionName) {
        jasmine.Matchers.prototype['toBe' + result[1]] = function () {
          return _(this.actual)[functionName]();
        };
      })(key);
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
})();
