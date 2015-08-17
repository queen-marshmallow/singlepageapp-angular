
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


//define(['angular', 'angular-route', 'angular-resource', 'app/common/config', 'app/common/cache', 'app/models/welcome-controller',
//'app/models/jobs/create-controller', 'app/services/jobs-data-service',  'app/services/static-data-service', 'app/models/jobs/list-controller'],

//    function (angular, route, resource, config, cache, welcomeController, jobCreateController, jobsDataService, staticDataService,
//        jobListController) {
//    'use strict';

//        var app = angular.module('jobSearchApp', ['ngRoute', 'ngResource']);

//        app.config(config);
//        app.factory('appCache', cache);
//        app.factory('jobsDataService', jobsDataService);
//        app.factory('staticDataService', staticDataService);
//        app.controller('welcomeController', welcomeController);
//        app.controller('jobCreateController', jobCreateController);
//        app.controller('jobListController', jobListController);
//});