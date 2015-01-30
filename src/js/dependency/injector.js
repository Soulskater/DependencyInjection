/**
 * Created by gmeszaros on 1/28/2015.
 */
var inject = function () {
    var _params = [];
    for (var i = 0; i < arguments.length; i++) {
        _params.push(dependencyContainer.resolveType(arguments[i]));
    }
    var _class = function (ctor) {
        var wrapper = function (locals) {
            for (var i = 0; i < arguments.length; i++) {
                _params.push(arguments[i]);
            }
            return ctor.apply(this, _params);
        };
        wrapper.prototype = Object.create(ctor.prototype);
        wrapper.constructor = ctor;
        return wrapper;
    };

    return {
        base: function (baseCtor) {
            var baseClass = _createClass(baseCtor);
            return {
                class: function (ctor) {
                    var wrapper = function (locals) {
                        var base = baseClass()
                        for (var i = 0; i < arguments.length; i++) {
                            _params.push(arguments[i]);
                        }

                        return ctor.apply(this, _params);
                    };
                    wrapper.prototype = Object.create(baseCtor.prototype);
                    wrapper.constructor = ctor;
                    return wrapper;
                }
            }
        },
        class: _class
    };
};