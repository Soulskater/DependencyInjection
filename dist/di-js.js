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
    var _baseFactory = function (baseClass) {
        if(typeof baseClass !== "function"){
            throw new Error("The base function parameter should be a function, got " + typeof baseClass);
        }

        return {
            class: function (ctor) {
                return _classFactory(ctor, baseClass);
            }
        }
    };
    
    var _classFactory = function (ctor, baseClass) {
        if(typeof ctor !== "function"){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlcGVuZGVuY3kvY29udGFpbmVyLmpzIiwiZGVwZW5kZW5jeS9pbmplY3Rvci5qcyIsImRlcGVuZGVuY3kvcmVnaXN0ZXJOYW1lc3BhY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJkaS1qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdtZXN6YXJvcyBvbiAxLzI4LzIwMTUuXHJcbiAqL1xyXG52YXIgZGVwZW5kZW5jeUNvbnRhaW5lciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcmVnaXN0ZXJlZFR5cGVzID0gW107XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZWdpc3RlclR5cGU6IGZ1bmN0aW9uIChuYW1lLCBpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICByZWdpc3RlcmVkVHlwZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6IGluc3RhbmNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzb2x2ZVR5cGU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVnaXN0ZXJlZFR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVnaXN0ZXJlZFR5cGVzW2ldLm5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVnaXN0ZXJlZFR5cGVzW2ldLmluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihuYW1lICsgXCIgdHlwZSBpcyB1bnJlZ2lzdGVyZWQsIGNhbm5vdCBpbmplY3QgaXQhXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0oKSk7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGdtZXN6YXJvcyBvbiAxLzI4LzIwMTUuXHJcbiAqL1xyXG52YXIgaW5qZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9wYXJhbXMgPSBbXTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgX3BhcmFtcy5wdXNoKGRlcGVuZGVuY3lDb250YWluZXIucmVzb2x2ZVR5cGUoYXJndW1lbnRzW2ldKSk7XHJcbiAgICB9XHJcbiAgICB2YXIgX2Jhc2VGYWN0b3J5ID0gZnVuY3Rpb24gKGJhc2VDbGFzcykge1xyXG4gICAgICAgIGlmKHR5cGVvZiBiYXNlQ2xhc3MgIT09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBiYXNlIGZ1bmN0aW9uIHBhcmFtZXRlciBzaG91bGQgYmUgYSBmdW5jdGlvbiwgZ290IFwiICsgdHlwZW9mIGJhc2VDbGFzcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjbGFzczogZnVuY3Rpb24gKGN0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfY2xhc3NGYWN0b3J5KGN0b3IsIGJhc2VDbGFzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICB2YXIgX2NsYXNzRmFjdG9yeSA9IGZ1bmN0aW9uIChjdG9yLCBiYXNlQ2xhc3MpIHtcclxuICAgICAgICBpZih0eXBlb2YgY3RvciAhPT0gXCJmdW5jdGlvblwiKXtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGNvbnN0cnVjdG9yIHBhcmFtZXRlciBzaG91bGQgYmUgYSBmdW5jdGlvbiwgZ290IFwiICsgdHlwZW9mIGN0b3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIF9jbGFzcyA9IGZ1bmN0aW9uIChsb2NhbHMpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIF9wYXJhbXMucHVzaChhcmd1bWVudHNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYmFzZUNsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2UgPSBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBmdW5jdGlvbiAoZiwgYXJncykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZi5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhc2UgPSBuZXcgKHdyYXBwZXIoYmFzZUNsYXNzLCBhcmd1bWVudHMpKSgpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdG9yLmFwcGx5KHRoaXMsIF9wYXJhbXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChiYXNlQ2xhc3MpIHtcclxuICAgICAgICAgICAgX2NsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoYmFzZUNsYXNzLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgIF9jbGFzcy5jb25zdHJ1Y3RvciA9IGN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBfY2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShjdG9yLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgIF9jbGFzcy5jb25zdHJ1Y3RvciA9IGN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfY2xhc3M7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYmFzZTogX2Jhc2VGYWN0b3J5LFxyXG4gICAgICAgIGNsYXNzOiBfY2xhc3NGYWN0b3J5XHJcbiAgICB9O1xyXG59OyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IE1DRyBvbiAyMDE1LjAxLjMxLi5cclxuICovXHJcbnZhciByZWdpc3Rlck5hbWVzcGFjZSA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG93bmVyKSB7XHJcbiAgICBvd25lciA9IG93bmVyIHx8IHdpbmRvdztcclxuXHJcbiAgICBpZiAodHlwZW9mIG5hbWVzcGFjZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBuYW1lc3BhY2UgcGFyYW1ldGVyIHNob3VsZCBiZSBhICcuJyBzZXBhcmF0ZWQgc3RyaW5nLCBnb3QgXCIgKyAodHlwZW9mIG5hbWVzcGFjZSkpO1xyXG4gICAgfVxyXG4gICAgdmFyIHNwbGl0dGVkTmFtZXNwYWNlID0gbmFtZXNwYWNlLnNwbGl0KCcuJyk7XHJcbiAgICB2YXIgcGFyZW50ID0gb3duZXI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwbGl0dGVkTmFtZXNwYWNlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgcGFyZW50ID0gZW5zdXJlT2JqZWN0KHNwbGl0dGVkTmFtZXNwYWNlW2ldLCBwYXJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVuc3VyZU9iamVjdChuYW1lLCBwYXJlbnQpIHtcclxuICAgICAgICBpZiAoIXBhcmVudC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICAgICAgICBwYXJlbnRbbmFtZV0gPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhcmVudFtuYW1lXTtcclxuICAgIH1cclxufTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=