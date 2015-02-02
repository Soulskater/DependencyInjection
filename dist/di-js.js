/**
 * Created by gmeszaros on 1/28/2015.
 */
var dependencyContainer = (function () {
    var registeredTypes = [];

    return {
        registerType: function (name, instance) {
            registeredTypes.push({
                name: name,
                instance: instance
            });
        },
        resolveType: function (name) {
            for (var i = 0; i < registeredTypes.length; i++) {
                if (registeredTypes[i].name === name) {
                    return registeredTypes[i].instance;
                }
            }
            throw new Error(name + " type is unregistered, cannot inject it!");
        }
    };
}());

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
/**
 * Created by MCG on 2015.01.31..
 */
var registerNamespace = function (namespace, owner) {
    owner = owner || window;

    if (typeof namespace !== "string") {
        throw new Error("The namespace parameter should be a '.' separated string, got " + (typeof namespace));
    }
    var splittedNamespace = namespace.split('.');
    var parent = owner;
    for (var i = 0; i < splittedNamespace.length; i++) {
        parent = ensureObject(splittedNamespace[i], parent);
    }

    function ensureObject(name, parent) {
        if (!parent.hasOwnProperty(name) || !parent[name]) {
            parent[name] = {};
        }
        return parent[name];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlcGVuZGVuY3kvY29udGFpbmVyLmpzIiwiZGVwZW5kZW5jeS9pbmplY3Rvci5qcyIsImRlcGVuZGVuY3kvcmVnaXN0ZXJOYW1lc3BhY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZGktanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBnbWVzemFyb3Mgb24gMS8yOC8yMDE1LlxyXG4gKi9cclxudmFyIGRlcGVuZGVuY3lDb250YWluZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHJlZ2lzdGVyZWRUeXBlcyA9IFtdO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVnaXN0ZXJUeXBlOiBmdW5jdGlvbiAobmFtZSwgaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcmVnaXN0ZXJlZFR5cGVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc29sdmVUeXBlOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lzdGVyZWRUeXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlZ2lzdGVyZWRUeXBlc1tpXS5uYW1lID09PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZ2lzdGVyZWRUeXBlc1tpXS5pbnN0YW5jZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobmFtZSArIFwiIHR5cGUgaXMgdW5yZWdpc3RlcmVkLCBjYW5ub3QgaW5qZWN0IGl0IVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KCkpO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBnbWVzemFyb3Mgb24gMS8yOC8yMDE1LlxyXG4gKi9cclxudmFyIGluamVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfcGFyYW1zID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIF9wYXJhbXMucHVzaChkZXBlbmRlbmN5Q29udGFpbmVyLnJlc29sdmVUeXBlKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9vYmplY3RFeHRlbmQoc3JjLCBkZXN0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gZGVzdCkge1xyXG4gICAgICAgICAgICBpZiAoZGVzdC5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHNyY1twcm9wTmFtZV0gPSBkZXN0W3Byb3BOYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgX2Jhc2VGYWN0b3J5ID0gZnVuY3Rpb24gKGJhc2VDbGFzcykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYmFzZUNsYXNzICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGJhc2UgZnVuY3Rpb24gcGFyYW1ldGVyIHNob3VsZCBiZSBhIGZ1bmN0aW9uLCBnb3QgXCIgKyB0eXBlb2YgYmFzZUNsYXNzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNsYXNzOiBmdW5jdGlvbiAoY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jbGFzc0ZhY3RvcnkoY3RvciwgYmFzZUNsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9jbGFzc0ZhY3RvcnkgPSBmdW5jdGlvbiAoY3RvciwgYmFzZUNsYXNzKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjdG9yICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGNvbnN0cnVjdG9yIHBhcmFtZXRlciBzaG91bGQgYmUgYSBmdW5jdGlvbiwgZ290IFwiICsgdHlwZW9mIGN0b3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIF9jbGFzcyA9IGZ1bmN0aW9uIChsb2NhbHMpIHtcclxuICAgICAgICAgICAgdmFyIGFsbFBhcmFtcyA9IF9wYXJhbXMuY29uY2F0KFtdKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGFsbFBhcmFtcy5wdXNoKGFyZ3VtZW50c1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChiYXNlQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgd3JhcHBlciA9IGZ1bmN0aW9uIChmLCBhcmdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZSA9IG5ldyAod3JhcHBlcihiYXNlQ2xhc3MsIGFyZ3VtZW50cykpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX29iamVjdEV4dGVuZCh0aGlzLCB0aGlzLmJhc2UpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdG9yLmFwcGx5KHRoaXMsIGFsbFBhcmFtcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGJhc2VDbGFzcykge1xyXG4gICAgICAgICAgICBfY2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShiYXNlQ2xhc3MucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgX2NsYXNzLmNvbnN0cnVjdG9yID0gY3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIF9jbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGN0b3IucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgX2NsYXNzLmNvbnN0cnVjdG9yID0gY3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9jbGFzcztcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9vYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gKGN0b3IpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN0b3IuYXBwbHkodGhpcywgX3BhcmFtcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYmFzZTogX2Jhc2VGYWN0b3J5LFxyXG4gICAgICAgIGNsYXNzOiBfY2xhc3NGYWN0b3J5LFxyXG4gICAgICAgIHNpbmdsZXRvbjogX29iamVjdEZhY3RvcnlcclxuICAgIH07XHJcbn07IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgTUNHIG9uIDIwMTUuMDEuMzEuLlxyXG4gKi9cclxudmFyIHJlZ2lzdGVyTmFtZXNwYWNlID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgb3duZXIpIHtcclxuICAgIG93bmVyID0gb3duZXIgfHwgd2luZG93O1xyXG5cclxuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIG5hbWVzcGFjZSBwYXJhbWV0ZXIgc2hvdWxkIGJlIGEgJy4nIHNlcGFyYXRlZCBzdHJpbmcsIGdvdCBcIiArICh0eXBlb2YgbmFtZXNwYWNlKSk7XHJcbiAgICB9XHJcbiAgICB2YXIgc3BsaXR0ZWROYW1lc3BhY2UgPSBuYW1lc3BhY2Uuc3BsaXQoJy4nKTtcclxuICAgIHZhciBwYXJlbnQgPSBvd25lcjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BsaXR0ZWROYW1lc3BhY2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXJlbnQgPSBlbnN1cmVPYmplY3Qoc3BsaXR0ZWROYW1lc3BhY2VbaV0sIHBhcmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZW5zdXJlT2JqZWN0KG5hbWUsIHBhcmVudCkge1xyXG4gICAgICAgIGlmICghcGFyZW50Lmhhc093blByb3BlcnR5KG5hbWUpIHx8ICFwYXJlbnRbbmFtZV0pIHtcclxuICAgICAgICAgICAgcGFyZW50W25hbWVdID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwYXJlbnRbbmFtZV07XHJcbiAgICB9XHJcbn07Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9