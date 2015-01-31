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
                    _objectExtend(this, this.base);
                };
            }
            ctor.apply(this, _params);
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

    return {
        base: _baseFactory,
        class: _classFactory
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
        if (!parent.hasOwnProperty(name)) {
            parent[name] = {};
        }
        return parent[name];
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlcGVuZGVuY3kvY29udGFpbmVyLmpzIiwiZGVwZW5kZW5jeS9pbmplY3Rvci5qcyIsImRlcGVuZGVuY3kvcmVnaXN0ZXJOYW1lc3BhY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImRpLWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ21lc3phcm9zIG9uIDEvMjgvMjAxNS5cclxuICovXHJcbnZhciBkZXBlbmRlbmN5Q29udGFpbmVyID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciByZWdpc3RlcmVkVHlwZXMgPSBbXTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlZ2lzdGVyVHlwZTogZnVuY3Rpb24gKG5hbWUsIGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHJlZ2lzdGVyZWRUeXBlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZTogaW5zdGFuY2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNvbHZlVHlwZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWdpc3RlcmVkVHlwZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWdpc3RlcmVkVHlwZXNbaV0ubmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWdpc3RlcmVkVHlwZXNbaV0uaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG5hbWUgKyBcIiB0eXBlIGlzIHVucmVnaXN0ZXJlZCwgY2Fubm90IGluamVjdCBpdCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSgpKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZ21lc3phcm9zIG9uIDEvMjgvMjAxNS5cclxuICovXHJcbnZhciBpbmplY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX3BhcmFtcyA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBfcGFyYW1zLnB1c2goZGVwZW5kZW5jeUNvbnRhaW5lci5yZXNvbHZlVHlwZShhcmd1bWVudHNbaV0pKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfb2JqZWN0RXh0ZW5kKHNyYywgZGVzdCkge1xyXG4gICAgICAgIGZvciAodmFyIHByb3BOYW1lIGluIGRlc3QpIHtcclxuICAgICAgICAgICAgaWYgKGRlc3QuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBzcmNbcHJvcE5hbWVdID0gZGVzdFtwcm9wTmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9iYXNlRmFjdG9yeSA9IGZ1bmN0aW9uIChiYXNlQ2xhc3MpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGJhc2VDbGFzcyAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBiYXNlIGZ1bmN0aW9uIHBhcmFtZXRlciBzaG91bGQgYmUgYSBmdW5jdGlvbiwgZ290IFwiICsgdHlwZW9mIGJhc2VDbGFzcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjbGFzczogZnVuY3Rpb24gKGN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfY2xhc3NGYWN0b3J5KGN0b3IsIGJhc2VDbGFzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfY2xhc3NGYWN0b3J5ID0gZnVuY3Rpb24gKGN0b3IsIGJhc2VDbGFzcykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY3RvciAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBjb25zdHJ1Y3RvciBwYXJhbWV0ZXIgc2hvdWxkIGJlIGEgZnVuY3Rpb24sIGdvdCBcIiArIHR5cGVvZiBjdG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBfY2xhc3MgPSBmdW5jdGlvbiAobG9jYWxzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBfcGFyYW1zLnB1c2goYXJndW1lbnRzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGJhc2VDbGFzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlID0gZnVuY3Rpb24gKHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB3cmFwcGVyID0gZnVuY3Rpb24gKGYsIGFyZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYuYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYXNlID0gbmV3ICh3cmFwcGVyKGJhc2VDbGFzcywgYXJndW1lbnRzKSkoKTtcclxuICAgICAgICAgICAgICAgICAgICBfb2JqZWN0RXh0ZW5kKHRoaXMsIHRoaXMuYmFzZSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN0b3IuYXBwbHkodGhpcywgX3BhcmFtcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGJhc2VDbGFzcykge1xyXG4gICAgICAgICAgICBfY2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShiYXNlQ2xhc3MucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgX2NsYXNzLmNvbnN0cnVjdG9yID0gY3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIF9jbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGN0b3IucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgX2NsYXNzLmNvbnN0cnVjdG9yID0gY3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9jbGFzcztcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBiYXNlOiBfYmFzZUZhY3RvcnksXHJcbiAgICAgICAgY2xhc3M6IF9jbGFzc0ZhY3RvcnlcclxuICAgIH07XHJcbn07IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgTUNHIG9uIDIwMTUuMDEuMzEuLlxyXG4gKi9cclxudmFyIHJlZ2lzdGVyTmFtZXNwYWNlID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgb3duZXIpIHtcclxuICAgIG93bmVyID0gb3duZXIgfHwgd2luZG93O1xyXG5cclxuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIG5hbWVzcGFjZSBwYXJhbWV0ZXIgc2hvdWxkIGJlIGEgJy4nIHNlcGFyYXRlZCBzdHJpbmcsIGdvdCBcIiArICh0eXBlb2YgbmFtZXNwYWNlKSk7XHJcbiAgICB9XHJcbiAgICB2YXIgc3BsaXR0ZWROYW1lc3BhY2UgPSBuYW1lc3BhY2Uuc3BsaXQoJy4nKTtcclxuICAgIHZhciBwYXJlbnQgPSBvd25lcjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BsaXR0ZWROYW1lc3BhY2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBwYXJlbnQgPSBlbnN1cmVPYmplY3Qoc3BsaXR0ZWROYW1lc3BhY2VbaV0sIHBhcmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZW5zdXJlT2JqZWN0KG5hbWUsIHBhcmVudCkge1xyXG4gICAgICAgIGlmICghcGFyZW50Lmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICAgIHBhcmVudFtuYW1lXSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyZW50W25hbWVdO1xyXG4gICAgfVxyXG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==