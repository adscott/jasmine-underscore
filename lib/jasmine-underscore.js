(function () {
  function u(v, f, a) {
    return _(v)[f].apply(_(v), a);
  }
  
  var result, 
    key,
    allowedFunctions = {
      
      booleanFunctions : {
        names: ['isEmpty', 'isElement', 'isArray', 'isArguments', 'isFunction', 'isString', 'isNumber', 'isBoolean', 'isDate', 'isNaN', 'isNull', 'isUndefined'],
        registrationFunction: function (functionName, matcherName) {
          matcherName = matcherName || 'toBe' + functionName.match(/^is(.*)/)[1];

          jasmine.Matchers.prototype[matcherName] = function () {
            return u(this.actual, functionName, arguments);
          };
        }
      },
      
      equalityFunctions : {
        names: ['compact', 'flatten', 'uniq', 'without'],
        
        registrationFunction: function (functionName, matcherName) {
          function capitalise(str) {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
          }

          matcherName = matcherName || 'toBe' + capitalise(functionName);

          jasmine.Matchers.prototype[matcherName] = function () {
            return _(u(this.actual, functionName, arguments)).isEqual(this.actual);
          };
        }
      }
      
    },
    overrides = {
      'flatten' : 'toBeFlat',
      'uniq' : 'toHaveUniqueValues'
    };

  _(_(_).keys()).each(function (key) {   
    var type = _(allowedFunctions).detect(function (value, type) {
      return _(value.names).contains(key);
    });
    
    if (type) {
      type.registrationFunction(key, overrides[key]);
    }
  });
}());

(function () {
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
