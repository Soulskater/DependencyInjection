/**
 * Created by gmeszaros on 1/28/2015.
 */
var inject = function () {
    var _params = [];
    for (var i = 0; i < arguments.length; i++) {
        _params.push(dependencyContainer.resolveType(arguments[i]));
    }
    var _createClass = function (ctor, baseClass) {
        var _classFactory = function (locals) {
            for (var i = 0; i < arguments.length; i++) {
                _params.push(arguments[i]);
            }

            if (baseClass) {
                this.base = function (params) {
                    var wrapper = function (f, args) {
                        return function () {
                            f.apply(this, args);
                        };
                    };

                    this.base = new (wrapper(baseClass, arguments))();
                };
            }
            ctor.apply(this, _params);
        };
        return _classFactory;
    };

    return {
        base: function (baseClass) {
            return {
                class: function (ctor) {
                    return _createClass(ctor, baseClass);
                }
            }
        },
        class: _createClass
    };
};