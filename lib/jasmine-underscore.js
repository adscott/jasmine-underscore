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

  window.using = function () {
    var self = this;
    var args = _(arguments).toArray();
    var examples = args.slice(0, args.length - 2);
    var block = args[args.length - 1];

    _(examples).each(function (example) {
      block.apply(this, example);
    });
  };
})();
