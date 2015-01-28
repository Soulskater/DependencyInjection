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
