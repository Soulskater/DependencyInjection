/**
 * Created by gmeszaros on 1/28/2015.
 */
var inject = function () {
    var _params = [];
    for (var i = 0; i < arguments.length; i++) {
        _params.push(dependencyContainer.resolveType(arguments[i]));
    }
    return {
        class: function (ctor) {
            return function (locals) {
                for (var i = 0; i < arguments.length; i++) {
                    _params.push(arguments[i]);
                }
                return ctor.apply(this, _params);
            };
        }
    };
};