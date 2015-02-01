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