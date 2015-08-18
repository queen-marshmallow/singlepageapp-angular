
var app = angular.module('app', ['ngRoute', 'ngResource', 'angularSpinners']);

var ngm = (function () {
    var modules = {};
    return function (name) {
        var module = modules[name];
        if (module) {
            return module;
        }
        try {
            modules[name] = angular.module(name);
        }
        catch (err) { }
        return modules[name];
    }
}());