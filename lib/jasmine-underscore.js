(function () {
  function u(v, f, a) {
    return _(v)[f].apply(_(v), a);
  }
  
  function generateMatcherName(functionName) {
    function capitalise(str) {
      return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    }
    return functionName.match(/^is(.*)/) ? 'toBe' + functionName.slice(2) : 'toBe' + capitalise(functionName); 
  }
  
  var allowedFunctions = {

      booleanFunctions : {
        names : ['isEmpty', 
                'isElement', 
                'isArray', 
                'isArguments', 
                'isFunction', 
                'isString', 
                'isNumber', 
                'isBoolean', 
                'isDate',
                'isRegExp',
                'isNaN', 
                'isNull', 
                'isUndefined',
                'include',
                'all',
                'any'],
        registrationFunction: function (functionName, matcherName) {
          jasmine.Matchers.prototype[matcherName] = function () {
            return u(this.actual, functionName, arguments);
          };
        }
      },
      
      equalityFunctions : {
        names : ['compact', 
                'flatten', 
                'uniq', 
                'without'],
        registrationFunction : function (functionName, matcherName) {
          jasmine.Matchers.prototype[matcherName] = function () {
            return _(u(this.actual, functionName, arguments)).isEqual(this.actual);
          };
        }
      }
    },
    overrides = {
      'flatten' : 'toBeFlat',
      'uniq' : 'toHaveUniqueValues',
      'include' : 'toInclude'
    };

  _(_).chain().keys().each(function (key) {   
    var type = _(allowedFunctions).detect(function (value) {
      return _(value.names).contains(key);
    });
    
    if (type) {
      type.registrationFunction(key, overrides[key] || generateMatcherName(key));
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
        throw "Parameter count mismatch";
      }
    });
  };
}());
