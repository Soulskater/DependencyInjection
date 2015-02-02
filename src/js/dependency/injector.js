/**
 * Created by gmeszaros on 1/28/2015.
 */
var inject = function () {
    var _params = [];
    for (var i = 0; i < arguments.length; i++) {
        _params.push(dependencyContainer.resolveType(arguments[i]));
    }

    function _objectExtend(src, dest) {
        for (var propName in dest) {
            if (dest.hasOwnProperty(propName)) {
                src[propName] = dest[propName];
            }
        }
    }

    var _baseFactory = function (baseClass) {
        if (typeof baseClass !== "function") {
            throw new Error("The base function parameter should be a function, got " + typeof baseClass);
        }

        return {
            class: function (ctor) {
                return _classFactory(ctor, baseClass);
            }
        }
    };

    var _classFactory = function (ctor, baseClass) {
        if (typeof ctor !== "function") {
            throw new Error("The constructor parameter should be a function, got " + typeof ctor);
        }

        var _class = function (locals) {
            var allParams = _params.concat([]);
            for (var i = 0; i < arguments.length; i++) {
                allParams.push(arguments[i]);
            }

            if (baseClass) {
                this.base = function (params) {
                    var wrapper = function (f, args) {
                        return function () {
                            f.apply(this, args);
                        };
                    };

                    this.base = new (wrapper(baseClass, arguments))();
                    _objectExtend(this, this.base);
                };
            }
            ctor.apply(this, allParams);
        };

        if (baseClass) {
            _class.prototype = Object.create(baseClass.prototype);
            _class.constructor = ctor;
        }
        else {
            _class.prototype = Object.create(ctor.prototype);
            _class.constructor = ctor;
        }
        return _class;
    };

    var _objectFactory = function (ctor) {

        return ctor.apply(this, _params);
    };

    return {
        base: _baseFactory,
        class: _classFactory,
        singleton: _objectFactory
    };
};