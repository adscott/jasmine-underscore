(function () {
  var result, key;
  
  function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
  }
  
  function makeIsMatcher(functionName, matcherName) {
    jasmine.Matchers.prototype[matcherName] = function () {
      return _(this.actual)[functionName].apply(_(this.actual), arguments);
    };
  }
  
  function makeMatcher(functionName, matcherName) {
    jasmine.Matchers.prototype[matcherName] = function () {
      return _(_(this.actual)[functionName].apply(_(this.actual), arguments)).isEqual(this.actual);
    };
  }

  for (key in _) {
    if (_.hasOwnProperty(key)) {
      result = key.match(/^is(.*)/);
      if (result) {
        makeIsMatcher(key, 'toBe' + result[1]);
      } else {
        makeMatcher(key, 'toBe' + capitalise(key));
      }
    }
  }

  this.using = function () {
    var self = this, 
      args = _(arguments).toArray(), 
      examples = args.slice(0, args.length - 1),
      block = args[args.length - 1];

    _(examples).each(function (example) {
      if (block.length === 1) {
        block.call(self, example);
      } else if (_(example).isArray() && block.length === example.length) {
        block.apply(self, example);
      } else {
        throw "Parameter count mismatch"
      }
    });
  };
}());
